import React, { Component } from "react";
import axios from "axios";


import SpecsItem from "../components/specs-item";

export default class SpecsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sn: "",
      name: "",
      qrcode: "",
      designator: "",
      subdesignator: "",
      oil: "",
      coolant: "",
      department: "",
      motor: "",
      data: [],
    };
    this.getSpecsItems = this.getSpecsItems.bind(this);
  }

  getSpecsItems() {
    axios
      .get(`http://127.0.0.1:5000/Specs`)
      .then((response) => {
        this.setState({
          data: [...response.data],
        });
      })
      .catch((error) => {
        console.log("SpecsContainer get specs error", error);
      });
  }
  specsItems() {
    return this.state.data.map((item) => {
      return <SpecsItem key={item.sn} item={item} />;
    });
  }
  componentDidMount() {
    this.getSpecsItems();
  }
  render() {
    return (
      <div>
        
        
      </div>
    );
  }
}
