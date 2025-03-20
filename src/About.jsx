import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="main">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about" className="active">
          About
        </Link>
      </nav>
      <h1>This is the About page of the Todo List App.</h1>
    </main>
  );
};

export default About;
