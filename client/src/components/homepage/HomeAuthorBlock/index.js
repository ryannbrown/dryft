import React, { Component } from "react";
import "./style.css";
// import profPic from "../../media/5.PNG"
import ryanImg from "../../../media/ryan.jpg";
import {Link} from "react-router-dom"
import Aos from "aos"
export default class HomeAuthorBlock extends Component {
  constructor(props) {
    super(props);
    this.listener = null;
    this.state = {
      status: "top",
    };
  }
  componentDidMount() {
    Aos.init();
  }
  componentDidUpdate() {
    document.removeEventListener("scroll", this.listener);
  }
  render() {
    return (
      <div>
        <div
          className="home-author-block"
          style={{
            // backgroundImage: `url(${heroImg})`,
            backgroundColor: `white`,
            opacity: `100%`,
            backgroundBlendMode: `multiply`,
            backgroundPosition: `center`,
            backgroundSize: `cover`,
            backgroundRepeat: `no-repeat`,
            backgroundAttachment: `fixed`,
            // height: `${this.props.height}`,
            // height: `100vh`,
            display: `flex`,
            alignItems: `center`,
            position: `relative`,
            justifyContent: "center",
          }}
        >
          {/* <img className="hero-logo" src={logo}></img> */}
          <div className="author-content">
            <div className="auth-pic">
              <img className="auth-img" src={ryanImg}></img>
            </div>
            <div className="auth-text" data-aos="slide-right">
              <h2>Hello there! It's Ryan Brown.</h2>
              {/* <p>Look. Learn. Love.</p> */}
              {/* <p> </p> */}
              <p>I am a freelancer based out of Raleigh, NC. I am a hiking and traveling enthusiast, dad, snowboarder, thinker, and poet. Alright, I'm not a poet but I wish I could say I were. Thanks for visting my website. This is a place to learn more about the work I offer, as a well as a place for me to express my thoughts and share some of my experiences. Life and work can live together, and oh are they a journey.</p>
              {/* <Link to="/about"><button>Get to know me</button></Link> */}
            </div>
          </div>
          <br></br>
          {/* <p style={{color:'#0e3b62'}} className="action-button">February 2021</p> */}
        </div>
      </div>
    );
  }
}
