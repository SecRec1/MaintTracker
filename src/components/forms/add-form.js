import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import QRCode from "qrcode.react";
import RichTextEditor from "../../rich/rich-text-editor";

import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
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

      specsid: "",
      apiUrl: "http://127.0.0.1:5000/Specs",
      apiAction: "post",
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

  handleSpecsId = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/Specs");
      const existingIds = response.data.map((item) => item.id);

      let newId = this.state.id; 
      while (existingIds.includes(newId)) {
        newId++;
      }

      this.setState({ id: newId });
    } catch (error) {
      console.error("Error fetching specs or finding available ID:", error);
    }
  };

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

  handleSubmit(event) {
    event.preventDefault();
    const qrCodeCanvas = document.querySelector("canvas");
    const qrCodeDataURL = qrCodeCanvas.toDataURL();
    const formData = new FormData(event.currentTarget);
    formData.append("id", this.state.id);

    formData.append("qrcode", qrCodeDataURL);

    if (this.state.motor) {
      formData.append("motor", this.state.motor.dataURL);
    }
    const data = Object.fromEntries(formData);

    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: data,
    })
      .then((response) => {
        this.props.handleNewFormSubmission(response);
        this.setState({
          id: 1,
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
        });
        [this.motorRef, this.qrcodeRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles();
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
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
    if (!this.props.loggedin) {
      return null;
    }
    const myStyle = {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      justifyItems: "center",
      width: "128",
      height: "128",
    };
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="Searchbar">
          <input
            type="text"
            name="name"
            placeholder="Equipment Name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="sn"
            placeholder="Equipment sn"
            value={this.state.sn}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={this.state.department}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="hours"
            placeholder="Hours"
            value={this.state.hours}
            onChange={this.handleChange}
          />
        </div>
        <div className="">
          <select
            name="designator"
            value={this.state.designator}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="placeholder">Pick a Designator</option>
            <option value="Untha ZR2400">Untha ZR2400</option>
            <option value="Untha XR">Untha XR</option>
            <option value="Ring Mill">Ring Mill</option>
            <option value="Optical Sorter">Optical Sorter</option>
            <option value="Eddy Current">Eddy Current</option>
          </select>

          <select
            name="subdesignator"
            value={this.state.subdesignator}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="placeholder">Pick a Subdesignator</option>
            <option value="none">None</option>
            <option value="Infeed">Infeed</option>
            <option value="Discharge">Discharge</option>
            <option value="Crossbelt">Crossbelt</option>
            <option value="Vibratory Mover">Vibratory Mover</option>
          </select>

          <input
            type="text"
            name="oil"
            placeholder="Oil Type"
            value={this.state.oil}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="coolant"
            placeholder="Coolant Type"
            value={this.state.coolant}
            onChange={this.handleChange}
          />
          <div className="File-holder" style={myStyle}>
            <QRCode value={`/Specs/${this.state.sn}`} />

            <DropzoneComponent
              ref={this.motorRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleMotorDrop()}
            >
              <div className="dz-message">Motor Plate</div>
            </DropzoneComponent>
          </div>
        </div>

        <button type="submit">Save</button>
      </form>
    );
  }
}
