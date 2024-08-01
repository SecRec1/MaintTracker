import React, { Component } from "react";
import SpecsManager from "./specs-manager";
import TaskManager from "../task-manager";
import { NavLink } from "react-router-dom";

import axios from "axios";

import Styles from "../../style/manager.scss";
export default class Manager extends Component {
  constructor() {
    super();
    this.state = {
      admins: [],
      loggedin: false,
    };
    this.getLoggedinStatus = this.getLoggedinStatus.bind(this);
    this.getAdmins = this.getAdmins.bind(this);
    this.showHideTasks = this.showHideTasks.bind(this);
    this.showHideSpecs = this.showHideSpecs.bind(this);
  }
  showHideSpecs() {
    var specs = document.getElementById("specs");
    var tasks = document.getElementById("tasks");
    if (tasks.classList.contains("show")) {
      tasks.classList.remove("show");
    }
    specs.classList.toggle("show");
  }
  showHideTasks() {
    var tasks = document.getElementById("tasks");
    var specs = document.getElementById("specs");
    if (specs.classList.contains("show")) {
      specs.classList.remove("show");
    }
    tasks.classList.toggle("show");
  }
  async getLoggedinStatus() {
    const admins = this.state.admins;
    const loggedInAdmin = admins.find((admin) => admin.loggedin === true);

    if (loggedInAdmin) {
      this.setState({ loggedin: true });
    } else {
      this.setState({ loggedin: false });
    }
  }

  async getAdmins() {
    try {
      const response = await axios.get(`http://https://backend-ci48.onrender.com/Admin`);
      this.setState({ admins: response.data }, this.getLoggedinStatus);
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    await this.getAdmins();
  }
  render() {
    const { loggedin } = this.state;
    return (
      <div className="manager-container">
        <div className="button-manager">
          <button onClick={this.showHideSpecs}>SpecsManager</button>
          {loggedin && (<button onClick={this.showHideTasks}>TaskManager</button>)}
        </div>

        <div className="form-manager">
          <div id="specs" className="specs">
            <SpecsManager loggedin={this.state.loggedin} />
          </div>
          
            <div id="tasks" className="tasks ">
              <TaskManager loggedin={loggedin} />
            </div>
          
        </div>
      </div>
    );
  }
}
