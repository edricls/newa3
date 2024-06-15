import { useState, useEffect } from 'react';
import api from '../api';
import { Container } from './styles/Container';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await api.get('/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await api.post('/tasks', { title, completed }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  return (
    <Container>
      <h2>Tasks</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>
          Completed:
          <Input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </label>
        <Button type="submit">Add Task</Button>
      </Form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title} - {task.completed ? 'Completed' : 'Incomplete'}</li>
        ))}
      </ul>
    </Container>
  );
};

