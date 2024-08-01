import React, { Component } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import RichTextEditor from "../rich/rich-text-editor";

import filepickerCss from "../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../node_modules/dropzone/dist/min/dropzone.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EditForm from "../components/forms/edit-form";

export default class SpecsEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      specsToEdit: {},
      showModal: false,
      
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.populateSpecsToEdit = this.populateSpecsToEdit.bind(this);
    this.clearSpecsToEdit = this.clearSpecsToEdit.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);

    this.handleMotorDrop = this.handleMotorDrop.bind(this);
    this.handleQRCodeDrop = this.handleQRCodeDrop.bind(this);

    this.motorRef = React.createRef();
    this.qrcodeRef = React.createRef();
  }

  clearSpecsToEdit() {
    this.setState({ specsToEdit: {} });
  }

  handleMotorDrop() {
    return {
      addedfile: (file) => this.setState({ motor: file }),
    };
  }

  handleQRCodeDrop() {
    return {
      addedfile: (file) => this.setState({ qrcode: file }),
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
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
    
  }
  handleFormSubmit(event) {
    console.log("Form Submitted");
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleEditClick() {
    this.populateSpecsToEdit();
    this.handleOpenModal();
  }
  populateSpecsToEdit() {
    this.setState({ specsToEdit: this.props.specsItem });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleEditClick}>
          <FontAwesomeIcon className="action-icon" icon="edit" />
        </button>
        <ReactModal
          ariaHideApp={false}
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
        >
          <EditForm
            specsToEdit={this.state.specsToEdit}
            clearSpecsToEdit={this.clearSpecsToEdit}
            handleCloseModal={this.handleCloseModal}
            handleFormSubmit={this.handleFormSubmit}
          />
          
        </ReactModal>
      </div>
    );
  }
}
