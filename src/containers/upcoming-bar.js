import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import Styles from "../style/app.scss";

import TaskList from "../components/task-list";

import TaskItem from "../components/task-item";

export default class UpcomingBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uptasks: {},
    };
    const setTasks = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.setState({ uptasks: this.props.uptasks }));
      }, 100);
      setTimeout(() => {
        resolve(this.uptaskItems());
      }, 100);
    });

    this.uptaskItems = this.uptaskItems.bind(this);
  }

  uptaskItems() {
    const entries = this.state.uptasks;
    _.forEach(
      (entries, "id"),
      <TaskItem key={entries.sn} entries={[entries]} />
    );
  }

  render() {
    return (
      <div className="Upcoming-container">
        <button onClick={this.props.showHideUP} className="Upcoming button">
          Upcoming Maint
        </button>
        <div id="Upcoming" className="Upcoming-content">
          <div className="label-wrapper">
            <label className="task-label">Task</label>
            <label className="lastdone-label">Next due</label>
            <label className="click-to-complete">Click to Complete</label>
          </div>
          <TaskList tasks={this.state.uptasks} />
        </div>
      </div>
    );
  }
}
