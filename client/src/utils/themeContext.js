import React, { Component } from "react";
import Client from 'shopify-buy';
require('dotenv').config();
const { Provider, Consumer } = React.createContext();
// import { ThemeContextProvider } from "./utils/themeContext";


const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_TOKEN,
  
});
 class ThemeContextProvider extends Component {
   constructor(props) {
    super(props);

    this.listener = null;
     this.state = {
      userLoggedIn: false,
      userEmail: '',
      userData: [],
       
     };

   }
  

   componentDidMount() {
    let userStorageEmail = sessionStorage.getItem("email")

    if ( userStorageEmail) {
    //   console.log(userStorageEmail, "get it")
this.activateUser(userStorageEmail)
    }

 
}




activateUser = (email) => {
  // console.log(email, "email in backend")
  
   fetch(`/api/profile/${email}`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
          this.setState({
            userData: json,
            userLoggedIn: true,
            userEmail: email
          })
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("loggedIn", true);
  
        })
    }
    fetchUserData = () => {
  
      let email = this.state.userData.email
  // console.log(email, "email in backend")
  
   fetch(`/api/profile/${email}`)
        .then(res => res.json())
        .then(json => {
            console.log('fetched update', json)
          this.setState({
            userData: json,
          })
     
  
        })
    }
  
    logoutUser = () => {
      this.setState({userLoggedIn: false,
      userData:[],
    userEmail:''})
    }


    



componentDidUpdate(){
  console.log(this.state)
}



  render() {
    return (
      <Provider
        value={{ 
          testState: this.state.testState,
          activateUser: this.activateUser,
          userEmail: this.state.userEmail,
          userLoggedIn: this.state.userLoggedIn,
          userData: this.state.userData,
          logoutUser: this.logoutUser,
          fetchUserData: this.fetchUserData
           }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { ThemeContextProvider, Consumer as ThemeContextConsumer };
