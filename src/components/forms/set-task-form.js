import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import { DateTime, Duration } from "luxon";
import RichTextEditor from "../../rich/rich-text-editor";
import "regenerator-runtime/runtime";
import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import TaskOptions from "../task-selections/checkbox-list";
import Styles from "../../style/set-task.scss";
export default class SetTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sn: "",
      tasks: [],
      taskid: [],
      duration: "",
      startedatdate: "",
      startedathours: "",
      instructions: "",
      hdselector: "",
      lastcompleted: "",
      nextdue: "",
      editMode: "False",
      notes: "",
      newtaskid: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.setLastCompleted = this.setLastCompleted.bind(this);
    this.setNextdue = this.setNextdue.bind(this);
    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.switchToDate = this.switchToDate.bind(this);
    this.switchToHours = this.switchToHours.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event) {
    this.setState({
      hdselector: event.target.value,
    });
    if (event.target.value === "days") {
      this.switchToDate();
    } else {
      if (event.target.value === "hours") {
        this.switchToHours();
      }
    }
  }

  switchToDate() {
    const date = document.getElementById("days");
    const time = document.getElementById("hours");
    time.classList.remove("show");
    date.classList.add("show");
  }
  switchToHours() {
    const date = document.getElementById("days");
    const time = document.getElementById("hours");
    date.classList.remove("show");
    time.classList.add("show");
  }
  getTasks() {
    axios.get("http://127.0.0.1:5000/Task").then((response) => {
      this.setState({ tasks: response.data });
    });
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
    };
  }

  async setLastCompleted() {
    const { hdselector, startedatdate, startedathours } = this.state;
    const converteddate = DateTime.fromISO(startedatdate).toISODate();
    console.log("setLastCompleted called with hdselector:", hdselector);

    if (hdselector === "days") {
      console.log("Setting lastcompleted to converted date:", converteddate);
      this.setState({ lastcompleted: converteddate }, () => {
        console.log("lastcompleted set to (days):", this.state.lastcompleted);
      });
    } else {
      console.log("Setting lastcompleted to hours:", startedathours);
      this.setState({ lastcompleted: startedathours }, () => {
        console.log("lastcompleted set to (hours):", this.state.lastcompleted);
      });
    }
  }

  async setNextdue() {
    const { hdselector, duration, lastcompleted } = this.state;
    const parsedDuration = parseInt(duration, 10);
    console.log("setNextdue called with lastcompleted:", lastcompleted);

    if (hdselector === "hours") {
      const nextdue = parseInt(lastcompleted) + parseInt(duration);
      console.log("Setting nextdue to (hours):", nextdue);
      this.setState({ nextdue }, () => {
        console.log("nextdue set to:", this.state.nextdue);
      });
    } else {
      const nextdue = DateTime.fromISO(lastcompleted)
        .plus({ days: parsedDuration })
        .toISODate();
      console.log("Setting nextdue to (days):", nextdue);
      this.setState({ nextdue }, () => {
        console.log("nextdue set to:", this.state.nextdue);
      });
    }
  }

  async handleNewFormSubmission() {
    console.log("handleNewFormSubmission called");
    await this.setLastCompleted();
    await this.setNextdue();
  }

  handleSubmit(event) {
    event.preventDefault();

    this.handleNewFormSubmission().then(() => {
      const {
        sn,
        taskid,
        lastcompleted,
        nextdue,
        notes,
        duration,
        hdselector,
      } = this.state;
      const data = {
        specs_sn: sn,
        task_id: taskid,
        lastcompleted: lastcompleted,
        nextdue: nextdue,
        notes: notes,
        duration: duration,
        hdselector: hdselector,
      };
      console.log("Data to be sent:", data);
      if (data.specs_sn === '') {
        alert("Please enter a valid Equipment SN");
      } else {
        axios
          .post(`http://127.0.0.1:5000/IBST`, data)
          .then(
            this.setState({
              newtaskid: "",
              sn: "",
              taskid: "",
              lastcompleted: "",
              nextdue: "",
              duration: "",
              startedatdate: "",
              startedathours: "",
              hdselector: "",
              notes: "",
            })
          )
          .catch((error) => {
            console.log("error", error);
          });
      }
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  componentDidMount() {
    this.getTasks();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="Set-task-Form">
          <div className="upper-input-container">
            <input
              type="text"
              name="sn"
              placeholder="Equipment SN"
              value={this.state.sn}
              onChange={this.handleChange}
            />

            <select
              type="text"
              name="taskid"
              placeholder="Select Tasks"
              onChange={this.handleChange}
              value={this.state.taskid}
            >
              <option>Select Task</option>
              <TaskOptions key={this.state.taskid} items={this.state.tasks} />
            </select>

            <select
              className="hdselector"
              type="text"
              name="hdselector"
              placeholder="Pick one"
              value={this.state.hdselector}
              onChange={this.handleSelect}
            >
              <option value="pick">H or D</option>
              <option value="hours">Hours</option>
              <option value="days">Days</option>
            </select>
            <input
              className="duration"
              type="text"
              name="duration"
              placeholder="Duration"
              value={this.state.duration}
              onChange={this.handleChange}
            />
            <div className="startedat">
              <input
                id="days"
                type="date"
                name="startedatdate"
                placeholder="Starting at?"
                value={this.state.startedatdate}
                onChange={this.handleChange}
                className="start days "
              />

              <input
                id="hours"
                type="number"
                name="startedathours"
                placeholder="Starting at?"
                value={this.state.startedathours}
                onChange={this.handleChange}
                className="start hours show"
              />
            </div>
          </div>

          <textarea
            type="text"
            name="notes"
            placeholder="Notes"
            value={this.state.notes}
            onChange={this.handleChange}
            className="lower-input-container"
          ></textarea>
        </div>

        <button type="submit">Save</button>
      </form>
    );
  }
}
