import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import Styles from "../style/record-list.scss";

const RecordList = (props) => {
  const specsList = props.data.map((specsItem) => {
    const isDisabled = !props.loggedin;
    return (
      <div key={specsItem.sn} className="Specs-item-container">
        <div className="text-content">
          <div className="item-card">
            <div className="leftside">
              <div className="top">
                <img className="qrcode" src={specsItem.qrcode} />
              </div>

              <div className="bottom">
                <img className="motor plate" src={specsItem.motor} />
              </div>
            </div>

            <div className="rightside">
              <div className="left">
                <h6 className="serialnumber item">
                  Serial Number<br></br>
                  {specsItem.sn}
                </h6>

                <h6 className="designator item">
                  Make/Model<br></br>
                  {specsItem.designator}
                </h6>
                <h6 className="name item">
                  Machine Type<br></br>
                  {specsItem.name}
                </h6>
                <h6 className="subdesignator item">
                  Machine Sub-Type<br></br>
                  {specsItem.subdesignator}
                </h6>
              </div>
              <div className="right">
                <h6 className="department item">
                  Department<br></br>
                  {specsItem.department}
                </h6>
                <h6 className="oil item">
                  Oil Type<br></br>
                  {specsItem.oil}
                </h6>
                <h6 className="coolant item">
                  Coolant Type<br></br>
                  {specsItem.coolant}
                </h6>
                <h6 className="hours item">
                  Machine Hours:<br></br>
                  {specsItem.hours}
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="actions">
          <a
            className={`action-icon ${isDisabled ? 'disabled' : ''}`}
            onClick={() => !isDisabled && props.handleDeleteClick(specsItem)}
          >
            <FontAwesomeIcon icon="trash" />
          </a>
          <Link className="record-link" to={`/Specs/${specsItem.sn}`}>
            Detail Page
          </Link>
        </div>
      </div>
    );
  });

  return <div className="Specs-list-wrapper">{specsList}</div>;
};

export default RecordList;
