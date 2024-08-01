import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import RichTextEditor from "../../rich/rich-text-editor";

import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

import styles from "../../style/edit-task.scss";

export default class EditTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      job: "",
      instructions: "",
      editMode: false,
  
      apiAction: "put",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleInstructionsDrop = this.handleInstructionsDrop.bind(this);
    this.instructionsRef = React.createRef();
  }
  componentDidUpdate() {
    if (Object.keys(this.props.tasksToEdit).length > 0) {
      const { id, job, instructions } = this.props.tasksToEdit;

      this.props.clearTasksToEdit();
      this.setState({
        id: id,
        job: job,
        instructions: instructions || "",
        editMode: true,
      });
    }
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

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (this.state.instructions) {
      formData.append("instructions", this.state.instructions.dataURL);
    }

    const data = Object.fromEntries(formData);

    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        this.props.handleNewTaskSubmission(response);
        this.setState({
          id: "",
          job: "",
          instructions: "",
          editMode: "False",
        });
        [this.instructionsRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles();
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <form className="task-editor" onSubmit={this.handleSubmit}>
        <div className="task-edit-container">
          

          <input
            type="textarea"
            name="job"
            className="job"
            placeholder="Job"
            value={this.state.job}
            onChange={this.handleChange}
          />

          
        </div>

        <button type="submit">Save</button>
      </form>
    );
  }
}
