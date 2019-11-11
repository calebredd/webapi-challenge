import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Cards(props) {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get("/api/projects")
      .then(res => {
        // console.log(res.data.projects);
        setProjects(res.data.projects);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  console.log(projects);
  return (
    <div className="projectList">
      {projects.map(project => (
        <div className="projectCard" key={project.id}>
          <p className="projectName">{project.name}</p>
          <p className="projectDescription">{project.description}</p>
          <p className="projectCompleted">
            Completed:{" "}
            <span className="status">{project.completed ? "Yes" : "No"}</span>
          </p>
          <Link to={`/${project.id}`}>
            <button>See Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
