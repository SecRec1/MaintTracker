import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../style/specs-item.scss";

export default class ItemCard extends Component {
  constructor() {
    super();
    this.state = {
      specsItems: [],
      specsItem: {},
      
    };

    this.getSpecsItems = this.getSpecsItems.bind(this);
    this.getSpecsItem = this.getSpecsItem.bind(this);
  }

  getSpecsItem() {
    axios
      .get(`http://127.0.0.1:5000/Specs/${this.props.match.params.sn}`)

      .then((response) => {
        this.setState({ specsItem: response.data });
      })
      .catch((error) => console.log("detail page getSpec error", error));
  }

  getSpecsItems() {
    axios
      .get(`http://127.0.0.1:5000/Specs`)
      .then((response) => {
        this.setState({
          specsItems: [...response.data],
        });
      })
      .catch((error) => {
        console.log("Specs Manager get specs error", error);
      });
  }
  specsItem() {
    return this.state.specsItem.filter((item) => {
      return <SpecsItem key={item.sn} item={item} />;
    });
  }
  specsItems() {
    return this.state.specsItems.map((item) => {
      return <SpecsItem key={item.sn} item={item} />;
    });
  }
  render() {
    return (
      <div className="item-card2">
        <div className="leftside">
          <img className="qrcode" src={this.state.qrcode} />
        </div>
        <div className="rightside">
          <div className="top">
            <div className="left">
              <h4 className="serialnumber ">{this.state.sn}</h4>
              <h4 className="name">{this.state.name}</h4>
              <h4 className="designator">{this.state.designator}</h4>
              <h4 className="subdesignator">{this.state.subdesignator}</h4>
            </div>
            <div className="right">
              <h4 className="department">{this.state.department}</h4>
              <h4 className="oil">{this.state.oil}</h4>
              <h4 className="coolant">{this.state.coolant}</h4>
            </div>
          </div>
          <div className="bottom">
            <img className="motor plate" src={this.state.motor} />
          </div>
        </div>

        <Link to={`/Specs/${this.state.sn}`}>More</Link>
      </div>
    );
  }
}
