import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Project(props) {
  const [project, setProject] = useState({});
  const [actions, setActions] = useState([]);
  const id = props.match.params.id;
  useEffect(() => {
    axios
      .get(`/api/projects/${id}`)
      .then(res => {
        // console.log(res.data.project);
        setProject(res.data.project);
        setActions(res.data.project.actions);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);
  // console.log(actions[0]);
  return (
    <div className="Card" key={project.id}>
      <p className="projectName">{project.name}</p>
      <p className="projectDescription">{project.description}</p>
      <p className="projectCompleted">
        Completed:{" "}
        <span className="status">{project.completed ? "Yes" : "No"}</span>
      </p>
      <h2>Actions:</h2>
      <div className="actionList">
        {actions.map(action => (
          <div className="actionCard">
            {/* <p>{action.id}</p> */}
            <p>{action.description}</p>
            <p>{action.notes}</p>
            <p>
              Completed:{" "}
              <span className="status">{action.completed ? "Yes" : "No"}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
