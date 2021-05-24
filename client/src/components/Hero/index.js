import React, { Component } from "react";
import "./style.css";
// import Mobile from "./mobile"
// import logo from "../../media/mainlogo.png";
// import fbLogo from "../../media/fb-grey.png";
// // import Cart from "../StoreComponents/Cart";
// import instaLogo from "../../media/insta-grey.png";
// import cartLogo from "../../media/cart-grey.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
// import fbLogoW from "../../media/fb-white.png";
// import instaLogoW from "../../media/insta-white.png";
// import cartLogoW from "../../media/cart-white.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import driftLogo from "../../media/drift_logo.png"
// import LoginModal from "../LoginModal/index";
import context from "react-bootstrap/esm/AccordionContext";

var _ = require("lodash");

export default class Hero extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);

    this.listener = null;
    this.state = {
      // status: "top",
    };
  }


 


  render() {
    const { truthyCats, cats } = this.state;

    return (
  <div className="main-hero">
         <h1>
              Curating the best of the best in boating products
            </h1>
  </div>
    );
  }
}
