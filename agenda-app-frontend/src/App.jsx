import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GlobalStyle from './components/styles/GlobalStyle';
import { Container } from './components/styles/Container';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Signup } from './components/Singup';
import { Profile } from './components/Profile';
import { Schedule } from './components/Schedule';
import { Task } from './components/Task';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedules" element={<Schedule />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/" element={<Container><h1>Welcome to the Agenda App</h1></Container>} />
      </Routes>
    </Router>
  );
}

export default App;
