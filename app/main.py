import os
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__, static_folder='static', template_folder='templates')
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from datetime import datetime
import random
import json

...

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    grade = db.Column(db.Integer, nullable=False)
    assessments = db.relationship('Assessment', backref='student', lazy=True)

class Assessment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    topic = db.Column(db.String(100), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    score = db.Column(db.Integer)
    feedback = db.Column(db.Text)
    time_taken = db.Column(db.Integer) # in seconds
    questions = db.relationship('Question', backref='assessment', lazy=True)

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    assessment_id = db.Column(db.Integer, db.ForeignKey('assessment.id'), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(255), nullable=False)
    user_answer = db.Column(db.String(255))
    is_correct = db.Column(db.Boolean)
    time_taken = db.Column(db.Integer)
    attempts = db.Column(db.Integer, default=0)


@app.route('/')
def index():
    students = Student.query.all()
    with open('questions.json', 'r') as f:
        topics = json.load(f)
    return render_template('index.html', students=students, topics=topics)

@app.route('/add_student', methods=['POST'])
def add_student():
    name = request.form.get('name')
    grade = request.form.get('grade')
    if name and grade:
        new_student = Student(name=name, grade=int(grade))
        db.session.add(new_student)
        db.session.commit()
    return redirect(url_for('index'), code=303)

@app.route('/start_assessment', methods=['POST'])
def start_assessment():
    student_id = request.form.get('student')
    topic_name = request.form.get('topic')

    with open('questions.json', 'r') as f:
        all_topics = json.load(f)

    questions_for_topic = next((t['questions'] for t in all_topics if t['topic'] == topic_name), None)

    if not questions_for_topic:
        return "Topic not found", 404

    selected_questions = random.sample(questions_for_topic, 5)

    new_assessment = Assessment(student_id=student_id, topic=topic_name)
    db.session.add(new_assessment)
    db.session.commit()

    for q in selected_questions:
        new_question = Question(
            assessment_id=new_assessment.id,
            text=q['text'],
            answer=q['answer']
        )
        db.session.add(new_question)

    db.session.commit()

    return redirect(url_for('assessment', assessment_id=new_assessment.id), code=303)

@app.route('/assessment/<int:assessment_id>', methods=['GET'])
def assessment(assessment_id):
    assessment = Assessment.query.get_or_404(assessment_id)
    return render_template('assessment.html', assessment=assessment)

@app.route('/submit_assessment/<int:assessment_id>', methods=['POST'])
def submit_assessment(assessment_id):
    assessment = Assessment.query.get_or_404(assessment_id)
    answers = request.form

    total_questions = len(assessment.questions)
    correct_answers = 0

    for question in assessment.questions:
        user_answer = answers.get(f'answers[{question.id}]')
        if user_answer is not None:
            question.user_answer = user_answer
            question.attempts = 1
            # Simple case-insensitive comparison for now
            if user_answer.strip().lower() == question.answer.strip().lower():
                question.is_correct = True
                correct_answers += 1
            else:
                question.is_correct = False

    # Score is the number of correct answers (out of 5)
    assessment.score = correct_answers
    assessment.time_taken = int(answers.get('time_taken', 0))

    db.session.commit()

    # For now, redirect to a simple results page
    return redirect(url_for('results', assessment_id=assessment.id), code=303)

@app.route('/results/<int:assessment_id>')
def results(assessment_id):
    assessment = Assessment.query.get_or_404(assessment_id)
    return render_template('results.html', assessment=assessment)

@app.route('/add_feedback/<int:assessment_id>', methods=['POST'])
def add_feedback(assessment_id):
    assessment = Assessment.query.get_or_404(assessment_id)
    feedback = request.form.get('feedback')
    if feedback:
        assessment.feedback = feedback
        db.session.commit()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
