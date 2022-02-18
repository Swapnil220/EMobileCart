import React, { Component } from "react";
import "./index.css";
import Productlist from "./Components/Productlist";
import Default from "./Components/Default";
import Navbar from "./Components/Navbar";
import Details from "./Components/Details";
import Cart from "./Components/cart/Cart";
import Modal from "./Components/Modal";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Productlist />} />
          <Route exact path="/Details" element={<Details />} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route path="*" element={<Default />} />
        </Routes>
        <Modal />
      </React.Fragment>
    );
  }
}
