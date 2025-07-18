const { useState, useEffect } = React;
const { Button, Card, Col, Row, Modal, Form, Input, InputNumber, Switch, Select, Tabs, Breadcrumb, Popconfirm, Descriptions, Table, Tag } = antd;

const mockData = {
  "levels": [
    {
      "id": 1,
      "created": "2025-06-23T08:11:30.455961Z",
      "modified": "2025-06-24T11:30:03.796465Z",
      "is_active": true,
      "uuid": "e4e8aa10-0409-42d8-a02b-850f62781b0d",
      "deleted_at": null,
      "name": "Aspiring Teacher",
      "description": "Orientation for untrained/new teachers. Focus on pedagogy, ethics, and classroom basics.",
      "order": 0,
      "passing_score": 70,
      "max_attempts": 3,
      "time_limit": null
    },
    {
      "id": 2,
      "created": "2025-06-23T08:11:30.456051Z",
      "modified": "2025-06-23T08:11:30.456051Z",
      "is_active": true,
      "uuid": "3b3cc6e4-d32d-4fd4-b3a3-5bb129f4eb08",
      "deleted_at": null,
      "name": "Emerging Practitioner",
      "description": "Reinforces induction with assessment basics and tech integration.",
      "order": 1,
      "passing_score": 70,
      "max_attempts": 3,
      "time_limit": null
    },
    {
      "id": 3,
      "created": "2025-06-23T08:11:30.456074Z",
      "modified": "2025-06-23T08:11:30.456074Z",
      "is_active": true,
      "uuid": "be1243cd-a64a-4bac-acab-ea76e4db9980",
      "deleted_at": null,
      "name": "Skilled Practitioner",
      "description": "Subject depth, inclusive practices, PBL, and reflection.",
      "order": 2,
      "passing_score": 70,
      "max_attempts": 3,
      "time_limit": null
    },
    {
      "id": 4,
      "created": "2025-06-23T08:11:30.456094Z",
      "modified": "2025-06-24T11:29:55.869112Z",
      "is_active": true,
      "uuid": "bdf6ac3a-5d63-43be-b5ee-3910d8c6f4ad",
      "deleted_at": null,
      "name": "Teacher Leader",
      "description": "Mentoring, action research, curriculum design, and PD leadership.",
      "order": 3,
      "passing_score": 70,
      "max_attempts": 3,
      "time_limit": null
    }
  ],
  "grandQuizzes": [
    {
      "id": 1,
      "level": 1,
      "title": "Aspiring Teacher Grand Quiz",
      "description": "Final quiz for aspiring teachers",
      "instructions": "Answer all questions",
      "media_asset": null,
      "status": "READY_FOR_REVIEW"
    }
  ],
  "courses": [
    {
      "id": 1,
      "index": 1,
      "title": "Math Basics",
      "description": "Introduction to math",
      "keywords": ["math", "basics"],
      "time_duration": 30,
      "type": "SUBJECT",
      "grade_group": null,
      "subject": "Math",
      "thumbnail_url": "https://example.com/thumbnail.jpg",
      "level": 1,
      "status": "READY_FOR_REVIEW",
      "is_active": true
    }
  ],
  "trainings": [
    {
      "id": 1,
      "index": 1,
      "title": "Algebra Intro",
      "description": "Learn algebra basics",
      "content": "<p>Algebra content</p>",
      "duration": 15,
      "media_asset": null,
      "course": 1,
      "status": "READY_FOR_REVIEW",
      "is_active": true
    }
  ],
  "questions": [
    {
      "id": 1,
      "index": 1,
      "type": "MCQ",
      "question_statement": "What is 2+2?",
      "statement_media_asset": null,
      "options": ["2", "3", "4", "5"],
      "answers": [2],
      "hint": "Basic addition",
      "training": 1,
      "grand_quiz": null,
      "status": "READY_FOR_REVIEW",
      "is_active": true
    },
    {
      "id": 2,
      "index": 1,
      "type": "MSQ",
      "question_statement": "Which are primary colors?",
      "statement_media_asset": null,
      "options": ["Red", "Green", "Blue", "Yellow"],
      "answers": [0, 2, 3],
      "hint": "Think about the color spectrum",
      "training": null,
      "grand_quiz": 1,
      "status": "READY_FOR_REVIEW",
      "is_active": true
    }
  ]
};

const App = () => {
    const [data, setData] = useState(mockData);
    const [navigation, setNavigation] = useState([{ title: 'Home' }]);

    const handleNavigate = (newNav) => {
        setNavigation(newNav);
    };

    const getCurrentView = () => {
        const current = navigation[navigation.length - 1];
        if (current.title === 'Home') {
            return <LevelList levels={data.levels} onNavigate={handleNavigate} />;
        }
        if (current.type === 'level') {
            const level = data.levels.find(l => l.id === current.id);
            const courses = data.courses.filter(c => c.level === current.id);
            const grandQuiz = data.grandQuizzes.find(gq => gq.level === current.id);
            return <LevelDetail level={level} courses={courses} grandQuiz={grandQuiz} onNavigate={handleNavigate} />;
        }
        if (current.type === 'course') {
            const course = data.courses.find(c => c.id === current.id);
            const trainings = data.trainings.filter(t => t.course === current.id);
            return <CourseDetail course={course} trainings={trainings} onNavigate={handleNavigate} />;
        }
        if (current.type === 'grand_quiz') {
            const grandQuiz = data.grandQuizzes.find(gq => gq.id === current.id);
            const questions = data.questions.filter(q => q.grand_quiz === current.id);
            return <GrandQuizDetail grandQuiz={grandQuiz} questions={questions} onNavigate={handleNavigate} />;
        }
        if (current.type === 'training') {
            const training = data.trainings.find(t => t.id === current.id);
            const questions = data.questions.filter(q => q.training === current.id);
            return <TrainingDetail training={training} questions={questions} onNavigate={handleNavigate} />;
        }
        // Add other views here based on navigation
        return <div>Not Implemented</div>;
    };

    return (
        <div className="p-4">
            <Breadcrumb>
                {navigation.map((item, index) => (
                    <Breadcrumb.Item key={index} onClick={() => handleNavigate(navigation.slice(0, index + 1))}>
                        <a href="#">{item.title}</a>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
            <div className="mt-4">
                {getCurrentView()}
            </div>
        </div>
    );
};

const LevelList = ({ levels, onNavigate }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingLevel, setEditingLevel] = useState(null);

    const showModal = (level = null) => {
        setEditingLevel(level);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingLevel(null);
    };

    const handleSave = (values) => {
        // In a real app, you'd call an API here.
        // For now, we just log the values.
        console.log('Saved:', values);
        handleCancel();
    };

    return (
        <div>
            <Button type="primary" onClick={() => showModal()} className="mb-4">Add Level</Button>
            <Row gutter={[16, 16]}>
                {levels.filter(l => l.is_active).map(level => (
                    <Col key={level.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            title={level.name}
                            hoverable
                            onClick={() => onNavigate([{ title: 'Home' }, { title: level.name, type: 'level', id: level.id }])}
                            actions={[
                                <Button type="link" onClick={(e) => { e.stopPropagation(); showModal(level); }}>Edit</Button>,
                                <Popconfirm title="Are you sure?" onConfirm={(e) => e.stopPropagation()}>
                                    <Button type="link" danger onClick={(e) => e.stopPropagation()}>Delete</Button>
                                </Popconfirm>
                            ]}
                        >
                            <p>{level.description}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
            {isModalVisible && (
                <LevelForm
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    onSave={handleSave}
                    level={editingLevel}
                />
            )}
        </div>
    );
};

const LevelDetail = ({ level, courses, grandQuiz, onNavigate }) => {
    const [isCourseModalVisible, setIsCourseModalVisible] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [isGrandQuizModalVisible, setIsGrandQuizModalVisible] = useState(false);
    const [editingGrandQuiz, setEditingGrandQuiz] = useState(null);

    const showCourseModal = (course = null) => {
        setEditingCourse(course);
        setIsCourseModalVisible(true);
    };

    const handleCourseCancel = () => {
        setIsCourseModalVisible(false);
        setEditingCourse(null);
    };

    const handleCourseSave = (values) => {
        console.log('Saved course:', values);
        handleCourseCancel();
    };

    const showGrandQuizModal = (grandQuiz = null) => {
        setEditingGrandQuiz(grandQuiz);
        setIsGrandQuizModalVisible(true);
    };

    const handleGrandQuizCancel = () => {
        setIsGrandQuizModalVisible(false);
        setEditingGrandQuiz(null);
    };

    const handleGrandQuizSave = (values) => {
        console.log('Saved grand quiz:', values);
        handleGrandQuizCancel();
    };

    const courseTypes = [...new Set(courses.map(c => c.type))];

    return (
        <div>
            <Descriptions title="Level Details" bordered>
                <Descriptions.Item label="Name">{level.name}</Descriptions.Item>
                <Descriptions.Item label="Description">{level.description}</Descriptions.Item>
                <Descriptions.Item label="Order">{level.order}</Descriptions.Item>
                <Descriptions.Item label="Passing Score">{level.passing_score}</Descriptions.Item>
                <Descriptions.Item label="Max Attempts">{level.max_attempts}</Descriptions.Item>
                <Descriptions.Item label="Time Limit">{level.time_limit || 'N/A'}</Descriptions.Item>
            </Descriptions>

            <div className="flex justify-between items-center mt-8 mb-4">
                <h2 className="text-xl font-bold">Courses</h2>
                <Button type="primary" onClick={() => showCourseModal()}>Add Course</Button>
            </div>
            <Tabs defaultActiveKey={courseTypes[0]}>
                {courseTypes.map(type => (
                    <Tabs.TabPane tab={type} key={type}>
                        <Row gutter={[16, 16]}>
                            {courses.filter(c => c.type === type && c.is_active).map(course => (
                                <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        title={course.title}
                                        hoverable
                                        onClick={() => onNavigate(prev => [...prev, { title: course.title, type: 'course', id: course.id }])}
                                        actions={[
                                            <Button type="link" onClick={(e) => { e.stopPropagation(); showCourseModal(course); }}>Edit</Button>,
                                            <Popconfirm title="Are you sure?" onConfirm={(e) => e.stopPropagation()}>
                                                <Button type="link" danger onClick={(e) => e.stopPropagation()}>Delete</Button>
                                            </Popconfirm>
                                        ]}
                                    >
                                        <p>{course.description}</p>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Tabs.TabPane>
                ))}
            </Tabs>
            {isCourseModalVisible && (
                <CourseForm
                    visible={isCourseModalVisible}
                    onCancel={handleCourseCancel}
                    onSave={handleCourseSave}
                    course={editingCourse}
                    levels={[level]}
                />
            )}

            <div className="flex justify-between items-center mt-8 mb-4">
                <h2 className="text-xl font-bold">Grand Quiz</h2>
                {!grandQuiz && <Button type="primary" onClick={() => showGrandQuizModal()}>Add Grand Quiz</Button>}
            </div>
            {grandQuiz && (
                <Card
                    title={grandQuiz.title}
                    hoverable
                    onClick={() => onNavigate(prev => [...prev, { title: grandQuiz.title, type: 'grand_quiz', id: grandQuiz.id }])}
                    actions={[
                        <Button type="link" onClick={(e) => { e.stopPropagation(); showGrandQuizModal(grandQuiz); }}>Edit</Button>,
                        <Popconfirm title="Are you sure?" onConfirm={(e) => e.stopPropagation()}>
                            <Button type="link" danger onClick={(e) => e.stopPropagation()}>Delete</Button>
                        </Popconfirm>
                    ]}
                >
                    <p>{grandQuiz.description}</p>
                </Card>
            )}
            {isGrandQuizModalVisible && (
                <GrandQuizForm
                    visible={isGrandQuizModalVisible}
                    onCancel={handleGrandQuizCancel}
                    onSave={handleGrandQuizSave}
                    grandQuiz={editingGrandQuiz}
                    levels={[level]}
                />
            )}
        </div>
    );
};

const CourseDetail = ({ course, trainings, onNavigate }) => {
    const [isTrainingModalVisible, setIsTrainingModalVisible] = useState(false);
    const [editingTraining, setEditingTraining] = useState(null);

    const showTrainingModal = (training = null) => {
        setEditingTraining(training);
        setIsTrainingModalVisible(true);
    };

    const handleTrainingCancel = () => {
        setIsTrainingModalVisible(false);
        setEditingTraining(null);
    };

    const handleTrainingSave = (values) => {
        console.log('Saved training:', values);
        handleTrainingCancel();
    };

    return (
        <div>
            <Descriptions title="Course Details" bordered>
                <Descriptions.Item label="Title">{course.title}</Descriptions.Item>
                <Descriptions.Item label="Description">{course.description}</Descriptions.Item>
                <Descriptions.Item label="Keywords">{course.keywords.join(', ')}</Descriptions.Item>
                <Descriptions.Item label="Time Duration">{course.time_duration} minutes</Descriptions.Item>
                <Descriptions.Item label="Type">{course.type}</Descriptions.Item>
                <Descriptions.Item label="Subject">{course.subject}</Descriptions.Item>
                <Descriptions.Item label="Status">{course.status}</Descriptions.Item>
            </Descriptions>

            <div className="flex justify-between items-center mt-8 mb-4">
                <h2 className="text-xl font-bold">Trainings</h2>
                <Button type="primary" onClick={() => showTrainingModal()}>Add Training</Button>
            </div>
            <Row gutter={[16, 16]}>
                {trainings.filter(t => t.is_active).map(training => (
                    <Col key={training.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            title={training.title}
                            hoverable
                            onClick={() => onNavigate(prev => [...prev, { title: training.title, type: 'training', id: training.id }])}
                            actions={[
                                <Button type="link" onClick={(e) => { e.stopPropagation(); showTrainingModal(training); }}>Edit</Button>,
                                <Popconfirm title="Are you sure?" onConfirm={(e) => e.stopPropagation()}>
                                    <Button type="link" danger onClick={(e) => e.stopPropagation()}>Delete</Button>
                                </Popconfirm>
                            ]}
                        >
                            <p>{training.description}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
            {isTrainingModalVisible && (
                <TrainingForm
                    visible={isTrainingModalVisible}
                    onCancel={handleTrainingCancel}
                    onSave={handleTrainingSave}
                    training={editingTraining}
                    courses={[course]}
                />
            )}
        </div>
    );
};

const LevelForm = ({ visible, onCancel, onSave, level }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (level) {
            form.setFieldsValue(level);
        } else {
            form.resetFields();
        }
    }, [level, form]);

    return (
        <Modal
            visible={visible}
            title={level ? 'Edit Level' : 'Add Level'}
            okText="Save"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        form.resetFields();
                        onSave({ ...level, ...values });
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="level_form">
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name of the level!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="order" label="Order" rules={[{ required: true, type: 'number', min: 0 }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="passing_score" label="Passing Score" rules={[{ required: true, type: 'number', min: 1, max: 100 }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="max_attempts" label="Max Attempts" rules={[{ required: true, type: 'number', min: 1 }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="time_limit" label="Time Limit (minutes)">
                    <InputNumber />
                </Form.Item>
                <Form.Item name="is_active" label="Active" valuePropName="checked">
                    <Switch defaultChecked />
                </Form.Item>
            </Form>
        </Modal>
    );
};


const GrandQuizDetail = ({ grandQuiz, questions, onNavigate }) => {
    const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);

    const showQuestionModal = (question = null) => {
        setEditingQuestion(question);
        setIsQuestionModalVisible(true);
    };

    const handleQuestionCancel = () => {
        setIsQuestionModalVisible(false);
        setEditingQuestion(null);
    };

    const handleQuestionSave = (values) => {
        console.log('Saved question:', values);
        handleQuestionCancel();
    };

    const columns = [
        { title: 'Index', dataIndex: 'index', key: 'index' },
        { title: 'Question', dataIndex: 'question_statement', key: 'question_statement' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Active', dataIndex: 'is_active', key: 'is_active', render: (active) => <Switch checked={active} disabled /> },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => showQuestionModal(record)}>Edit</Button>
                    <Popconfirm title="Are you sure?">
                        <Button type="link" danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Descriptions title="Grand Quiz Details" bordered>
                <Descriptions.Item label="Title">{grandQuiz.title}</Descriptions.Item>
                <Descriptions.Item label="Description">{grandQuiz.description}</Descriptions.Item>
                <Descriptions.Item label="Instructions">{grandQuiz.instructions}</Descriptions.Item>
                <Descriptions.Item label="Status">{grandQuiz.status}</Descriptions.Item>
            </Descriptions>

            <div className="flex justify-between items-center mt-8 mb-4">
                <h2 className="text-xl font-bold">Questions</h2>
                <Button type="primary" onClick={() => showQuestionModal()}>Add Question</Button>
            </div>
            <Table columns={columns} dataSource={questions} rowKey="id" />
            {isQuestionModalVisible && (
                <QuestionForm
                    visible={isQuestionModalVisible}
                    onCancel={handleQuestionCancel}
                    onSave={handleQuestionSave}
                    question={editingQuestion}
                    parent={{ grand_quiz: grandQuiz.id }}
                />
            )}
        </div>
    );
};

const CourseForm = ({ visible, onCancel, onSave, course, levels }) => {
    const [form] = Form.useForm();
    const courseTypes = ["GENERAL", "SUBJECT", "CHARACTER_DEVELOPMENT", "EARLY_YEARS", "FLN"];
    const statusTypes = ["READY_FOR_REVIEW", "IN_PROGRESS", "PUBLISHED"];


    useEffect(() => {
        if (course) {
            form.setFieldsValue(course);
        } else {
            form.resetFields();
        }
    }, [course, form]);

    return (
        <Modal
            visible={visible}
            title={course ? 'Edit Course' : 'Add Course'}
            okText="Save"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        form.resetFields();
                        onSave({ ...course, ...values });
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="course_form">
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="keywords" label="Keywords">
                    <Select mode="tags" />
                </Form.Item>
                <Form.Item name="time_duration" label="Time Duration (minutes)" rules={[{ required: true, type: 'number', min: 1 }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                    <Select>
                        {courseTypes.map(type => <Select.Option key={type} value={type}>{type}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="level" label="Level" rules={[{ required: true }]}>
                    <Select>
                        {levels.map(level => <Select.Option key={level.id} value={level.id}>{level.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                    <Select>
                        {statusTypes.map(status => <Select.Option key={status} value={status}>{status}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="is_active" label="Active" valuePropName="checked">
                    <Switch defaultChecked />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const TrainingDetail = ({ training, questions, onNavigate }) => {
    const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);

    const showQuestionModal = (question = null) => {
        setEditingQuestion(question);
        setIsQuestionModalVisible(true);
    };

    const handleQuestionCancel = () => {
        setIsQuestionModalVisible(false);
        setEditingQuestion(null);
    };

    const handleQuestionSave = (values) => {
        console.log('Saved question:', values);
        handleQuestionCancel();
    };

    const columns = [
        { title: 'Index', dataIndex: 'index', key: 'index' },
        { title: 'Question', dataIndex: 'question_statement', key: 'question_statement' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Active', dataIndex: 'is_active', key: 'is_active', render: (active) => <Switch checked={active} disabled /> },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => showQuestionModal(record)}>Edit</Button>
                    <Popconfirm title="Are you sure?">
                        <Button type="link" danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Descriptions title="Training Details" bordered>
                <Descriptions.Item label="Title">{training.title}</Descriptions.Item>
                <Descriptions.Item label="Description">{training.description}</Descriptions.Item>
                <Descriptions.Item label="Duration">{training.duration} minutes</Descriptions.Item>
                <Descriptions.Item label="Status">{training.status}</Descriptions.Item>
            </Descriptions>

            <div className="flex justify-between items-center mt-8 mb-4">
                <h2 className="text-xl font-bold">Questions</h2>
                <Button type="primary" onClick={() => showQuestionModal()}>Add Question</Button>
            </div>
            <Table columns={columns} dataSource={questions} rowKey="id" />
            {isQuestionModalVisible && (
                <QuestionForm
                    visible={isQuestionModalVisible}
                    onCancel={handleQuestionCancel}
                    onSave={handleQuestionSave}
                    question={editingQuestion}
                    parent={{ training: training.id }}
                />
            )}
        </div>
    );
};

const GrandQuizForm = ({ visible, onCancel, onSave, grandQuiz, levels }) => {
    const [form] = Form.useForm();
    const statusTypes = ["READY_FOR_REVIEW", "IN_PROGRESS", "PUBLISHED"];

    useEffect(() => {
        if (grandQuiz) {
            form.setFieldsValue(grandQuiz);
        } else {
            form.resetFields();
        }
    }, [grandQuiz, form]);

    return (
        <Modal
            visible={visible}
            title={grandQuiz ? 'Edit Grand Quiz' : 'Add Grand Quiz'}
            okText="Save"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        form.resetFields();
                        onSave({ ...grandQuiz, ...values });
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="grand_quiz_form">
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="instructions" label="Instructions">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="level" label="Level" rules={[{ required: true }]}>
                    <Select>
                        {levels.map(level => <Select.Option key={level.id} value={level.id}>{level.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                    <Select>
                        {statusTypes.map(status => <Select.Option key={status} value={status}>{status}</Select.Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const TrainingForm = ({ visible, onCancel, onSave, training, courses }) => {
    const [form] = Form.useForm();
    const statusTypes = ["READY_FOR_REVIEW", "IN_PROGRESS", "PUBLISHED"];

    useEffect(() => {
        if (training) {
            form.setFieldsValue(training);
        } else {
            form.resetFields();
        }
    }, [training, form]);

    return (
        <Modal
            visible={visible}
            title={training ? 'Edit Training' : 'Add Training'}
            okText="Save"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        form.resetFields();
                        onSave({ ...training, ...values });
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="training_form">
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="content" label="Content">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="duration" label="Duration (minutes)" rules={[{ required: true, type: 'number', min: 0 }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="course" label="Course" rules={[{ required: true }]}>
                    <Select>
                        {courses.map(course => <Select.Option key={course.id} value={course.id}>{course.title}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                    <Select>
                        {statusTypes.map(status => <Select.Option key={status} value={status}>{status}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="is_active" label="Active" valuePropName="checked">
                    <Switch defaultChecked />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const QuestionForm = ({ visible, onCancel, onSave, question, parent }) => {
    const [form] = Form.useForm();
    const questionTypes = ["MCQ", "MSQ", "OPEN_ENDED", "POLL"];
    const statusTypes = ["READY_FOR_REVIEW", "IN_PROGRESS", "PUBLISHED"];
    const questionType = Form.useWatch('type', form);

    useEffect(() => {
        if (question) {
            form.setFieldsValue(question);
        } else {
            form.resetFields();
        }
    }, [question, form]);

    return (
        <Modal
            visible={visible}
            title={question ? 'Edit Question' : 'Add Question'}
            okText="Save"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        form.resetFields();
                        onSave({ ...question, ...values, ...parent });
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="question_form">
                <Form.Item name="question_statement" label="Question Statement" rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                    <Select>
                        {questionTypes.map(type => <Select.Option key={type} value={type}>{type}</Select.Option>)}
                    </Select>
                </Form.Item>
                {(questionType === 'MCQ' || questionType === 'MSQ') && (
                    <Form.List name="options">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(field => (
                                    <Space key={field.key} align="baseline">
                                        <Form.Item {...field} rules={[{ required: true, message: 'Missing option' }]}>
                                            <Input placeholder="Option" />
                                        </Form.Item>
                                        <Button onClick={() => remove(field.name)}>-</Button>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block>
                                        + Add Option
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                )}
                {(questionType === 'MCQ' || questionType === 'MSQ') && (
                    <Form.Item name="answers" label="Answers (comma-separated indices)">
                        <Input />
                    </Form.Item>
                )}
                <Form.Item name="hint" label="Hint">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                    <Select>
                        {statusTypes.map(status => <Select.Option key={status} value={status}>{status}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="is_active" label="Active" valuePropName="checked">
                    <Switch defaultChecked />
                </Form.Item>
            </Form>
        </Modal>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
