import React, { Component } from "react";
import ReactModal from "react-modal";


import SearchForm from "../forms/search-form";
export default class SearchModal extends Component {
  constructor(props) {
    super(props);

    ReactModal.setAppElement(".app-wrapper");

    this.customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%",
        width: "800px",
      },
      overlay: {
        backgroundColor: "rgba(1, 1, 1, 0.75)",
      },
    };

    this.handleSuccessfullSearch =
      this.handleSuccessfullSearch.bind(this);
  }

  handleSuccessfullSearch(event) {
    console.log("search successfull", event);
  }

  render() {
    return (
      <ReactModal
        style={this.customStyles}
        onRequestClose={() => {
          this.props.closeModal();
        }}
        isOpen={this.props.showModal}
      >
        <SearchForm
          handleSuccessfullSearch={this.handleSuccessfullSearch}
        />
      </ReactModal>
    );
  }
}
