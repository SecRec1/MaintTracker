import React, { Component } from "react";
import NavigationComponent from "../navigation-container";
import SetTaskForm from "../forms/set-task-form";

import Scanner from "../scan-component";
export default class Scan extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Scanner />
      </div>
    );
  }
}
