import React, { Component } from "react";

import styles from "../style/app.scss";
import TaskList from "../components/task-list";

import TaskItem from "../components/task-item";

export default class OverdueBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      odtasks: {},
    };
    const setTasks = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.setState({ odtasks: this.props.odtasks }));
      }, 100);
      setTimeout(() => {
        resolve(this.odtaskItems());
      }, 100);
    });

    this.odtaskItems = this.odtaskItems.bind(this);
  }

  odtaskItems() {
    const entries = this.state.odtasks;
    _.forEach(
      (entries, "id"),
      <TaskItem key={entries.sn} entries={[entries]} />
    );
  }

  render() {
    return (
      <div className="Overdue-container">
        <button onClick={this.props.showHideOD} className="Overdue button">
          Overdue Maint
        </button>
        <div id="Over" className="Overdue-content">
          <div className="label-wrapper">
            <label className="task-label">Task</label>
            <label className="lastdone-label">Next due</label>
            <label className="click-to-complete">Click to Complete</label>
          </div>
          <TaskList tasks={this.state.odtasks} />
        </div>
      </div>
    );
  }
}
