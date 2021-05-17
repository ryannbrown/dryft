import React, { Component } from "react";

import "./style.css";
// import profPic from "../../media/5.PNG"
// import placeHolder from "../../../media/placeholder.png"
import ryanImg from "../../../media/ryan.jpg";
import Typed from "typed.js";


export default class Hero extends Component {
  constructor(props) {
    super(props);

    this.listener = null;
    this.state = {
      status: "top",
      // typed: ''
    };
  }

  componentDidMount() {
    var typed3 = new Typed(".typewriter", {
      strings: [
        "Breaking the Silence.",
        "Finding My Voice.",
        "Sharing My Story.",
      ],
      backDelay: 1000,
      typeSpeed: 100,
      backSpeed: 0,
      smartBackspace: true, // this is a default
      loop: true,
    });
  }

  componentDidUpdate() {
    document.removeEventListener("scroll", this.listener);
  }

  render() {
    return (
      <div
        className="home-img"
        style={{
          // backgroundImage: `url(${heroImg})`,
          backgroundColor: `#f9fafb`,
          opacity: `100%`,
          backgroundBlendMode: `multiply`,
          backgroundPosition: `center`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`,
          backgroundAttachment: `fixed`,
          // height: `${this.props.height}`,
          minHeight: `100vh`,
          height:'100%',
          width: "100%",
          display: `flex`,
          alignItems: `center`,
          justifyContent: "center",
          position: `relative`,
        }}
      >
        {/* <div className="typewriter"></div> */}
        <div className="hero-content-section">
          <div className="hero-text-block">
            <div>
              <h3>UNBREAKABLE</h3>
            </div>
            <div className="typewriter-section">
            <div className="typewriter"></div>
            </div>

          </div>

          <div className="hero-book-block">
            <img className="hero-book-img" src={ryanImg}></img>
          </div>
        </div>

        {/* <br></br> */}
        {/* <p style={{color:'#0e3b62'}} className="action-button">February 2021</p> */}
      </div>
    );
  }
}
