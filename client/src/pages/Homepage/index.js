// import { Container, Nav, Button, Image, Row, Col } from 'react-bootstrap'
// import Navbar from 'react-bootstrap/Navbar'
import React, { Component } from 'react';
import './style.css';
import ProdList from "../../components/ProdList"
import bannerImg from "../../media/banner.png"
const queryString = require('querystring');
export default class Homepage extends Component {

    constructor(props) {
        super(props);

        this.listener = null;
        this.state = {
        };
    }






    componentDidMount() {
        // this.handleGoogle();
    }



    render() {
        return (
        
        <div>
             {/* <Navbar></Navbar> z*/}
             <div style={{backgroundImg: `url(${bannerImg})`}}></div>
            <div className="homepage-content">
          <ProdList></ProdList>
            </div>
            
        </div>
        )
    }
}