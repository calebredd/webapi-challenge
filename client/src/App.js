import React, { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import Cards from "./components/Cards.js";
import Project from "./components/Project.js";
function App() {
  // const [projects, setProjects] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("/api/projects")
  //     .then(res => {
  //       // console.log(res.data.projects);
  //       setProjects(res.data.projects);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }, []);
  // console.log(projects);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Projects/Actions API</h1>
      </header>
      <Route exact path="/" render={props => <Cards {...props} />} />
      <Route path="/:id" render={props => <Project {...props} />} />
    </div>
  );
}

export default App;
