import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;
  background-color: #343a40;
  color: white;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Navbar = () => (
  <Nav>
    <StyledLink to="/">Home</StyledLink>
    <StyledLink to="/login">Login</StyledLink>
    <StyledLink to="/signup">Signup</StyledLink>
    <StyledLink to="/profile">Profile</StyledLink>
    <StyledLink to="/schedules">Schedules</StyledLink>
    <StyledLink to="/tasks">Tasks</StyledLink>
  </Nav>
);

