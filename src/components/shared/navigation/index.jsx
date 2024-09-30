import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { data } from "./data";
import { ShoppingCart } from "@mui/icons-material";
import PersistentDrawerRight from "../../drawers/persistant-drawer";
import useAuth from "../../../hooks/useAuth";

const Navigation = ({ cart }) => {
  const navigate = useNavigate();
  const [bgcolor, setBgcolor] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

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
      style={{ fontWeight: 600, padding: 0 }}
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
                  <NavDropdown.Item onClick={() => {
                    logOut();
                    navigate("/login");
                  }}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  style={{ color: `${bgcolor ? "white" : "black"}` }}
                  eventKey={2}
                >
                  {user.displayName}
                </Nav.Link>
                <Box sx={{ position: "relative", top: "2rem" }}>
                  <Button onClick={handleDrawerOpen}>
                    <ShoppingCart
                      color={bgcolor ? "primary" : "secondary"}
                    />
                  </Button>

                  <Box
                    bgcolor={`${bgcolor ? "blue" : "purple"}`}
                    sx={{
                      height: 16,
                      width: 16,
                      borderRadius: "50%",
                      color: "white",
                      position: "absolute",
                      right: 4,
                      top: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 8,
                    }}
                  >
                    {cart.length}
                  </Box>
                  <PersistentDrawerRight open={open} setOpen={setOpen} />
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
