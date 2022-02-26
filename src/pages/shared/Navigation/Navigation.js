import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import useAuth from "../../../hooks/useAuth/useAuth";

const Navigation = () => {
  const [bgcolor, setBgcolor] = useState(false);

  const changeBg = () => {
    if (window.scrollY >= 80) {
      setBgcolor(true);
    } else {
      setBgcolor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBg);
  }, []);

  const { user, logOut } = useAuth();
  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      bg={bgcolor ? "dark" : "transparent"}
      variant={bgcolor ? "dark" : "light"}
      style={{ fontWeight: 600 }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/home">
          Bike Island
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link as={HashLink} to="/home#home">
              Home
            </Nav.Link>
            <Nav.Link as={HashLink} to="/home#services">
              Services
            </Nav.Link>
            <Nav.Link as={HashLink} to="/home#about">
              About
            </Nav.Link>
            <Nav.Link as={HashLink} to="/home#products">
              Products
            </Nav.Link>
            <Nav.Link as={HashLink} to="/home#reviews">
              Reviews
            </Nav.Link>
            <Nav.Link as={HashLink} to="/home#contact">
              Contact
            </Nav.Link>
          </Nav>
          {user.email ? (
            <>
              <Nav>
                <NavDropdown title="" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/dashboard">
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logOut()}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link eventKey={2}>{user.displayName}</Nav.Link>
              </Nav>
            </>
          ) : (
            <Nav.Link
              style={{
                marginLeft: "auto",
                color: `${bgcolor ? "white" : "black"}`,
              }}
              as={Link}
              to="/login"
            >
              Log In
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
