import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <header className="gh-navbar">
      {/* LEFT */}
      <div className="gh-leftn">
        <Link to="/" className="gh-logo">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
          />
        </Link>

        <input className="gh-search" placeholder="Search or jump to..." />
      </div>

      {/* RIGHT */}
      <div className="gh-rightn">
        <Link to="/create" className="gh-btn">
          + New
        </Link>

        <Link to="/profile" className="gh-avatar">
          <img
            src="https://plus.unsplash.com/premium_vector-1727952230626-26e0abea2eed?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
