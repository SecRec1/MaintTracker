import React, { Component } from "react";
import axios from "axios";

import styles from "../../style/task-page.scss";
export default class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskItem: {},
    };
    this.getTaskItem = this.getTaskItem.bind(this);
  }
  getTaskItem() {
    axios
      .get(`http://127.0.0.1:8000/Task/${this.props.taskid}`)

      .then((response) => {
        
        this.setState({ taskItem: response.data });
      })
      .catch((error) => console.log("detail page getSpec error", error));
  }

  taskItem() {
    return this.state.data2.map((item) => {
      return <TaskItem key={item.sn} item={item} />;
    });
  }

  componentDidMount() {
    this.getTaskItem();
  }
  render() {
    return (
      <div className="tasklist-wrapper">
        <div className="id-container">
          <h1 className="id">ID:</h1>
          <h1>{this.state.taskItem.id}</h1>
        </div>
        <div className="job-container">
          <h1 className="job">Task:</h1>
          <h1>{this.state.taskItem.job}</h1>
        </div>

        <div className="instructions-container">
          <h1>Instructions:</h1>
          <img src={this.state.taskItem.instructions} />
        </div>
      </div>
    );
  }
}
