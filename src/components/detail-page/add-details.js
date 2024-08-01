// import React, { Component } from "react";
// import axios from "axios";
// import ReactHtmlParser from "react-html-parser";

// import AddForm from "../forms/add-form";
// import SpecsMotorImage from "./forms/specs-motor-image";
// import SpecsQRCodeImage from "./forms/specs-qrcode-image";

// export default class SpecsDetail extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       currentsn: this.props.match.params.slug,
//       SpecsItem: {},
//       editMode: false,
//     };

//     this.handleEditClick = this.handleEditClick.bind(this);
//     this.handleMotorImageDelete = this.handleMotorImageDelete.bind(this);
//     this.handleQRCodeImageDelete = this.handleQRCodeImageDelete.bind(this);
//     this.handleUpdateFormSubmission =
//       this.handleUpdateFormSubmission.bind(this);
//   }

//   handleUpdateFormSubmission(Specs) {
//     this.setState({
//       SpecsItem: Specs,
//       editMode: false,
//     });
//   }

//   handleMotorImageDelete() {
//     this.setState({
//       specsItem: {
//         Motor: "",
//       },
//     });
//   }
//   handleQRCodeImageDelete() {
//     this.setState({
//       SpecsItem: {
//         QRCode: "",
//       },
//     });
//   }
//   handleEditClick() {
//     this.setState({ editMode: true });
//   }

//   getSpecsItem() {
//     axios
//       .get(`http://127.0.0.1:5000/Specs/${this.state.currentsn}`)
//       .then((response) => {
//         this.setState({
//           SpecsItem: response.data.Specs,
//         });
//       })
//       .catch((error) => {
//         console.log("getSpecsItem error", error);
//       });
//   }

//   componentDidMount() {
//     this.getSpecsItem();
//   }

//   render() {
//     const { title, content, SpecsMotorImage, SpecsQRCodeImage } =
//       this.state.SpecsItem;

//     const contentManager = () => {
//       if (this.state.editMode) {
//         return (
//           <BlogForm
//             handleMotorImageDelete={this.handleMotorImageDelete}
//             handleQRCodeImageDelete={this.handleQRCodeImageDelete}
//             handleUpdateFormSubmission={this.handleUpdateFormSubmission}
//             editMode={this.state.editMode}
//             blog={this.state.specsItem}
//           />
//         );
//       } else {
//         return (
//           <div className="content-container">
//             <h1 onClick={this.handleEditClick}>{title}</h1>

//             <SpecsMotorImage img={Motor} />
//             <SpecsQRCodeImage img={QRCode} />

//             <div className="content">{ReactHtmlParser(content)}</div>
//           </div>
//         );
//       }
//     };

//     return <div className="blog-container">{contentManager()}</div>;
//   }
// }
