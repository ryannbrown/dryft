import React, { Component } from "react";
// import Navigation from "../../components/Navigation";
import "./style.css";
// import logo from "../../media/moons.png";
// import blueLogo from "../../media/bluemoons.png";
import portrait from "../../media/forest.jpg";
import Nav from "../../components/Nav";

export default class About extends Component {
  constructor(props) {
    super(props);

    this.listener = null;
    this.state = {
      status: "top",
      showModal: false,
      forms: [],
    };
  }

  fetchPosts() {}

  componentDidMount() {}

  render() {
    return (
      <div className="about-page">
        {/* <Nav></Nav> */}
        <div className="about-content">
          <div className="white-block">
            <div className="img-container">
              <div
                className="about-img"
                style={{
                  backgroundImage: `linear-gradient(to top, transparent 100%, #ffffff ),url(${portrait})`,
                  // backgroundColor: `#FF8686`,
                  // opacity: `90%`,
                  // backgroundBlendMode: `lighten`,
                  backgroundPosition: `center center`,
                  // backgroundPositionY: "30%",
                  position: `absolute`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  height: "50vh",
                  width: "100%",
                }}
              ></div>
            </div>
          </div>
          <div className="pink-block">
            {/* <div className="narrow">
      
            </div> */}
            <div className="about">
              <h1>Web Developer | Traveler</h1>
              <p>
               Hey! My name is Ryan. 
                I build websites for cool people and small businesses. 
                I have an awesome wife, and a sweet little baby girl named Haven. 
                Traveling is something I try to do as often as I can. Lately I have been exploring
                new places and things, and I'm excited for this to be a place I can document things I learn from life
                as well as from business. I know it can be against the rules to combine controversial shit with business, but at this 
                point I just don't care anymore. I am happy to be myself both in my life and in my work.
              </p>
            </div>
          </div>
          <div className="white-block">
            <div className="about-contact">
              <h1>No matter where I am, I'm always just a click away!</h1>
              <p>
                Email me at{" "}
                <a href="dryft@gmail.com">
                  dryft@gmail.com
                </a>
                {/* Contact me anytime, just fill out the   
                <a href="/connect"> Connect Form
                </a> */}
              </p>
              <p>
                Follow me on:
                <a href="http://instagram.com/theunendingwonder"> @instagram</a>
                {/* <a href="https://www.facebook.com/milliegrace22"> @facebook</a> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
