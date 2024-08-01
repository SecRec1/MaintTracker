import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import { DateTime } from "luxon";
import RichTextEditor from "../../rich/rich-text-editor";

import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";


export default class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      job: "",
      instructions: "Ask Maint for more info",
      taskid: "",
      taskItems: [],
    };
    this.handleTaskInfo = this.handleTaskInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInstructionsDrop = this.handleInstructionsDrop.bind(this);
    this.handleNewTaskSubmission = this.handleNewTaskSubmission.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.instructionsRef = React.createRef();
  }
  handleNewTaskSubmission(taskItem) {
    this.setState({
      taskItems: [taskItem].concat(this.state.taskItems),
    });
    console.log("New task submission", this.state.taskItems);
  }
  handleTaskInfo() {
    axios.get(`http://https://backend-ci48.onrender.com/Task`).then((response) => {
      this.setState({ taskid: response.data.length + 1 });
      this.setState({ taskItems: response.data });
    });
  }

  handleInstructionsDrop() {
    return {
      addedfile: (file) => this.setState({ instructions: file }),
    };
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
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
      formData.append("id", this.state.taskid)
    if (this.state.instructions) {
      formData.append("instructions", this.state.instructions.dataURL);
    }
    const data = Object.fromEntries(formData);

    axios.post("http://https://backend-ci48.onrender.com/Task", data).then((response) => {
      this.props.handleNewTaskSubmission(response.data);
      this.setState({
        job: "",
        instructions: "Ask Maint for more info",
        taskid: "",
      });
      [this.instructionsRef].forEach((ref) => {
        ref.current.dropzone.removeAllFiles();
      });
    });
    window.location.reload();
  }
  componentDidMount() {
    this.handleTaskInfo();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          
          <input
            type="text"
            name="job"
            placeholder="Job"
            value={this.state.job}
            onChange={this.handleChange}
          />

          <div className="">
            <DropzoneComponent
              ref={this.instructionsRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleInstructionsDrop()}
            >
              <div className="dz-message">
                Instructional File<br></br> (Must be under 1 Mb)
              </div>
            </DropzoneComponent>
          </div>
          <button type="submit">Save</button>
        </form>
        
      </div>
    );
  }
}
