import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import useAuth from '../../../hooks/useAuth/useAuth';




const Navigation = () => {
  const {user, logOut} = useAuth();
  return (
    <Navbar fixed='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand to="/home#home">Bike Island</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    
      <Nav className="m-auto">
        <Nav.Link as={HashLink} to="/home#home">Home</Nav.Link>
        <Nav.Link as={HashLink} to="/home#services">Services</Nav.Link>
        <Nav.Link as={HashLink} to="/home#about">About</Nav.Link>
        <Nav.Link as={HashLink} to="/home#products">Products</Nav.Link>
        <Nav.Link as={HashLink} to="/home#reviews">Reviews</Nav.Link>
        <Nav.Link as={HashLink} to="/home#contact">Contact</Nav.Link>
        
      </Nav>
      {
      user.email ? <>
      <Nav>
      <NavDropdown title="" id="collasible-nav-dropdown">
          <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => logOut()}>Log Out</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link eventKey={2}>
          {user.displayName}
        </Nav.Link>
      </Nav>
      </>
      :
      <Nav.Link style={{marginLeft: 'auto'}} as={Link} to="/login">Log In</Nav.Link>
    }
  </Navbar.Collapse>
  </Container>
</Navbar>
  );
};

export default Navigation;