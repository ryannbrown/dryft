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



    handleGoogle = () => {
        console.log("did it!")
        let string = queryString.parse(window.location.search);
        let code = string["?code"];
        console.log("string", string["?code"])
   //      this.setState({
   // code: code
   //      })
       //   console.log(querystring)
   if (code) {
   
     let ourContext = this.context;
   
       // console.log('clicked')
       fetch('/api/google', {
         method: 'POST',
         body: JSON.stringify({
          code:code
         }),
         headers: {
           'Content-type': 'application/json; charset=UTF-8',
         },
       }).then(res => res.json())
         .then((response) => {
   console.log(response)
               // if (response.status == "200") {
                 let email = response.userInfo[2].elements[0]["handle~"].emailAddress
                 console.log(email)
                 if (email) {
                   ourContext.activateUser(email);
                 }
         // }
         // .then((json) => console.log("json", json));
       })
     }
      }



    componentDidMount() {
        this.handleGoogle();
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