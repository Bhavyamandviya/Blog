import React from "react";

import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "../../Component/ProfileDropdown";
import toast from "react-hot-toast";

const NavbarHeader = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleAddBlogClick = () => {
    if (token === null) {
      toast.error("Please login first!");
    } else {
      navigate("/addBlog");
    }
  };
  return (
    <>
      <Navbar expand="lg" style={{ background: "#161D29" }}>
        <Container fluid style={{ width: "1000px" }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
              fontSize: "28px",
            }}
            className="navbar-brand"
          >
            Bloggers Spot
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px", display: "flex", gap: "1rem" }}
              navbarScroll
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  fontWeight: "400",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                Home
              </Link>

              {token === null ? (
                <Link
                  style={{
                    textDecoration: "none",
                    fontWeight: "400",
                    fontSize: "18px",
                    color: "white",
                  }}
                  onClick={handleAddBlogClick}
                >
                  Add Blog
                </Link>
              ) : (
                <Link
                  to="/addBlog"
                  style={{
                    textDecoration: "none",
                    fontWeight: "400",
                    fontSize: "18px",
                    color: "white",
                  }}
                >
                  Add Blog
                </Link>
              )}
            </Nav>
            <div style={{ display: "flex", gap: "1rem" }}>
              {token === null && (
                <Link
                  to="/login"
                  style={{
                    fontSize: "15px",
                    color: "white",
                    textDecoration: "none",
                    border: "1px solid white",
                    borderRadius: "5px",
                  }}
                  className="px-3"
                >
                  Login
                </Link>
              )}

              {token === null && (
                <Link
                  to="/signup"
                  style={{
                    fontSize: "15px",
                    color: "white",
                    textDecoration: "none",
                    border: "1px solid white",
                    borderRadius: "5px",
                  }}
                  className="px-3"
                >
                  SignUp
                </Link>
              )}
              {token !== null && <ProfileDropdown />}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarHeader;
