import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import useAuth from "../../../hooks/useAuth/useAuth";
import { data } from "./data";

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

    return () => {
      window.removeEventListener("scroll", changeBg);
    };
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
            {data.map((item) => (
              <Nav.Link
                style={{ color: `${bgcolor ? "white" : "black"}` }}
                key={item.title}
                as={HashLink}
                to={`/home/#${item.hashValue}`}
              >
                {item.title}
              </Nav.Link>
            ))}
          </Nav>
          {user.email ? (
            <>
              <Nav style={{ display: "flex", alignItems: "center" }}>
                <NavDropdown title="" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/dashboard">
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logOut()}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  style={{ color: `${bgcolor ? "white" : "black"}` }}
                  eventKey={2}
                >
                  {user.displayName}
                </Nav.Link>
                <Box sx={{ position: "relative" }}>
                  <ShoppingCartOutlinedIcon
                    color={bgcolor ? "primary" : "secondary"}
                  />
                  <Box
                    bgcolor={`${bgcolor ? "blue" : "purple"}`}
                    sx={{
                      height: 4,
                      width: 4,
                      padding: 1,
                      borderRadius: "50%",
                      color: "white",
                      position: "absolute",
                      right: -8,
                      top: -8,
                      display: "flex",
                      placeItems: "center",
                      fontSize: 8,
                    }}
                  >
                    1
                  </Box>
                </Box>
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
