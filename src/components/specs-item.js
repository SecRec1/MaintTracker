import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../style/specs-item.scss";

export default function (props) {
  const {
    qrcode,
    sn,
    name,
    designator,
    subdesignator,
    oil,
    coolant,
    department,
    motor,
  } = props.item;
  return (
    <div className="item-card">
      <div className="leftside">
        <img className="qrcode" src={qrcode} />
      </div>
      <div className="rightside">
        <div className="top">
          <div className="left">
            <h4 className="serialnumber ">{sn}</h4>
            <h4 className="name">{name}</h4>
            <h4 className="designator">{designator}</h4>
            <h4 className="subdesignator">{subdesignator}</h4>
          </div>
          <div className="right">
            <h4 className="department">{department}</h4>
            <h4 className="oil">{oil}</h4>
            <h4 className="coolant">{coolant}</h4>
            
          </div>
        </div>
        <div className="bottom">
          <img className="motor plate" src={motor} />
        </div>
      </div>
      

      
    </div>
  );
}
