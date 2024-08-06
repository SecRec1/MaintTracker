import React, { Component } from "react";
import axios from "axios";

import SpecsDetail from "../detail-page/specs-details";
import TaskCalculator from "../upcoming-tasks";

import styles from "../../style/specs-page.scss";

export default class SpecsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specsItem: {},
      admins: [],
      loggedin: false,
    };
    this.getSpecs = this.getSpecs.bind(this);
    this.getLoggedinStatus = this.getLoggedinStatus.bind(this);
    this.getAdmins = this.getAdmins.bind(this);
  }

  getSpecs() {
    axios
      .get(`http://127.0.0.1:8000/Specs/${this.props.match.params.sn}`)
      .then((response) => {
        this.setState({
          specsItem: response.data,
        });
      });
  }
  async getLoggedinStatus() {
    const admins = this.state.admins;
    const loggedInAdmin = admins.find((admin) => admin.loggedin === true);

    if (loggedInAdmin) {
      this.setState({ loggedin: true });
    } else {
      this.setState({ loggedin: false });
    }
  }

  async getAdmins() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/Admin`);
      this.setState({ admins: response.data }, this.getLoggedinStatus);
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    this.getSpecs();
    await this.getAdmins();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="detail-wrapper">
          <SpecsDetail
            loggedin={this.state.loggedin}
            className="details"
            specsn={this.props.match.params.sn}
          />
        </div>
        <div className="task-wrapper">
          <TaskCalculator
            specsItem={this.state.specsItem}
            specsn={this.props.match.params.sn}
          />
        </div>
      </div>
    );
  }
}
