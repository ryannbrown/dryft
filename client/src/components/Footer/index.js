import { Container, Nav, Button, Image, Col, Row } from "react-bootstrap";
import { Navbar, NavDropdown } from "react-bootstrap";
import React, { Component } from "react";
// import logo from "../../media/stamplogo.png";
import "./style.css";
import logo from "../../media/logo.png"
import jsLogo from "../../media/redlogo.png"
import fbLogo from "../../media/fb-grey.png"
import instaLogo from "../../media/insta-grey.png"
import cartLogo from "../../media/cart-grey.png"
import {Link} from 'react-router-dom'
var _ = require("lodash");

export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.listener = null;
    this.state = {
      status: "top",
      isMobile: false,
    };
  }

  render() {
    const { isMobile } = this.state;

    return (
      <div>
        <div className="darkfooter">
          <div>
            {/* <h1 className="brand-title">UNBREAKABLE</h1> */}
            <Link to="/">
              <h1>dryft</h1>
              {/* <img className="footer-brand" src={logo}></img> */}
            
            </Link>
            <br></br>
            {/* <hr></hr> */}
          </div>
            {/* <div className="link-wrapper">
              <Link  to="/about"><p>about</p></Link>
              <Link  to="/now"><p>now</p></Link>
              <Link  to="/thoughts"><p>thoughts</p></Link>
              <Link  to="/webdev"><p>webdev</p></Link>
            </div> */}
            <div className="social-wrapper">
             {/* <a href="/"><img src={fbLogo}></img></a> */}
             <a  href="http://instagram.com/theunendingwonder">
               
             <i class="lni lni-instagram"></i>
               
               </a>
             {/* <a  href="/"><img src={cartLogo}></img></a> */}
         
              {/* <img src="https://static.wixstatic.com/media/81af6121f84c41a5b4391d7d37fce12a.png/v1/fill/w_19,h_19,al_c,q_85,usm_0.66_1.00_0.01/81af6121f84c41a5b4391d7d37fce12a.webp"></img> */}
            </div>
            {/* <div className="soup-block">
            <a target="_blank" href="https://www.justsoup.io">
              <img width="20px" src={jsLogo}></img>
              <p>Powered by Just Soup</p>
            </a>
            </div> */}
        </div>
      </div>
    );
  }
}
