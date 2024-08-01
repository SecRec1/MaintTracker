import React, { Component } from "react";

import Styles from "../../style/task-page.scss"
import TaskDetails from "../detail-page/task-details";

export default class TaskPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrapper">
        <div className="taskList">
          <TaskDetails taskid={this.props.match.params.id}/>
        </div>
       
      </div>
    );
  }
}