import React, { Component } from "react";

import SearchModal from "../modals/search-modal";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specsitems: [],
      showModal: true,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }
  componentDidMount() {
    window.addEventListener("openSearchModal", this.handleOpenModal);
  }

  componentWillUnmount() {
    window.removeEventListener("openSearchModal", this.handleOpenModal);
  }

  handleOpenModal() {
    if (this.props.location.pathname === "/Search") {
      this.setState({ showModal: true });
    }
  }

  openModal() {
    this.setState({ showModal: true });
  }
  closeModal() {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <div>
        <SearchModal
          closeModal={this.closeModal}
          showModal={this.state.showModal}
        />
      </div>
    );
  }
}
