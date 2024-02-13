import React from "react";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const HomeNavbar = () => {
  const toggleDarkMode = () => {
    const isDarkMode = document.body.dataset.bsTheme === "dark";

    if (isDarkMode) {
      document.body.dataset.bsTheme = "light";
    } else {
      document.body.dataset.bsTheme = "dark";
    }

    window.dispatchEvent(
      new CustomEvent("themeChanged", { detail: document.body.dataset.bsTheme })
    );
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#resume">Resume</Nav.Link>
              <NavDropdown
                title="Dropdown"
                id="basic-nav-dropdown"
                className="d-flex"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Button variant="secondary" onClick={toggleDarkMode}></Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default HomeNavbar;
