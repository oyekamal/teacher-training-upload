import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const HomePage: React.FC = () => {
  return (
    <Container>
      <Title>Welcome to my Ant Design App!</Title>
      <Button type="primary">Click Me</Button>
    </Container>
  );
};

export default HomePage;
