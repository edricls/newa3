import { useEffect, useState } from 'react';
import api from '../api';
import { Container } from './styles/Container';

export const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await api.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data.user);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h2>{profile.email}</h2>
      <h3>Schedules</h3>
      <ul>
        {profile.schedules.map((schedule) => (
          <li key={schedule.id}>{schedule.title}</li>
        ))}
      </ul>
      <h3>Tasks</h3>
      <ul>
        {profile.tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </Container>
  );
};

