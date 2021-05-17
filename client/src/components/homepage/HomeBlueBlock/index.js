import React, { Component } from "react";
import {Link} from "react-router-dom"
import "./style.css";
// import profPic from "../../media/5.PNG"
import waveImg from "../../../media/wave-img.jpg";
import favWhite from "../../../media/fav-white.png";

export default class HomeBlueBlock extends Component {
  constructor(props) {
    super(props);

    this.listener = null;
    this.state = {
      status: "top",
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
    document.removeEventListener("scroll", this.listener);
  }

  render() {
    return (
      <div
        className="home-blue-block"
        style={{
          backgroundImage: `url(${waveImg})`,
          // backgroundColor: `#5b81ff`,
          // opacity: `100%`,
          backgroundBlendMode: `multiply`,
          backgroundPosition: `center`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`,
          // backgroundAttachment: `fixed`,
          // height: `${this.props.height}`,
          height: `120vh`,
          width: "100%",
          display: `flex`,
          flexDirection: "column",
          alignItems: `center`,
          justifyContent: "center",
          position: `relative`,
        }}
      >
        {/* <img className="hero-logo" src={placeHolder}></img> */}
        {/* <img src={favWhite}></img> */}
        <div className="bb-text-content">
          <h1>You are not alone.</h1>

          <p>
            Almost 1 in 5 adults suffer from a mental illness. In 2017, roughly
            46.6 million people were diagnosed with mental health issues in the
            United States alone. If you or someone you know struggles with
            mental health, know that you are not alone.
          </p>
          <Link to="/resources">
            <button className="the-button">View Resources</button>
            </Link>
        </div>
        {/* <p style={{color:'#0e3b62'}} className="action-button">February 2021</p> */}
      </div>
    );
  }
}
