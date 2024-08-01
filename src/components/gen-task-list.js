import React from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../style/task-styles.scss";
import Icons from "../components/helpers/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditTaskForm from "../components/forms/edit-task-form";

const GenTaskList = (props) => {
  Icons();

  const tasks = props.tasks;
  const items = _.map(tasks, (item) => {
    return item;
  });
  const taskList = items.map((taskItem) => {
    return (
      <div key={taskItem.id} className="task-item-container">
        <div className="text-content">
          <h1 key={taskItem.id} className="task">
            {taskItem.job}
          </h1>
        </div>
        <div className="actions">
          <Link className="help-button button" to={`/Task/${taskItem.id}`}>
            <FontAwesomeIcon className="action-icon" icon="file-lines" />
          </Link>
          <button
            className="delete button"
            onClick={() => props.handleDeleteClick(taskItem)}
          >
            <FontAwesomeIcon className="action-icon" icon="trash" />
          </button>
          
        </div>
      </div>
    );
  });

  return <div className="Task-list-wrapper">{taskList}</div>;
};

export default GenTaskList;
function showHideHelp() {
  const help = document.getElementById("help");
  help.classList.toggle("show");
}
