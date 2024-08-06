import React, { Component } from "react";

import axios from "axios";
import styles from "../style/app.scss";
import _ from "lodash";
import { DateTime } from "luxon";

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {},
      input: "",
      matchingrecord: {},
      recordToEdit: {},
      visibleInputId: null,
      IBSTs: [],
      id: "",
      specs_sn: "",
      task_id: "",
      lastcompleted: "",
      nextdue: "",
      notes: "",
      duration: "",
      hdselector: "",
    };

    this.getTask = this.getTask.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.openInput = this.openInput.bind(this);
    this.fillInput = this.fillInput.bind(this);

    this.closeModal = this.closeModal.bind(this);
    this.checkForDate = this.checkForDate.bind(this);
    this.completeTask = this.completeTask.bind(this);

    this.updateCompletionDates = this.updateCompletionDates.bind(this);
  }
  async checkForDate(taskItem) {
    if (taskItem.hdselector === "days") {
      this.setState({ input: DateTime.now().toISODate() }, () => {
        this.getTask(taskItem);
      });
    } else {
      this.openInput(taskItem);
    }
  }
  getTask(taskItem) {
    const tasks = _.map(this.props.tasks, (task) => task);
    const { IBSTs } = this.state;
    const taskid = taskItem.task_id;
    const IBSTtoupdate = IBSTs.find((record) => record.task_id === taskid);

    if (!IBSTtoupdate) {
      console.error(`No IBST record found for task_id ${taskid}`);
      return;
    }

    const recordToEdit = tasks.find(
      (record) => record.task_id === IBSTtoupdate.task_id
    );
    if (recordToEdit) {
      this.setState(
        {
          id: recordToEdit.id,
          lastcompleted: recordToEdit.lastcompleted,
          nextdue: recordToEdit.nextdue,
          notes: recordToEdit.notes,
          duration: recordToEdit.duration,
          specs_sn: recordToEdit.specs_sn,
          task_id: recordToEdit.task_id,
          hdselector: recordToEdit.hdselector,
        },
        () => {
          if (this.state.hdselector === "days") {
            this.handleOk(taskItem);
          }
        }
      );
    }
  }
  openInput(taskItem) {
    this.setState({ visibleInputId: taskItem.id }, () => {
      this.getTask(taskItem);
    });
  }

  closeModal() {
    this.setState({ visibleInputId: null });
  }

  fillInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleOk() {
    await this.updateCompletionDates();
    this.closeModal();
    this.completeTask();
  }
  async updateCompletionDates() {
    const { hdselector, input, duration, lastcompleted } = this.state;
    const parsedDuration = parseInt(duration, 10);

    if (hdselector === "days") {
      const converteddate = DateTime.fromISO(input).toISODate();
      console.log("Setting lastcompleted to converted date:", converteddate);

      const nextdue = DateTime.fromISO(converteddate)
        .plus({ days: parsedDuration })
        .toISODate();
      console.log("Setting nextdue to (days):", nextdue);

      this.setState(
        {
          lastcompleted: converteddate,
          nextdue: nextdue,
        },
        () => {
          console.log("lastcompleted set to (days):", this.state.lastcompleted);
          console.log("nextdue set to:", this.state.nextdue);
        }
      );
    } else {
      console.log("Setting lastcompleted to hours:", input);

      const nextdue = parseInt(lastcompleted) + duration;
      console.log("Setting nextdue to (hours):", nextdue);

      this.setState(
        {
          lastcompleted: input,
          nextdue: nextdue,
        },
        () => {
          console.log(
            "lastcompleted set to (hours):",
            this.state.lastcompleted
          );
          console.log("nextdue set to:", this.state.nextdue);
        }
      );
    }
  }

  async completeTask() {
    const {
      id,
      specs_sn,
      task_id,
      lastcompleted,
      nextdue,
      notes,
      duration,
      hdselector,
    } = this.state;
    const data = {
      id: id,
      specs_sn: specs_sn,
      task_id: task_id,
      lastcompleted: lastcompleted,
      nextdue: nextdue,
      notes: notes,
      duration: duration,
      hdselector: hdselector,
    };
    console.log("Sending data:", data);
    axios
      .put(`http://127.0.0.1:8000/IBST/${this.state.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Task updated successfully", response);
      })
      .catch((error) => {
        console.error("There was an error updating the task!", error);
      });
  }
  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/IBST`)
      .then((record) => this.setState({ IBSTs: record.data }));
  }
  render() {
    const { tasks } = this.props;
    const { visibleInputId } = this.state;

    return (
      <div className="Task-list-wrapper">
        {_.map(tasks, (taskItem) => (
          <div key={taskItem.id} className="task-item-container">
            <div className="text-content">
              <div className="task-card">
                <h1 className="task">{taskItem.job}</h1>
                <h1 className="date">{taskItem.nextdue}</h1>
              </div>
            </div>
            <div className="complete">
              <button
                className="click-complete "
                onClick={() => this.checkForDate(taskItem)}
              >
                Complete
              </button>
              {visibleInputId === taskItem.id && (
                <div className="modal" style={{ display: "block" }}>
                  <div className="modal-content">
                    <input
                      type="number"
                      name="input"
                      placeholder="Input hours"
                      onChange={this.fillInput}
                      value={this.state.input}
                    />
                    <div className="buttons">
                      <button onClick={() => this.handleOk(taskItem)}>
                        OK
                      </button>
                      <button className="close" onClick={this.closeModal}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
