import React, { Component } from "react";
import axios from "axios";

import AddForm from "../forms/add-form";
import Search from "../forms/search-form";
import RecordList from "../list-component";
import SpecsDetail from "../detail-page/specs-details";

import Styles from "../../style/manager.scss";

export default class SpecsManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specsItems: [],
      
      SpecsPageToEdit: {},
    };

    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);

    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.getSpecsItems = this.getSpecsItems.bind(this);
  }

  getSpecsItems() {
    axios
      .get(`http://https://backend-ci48.onrender.com/Specs`)
      .then((response) => {
        this.setState({
          specsItems: [...response.data],
        });
      })
      .catch((error) => {
        console.log("Specs Manager get specs error", error);
      });
  }

  handleFormSubmissionError(error) {
    console.log("Submission error", error);
  }
  handleNewFormSubmission(specsItem) {
    this.setState({
      specsItems: [specsItem].concat(this.state.specsItems),
    });
    console.log("New form submission", this.state.specsItems);
  }

  handleDeleteClick(specsItem) {
    console.log("delete", specsItem);
    axios.delete(`http://https://backend-ci48.onrender.com/Specs/${specsItem.sn}`);
    window.location.reload();
  }
  componentDidMount() {
    this.getSpecsItems();
  }

  render() {
    return (
      <div className="specs-manager-wrapper">
        <AddForm
          loggedin={this.props.loggedin}
          handleFormSubmissionError={this.handleFormSubmissionError}
          handleNewFormSubmission={this.handleNewFormSubmission}
        />

        <RecordList
          loggedin={this.props.loggedin}
          data={this.state.specsItems}
          handleDeleteClick={this.handleDeleteClick}
        />
      </div>
    );
  }
}
