import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import QRCode from "qrcode.react";
import RichTextEditor from "../../rich/rich-text-editor";

import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import styles from "../../style/edit-form";

export default class EditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      sn: "",
      name: "",
      qrcode: "",
      designator: "",
      subdesignator: "",
      oil: "",
      coolant: "",
      department: "",
      motor: "",
      hours: "",
      editMode: false,
      specsid: "",
      //apiUrl: `http://127.0.0.1:8000/Specs/${this.state.sn}`,
      apiAction: "patch",
    };

    this.handleSpecsId = this.handleSpecsId.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);

    this.handleMotorDrop = this.handleMotorDrop.bind(this);
    this.handleQRCodeDrop = this.handleQRCodeDrop.bind(this);

    this.motorRef = React.createRef();
    this.qrcodeRef = React.createRef();
  }

  componentDidUpdate() {
    if (Object.keys(this.props.specsToEdit).length > 0) {
      const {
        id,
        qrcode,
        sn,
        name,
        designator,
        subdesignator,
        oil,
        coolant,
        department,
        motor,
        hours,
      } = this.props.specsToEdit;
      this.props.clearSpecsToEdit();
      this.setState({
        id: id,
        sn: sn || "",
        name: name || "",
        qrcode: qrcode.dataURL || "",
        designator: designator || "",
        subdesignator: subdesignator || "",
        oil: oil || "",
        coolant: coolant || "",
        department: department || "",
        motor: motor.dataURL || "",
        hours: hours || "",
        editMode: true,
        apiUrl: `http://127.0.0.1:8000/Specs/${sn}`,
        apiAction: "PUT",
      });
    }
  }
  handleSpecsId() {
    axios.get(`http://127.0.0.1:8000/Specs`).then((response) => {
      this.setState({ specsid: response.data.length + 1 });
    });
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

  async handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("id", this.state.specsid);
    if (this.state.qrcode) {
      formData.append("qrcode", this.state.qrcode.dataURL);
    }

    if (this.state.motor) {
      formData.append("motor", this.state.motor.dataURL);
    }
    const data = Object.fromEntries(formData);

    axios({
      method: "PUT",
      url: `http://127.0.0.1:8000/Specs/${this.state.sn}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        this.props.handleFormSubmit(response);
        this.setState({
          id: "",
          sn: "",
          name: "",
          qrcode: "",
          designator: "",
          subdesignator: "",
          oil: "",
          coolant: "",
          department: "",
          motor: "",
          hours: "",
          editMode: "False",
        });
        [this.motorRef, this.qrcodeRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles();
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
    this.props.handleCloseModal();
    window.location.reload();
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    this.handleSpecsId();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="edit-form">
        <div className="left-left">
          <h1>Equipment Name</h1>
          <input
            type="text"
            name="name"
            placeholder="Equipment Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <h1>Equipment SN</h1>
          <input
            type="text"
            name="sn"
            placeholder="Equipment sn"
            value={this.state.sn}
            onChange={this.handleChange}
          />
          <h1>Department</h1>
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={this.state.department}
            onChange={this.handleChange}
          />
          <h1>Machine Hours</h1>
          <input
            type="text"
            name="hours"
            placeholder="Hours"
            value={this.state.hours}
            onChange={this.handleChange}
          />
        </div>

        <div className="left-right">
          <h1>Designator</h1>
          <select
            name="designator"
            value={this.state.designator}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="none">None</option>
            <option value="Untha ZR2400">Untha ZR2400</option>
            <option value="Untha XR">Untha XR</option>
            <option value="Ring Mill">Ring Mill</option>
            <option value="Optical Sorter">Optical Sorter</option>
            <option value="Eddy Current">Eddy Current</option>
          </select>
          <h1>Sub-Designator</h1>
          <select
            name="subdesignator"
            value={this.state.subdesignator}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="none">None</option>
            <option value="Infeed">Infeed</option>
            <option value="Discharge">Discharge</option>
            <option value="Crossbelt">Crossbelt</option>
            <option value="Vibratory Mover">Vibratory Mover</option>
          </select>
          <h1>Oil Type</h1>
          <input
            type="text"
            name="oil"
            placeholder="Oil Type"
            value={this.state.oil}
            onChange={this.handleChange}
          />
          <h1>Coolant Type</h1>
          <input
            type="text"
            name="coolant"
            placeholder="Coolant Type"
            value={this.state.coolant}
            onChange={this.handleChange}
          />
        </div>
        <div className="right">
          <QRCode
            ref={this.qrcodeRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            value={`/Specs/${this.state.sn}`}
          />
          <DropzoneComponent
            ref={this.motorRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleMotorDrop()}
          >
            <div className="dz-message">Motor Plate</div>
          </DropzoneComponent>
        </div>

        <button type="submit">Save</button>
      </form>
    );
  }
}
