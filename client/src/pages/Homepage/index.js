// import { Container, Nav, Button, Image, Row, Col } from 'react-bootstrap'
// import Navbar from 'react-bootstrap/Navbar'
import React, { Component } from 'react';
import './style.css';
import ProdList from "../../components/ProdList"
import bannerImg from "../../media/banner.png"

export default class Homepage extends Component {

    constructor(props) {
        super(props);

        this.listener = null;
        this.state = {
        };
    }

    componentDidMount() {
    }



    render() {
        return (
        
        <div>
             {/* <Navbar></Navbar> */}
             <div style={{backgroundImg: `url(${bannerImg})`}}></div>
            <div className="homepage-content">
          <ProdList></ProdList>
            </div>
            
        </div>
        )
    }
}