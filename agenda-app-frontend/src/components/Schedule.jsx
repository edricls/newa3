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

export const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const fetchSchedules = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await api.get('/schedules', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchedules(response.data.schedules);
    } catch (error) {
      console.error('Failed to fetch schedules', error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await api.post('/schedules', { title, date }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSchedules();
    } catch (error) {
      console.error('Failed to create schedule', error);
    }
  };

  return (
    <Container>
      <h2>Schedules</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="datetime-local"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button type="submit">Add Schedule</Button>
      </Form>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>{schedule.title} - {new Date(schedule.date).toLocaleString()}</li>
        ))}
      </ul>
    </Container>
  );
};
