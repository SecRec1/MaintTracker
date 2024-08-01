import React, { Component } from "react";
import axios from "axios";
import SetTaskForm from "./forms/set-task-form";
import AddTask from "./forms/add-task";
import GenTaskList from "../components/gen-task-list";
import Styles from "../style/set-task.scss";

export default class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskItems: [],
      taskItemsToEdit: [],
      taskModalIsOpen: false,
    };
    this.handleNewTaskSubmission = this.handleNewTaskSubmission.bind(this);
    this.handleTaskSubmissionError = this.handleTaskSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.getTaskItems = this.getTaskItems.bind(this);
    this.handleCloseInstructionsModal = this.handleCloseInstructionsModal.bind(this);
    this.handleOpenInstructionsModal = this.handleOpenInstructionsModal.bind(this);
  }
  handleOpenInstructionsModal() {
    this.setState({ taskModalIsOpen: true });
  };
  handleCloseInstructionsModal() {
    this.setState({ taskModalIsOpen: false });
    console.log("testing modal close");
  };
  getTaskItems() {
    axios
      .get(`http://127.0.0.1:5000/Task`)
      .then((response) => {
        this.setState({
          taskItems: [...response.data],
        });
      })
      .catch((error) => {
        console.log("Task Manager gettasks error", error);
      });
  }
  handleTaskSubmissionError(error) {
    console.log("Submission error", error);
  }
  handleNewTaskSubmission(taskItem) {
    this.setState({
      taskItems: [taskItem].concat(this.state.taskItems),
    }).catch((error) => {
      this.handleTaskSubmissionError(error);
    });
    console.log("New Task submission", this.state.taskItems);
  }

  handleDeleteClick(taskItem) {
    axios.delete(`http://127.0.0.1:5000/Task/${taskItem.id}`);
    window.location.reload();
  }
  componentDidMount() {
    this.getTaskItems();
  }
  render() {
    return (
      <div className="task-container">
        <div className="set-task-form">
          <h1>Set machine tasks by SN</h1>
          <SetTaskForm />
        </div>
        <br></br>
        <div>
          <h1>Add New Task</h1>
          <AddTask
            tasks={this.state.taskItems}
            handleNewTaskSubmission={this.handleNewTaskSubmission}
          />
        </div>
        <div className="general-taskList">
          <GenTaskList
            tasks={this.state.taskItems}
            handleDeleteClick={this.handleDeleteClick}
            taskModalIsOpen={this.state.taskModalIsOpen}
            handleCloseInstructionsModal={this.handleCloseInstructionsModal}
            handleOpenInstructionsModal={this.handleOpenInstructionsModal}
          />
        </div>
      </div>
    );
  }
}
