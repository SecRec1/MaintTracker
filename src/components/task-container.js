import React, { Component } from "react";
import axios from "axios";

import DueBar from "../containers/due-bar";
import UpcomingBar from "../containers/upcoming-bar";
import OverdueBar from "../containers/overdue-bar";
import Styles from "../style/app.scss"
export default class TaskBarManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      odtasks: [],
      duetasks: [],
      uptasks: [],
    };
    this.showHideDue = this.showHideDue.bind(this);
    this.showHideOD = this.showHideOD.bind(this);
    this.showHideUP = this.showHideUP.bind(this);

    const setTasks = new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this.setState({ odtasks: this.props.overdue }),
          this.setState({ uptasks: this.props.upcoming }),
          this.setState({ duetasks: this.props.due })
        );
      }, 100);
    });
  }
  showHideDue() {
    var due = document.getElementById("Due");
    var overdue = document.getElementById("Over");
    var upcoming = document.getElementById("Upcoming");
    if (upcoming.classList.contains("show")) {
      upcoming.classList.remove("show");
    }
    if (overdue.classList.contains("show")) {
      overdue.classList.remove("show");
    }
    due.classList.toggle("show");
  }

  showHideUP() {
    var upcoming = document.getElementById("Upcoming");
    var overdue = document.getElementById("Over");
    var due = document.getElementById("Due");
    if (due.classList.contains("show")) {
      due.classList.remove("show");
    }
    if (overdue.classList.contains("show")) {
      overdue.classList.remove("show");
    }
    upcoming.classList.toggle("show");
  }

  showHideOD() {
    var overdue = document.getElementById("Over");
    var upcoming = document.getElementById("Upcoming");
    var due = document.getElementById("Due");
    if (due.classList.contains("show")) {
      due.classList.remove("show");
    }
    if (upcoming.classList.contains("show")) {
      upcoming.classList.remove("show");
    }
    overdue.classList.toggle("show");
  }
  // taskItems() {
  //   return this.state.taskItems.map((item) => {
  //     return <TaskItem key={item.specs_sn} item={item} />;
  //   });
  // }

  render() {
    return (
      <div className="task-bar-container">
        <OverdueBar odtasks={this.state.odtasks} showHideOD={this.showHideOD} />
        <DueBar duetasks={this.state.duetasks} showHideDue={this.showHideDue} />
        <UpcomingBar
          uptasks={this.state.uptasks}
          showHideUP={this.showHideUP}
        />
      </div>
    );
  }
}
