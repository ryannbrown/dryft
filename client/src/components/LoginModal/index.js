import React, { useState, setShow, Component } from "react";
// import LinkedIn from "../../components/LinkedIn/index"
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Image,
  CardDeck,
  Table,
  Accordion,
  Spinner,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
import "./style.css";
import { GoogleLoginButton } from "react-social-login-buttons";
import SocialButton from '../SocialButton/index'
// import {
//   Tooltip,
// } from 'react-tippy';
// import {circle} from "../../../node_modules/feather-"

// import exitBtn from "../../media/x.svg"

class LoginModal extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);
    this.state = {
      state: "hello I am Home's state",
      modalOpened: false,
      registrationToggled: false,
      showLoginAlert: false,
      showRegisterAlert:false,
      overflowHidden: true,
      googleError: false
      //   loggedInState: this.props.loggedInState,
      //   user: null,
      //   userLoggedIn: this.props.userLoggedIn
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    // this.fileChanged = this.fileChanged.bind(this);
    // this.id = React.createRef();
    this.first_name = React.createRef();
    this.last_name = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.verPassword = React.createRef();
    this.isSubscribed = React.createRef();
    // this.prof_title = React.createRef();
    // this.license = React.createRef();
  }



  
  fixOverflow = () => {
    // console.log(this.state.overflowHidden)
if (this.state.overflowHidden) {
  document.getElementsByTagName('body')[0].style.overflowY='hidden';
} else {
  document.getElementsByTagName('body')[0].style.overflowY='unset';
}
    this.setState({overflowHidden: !this.state.overflowHidden})
  }

   toggleRegister = () => {
    this.setState({
      registrationToggled: !this.state.registrationToggled
  })
  }

  toggleOpen = () => {
    // this.fixOverflow();
    this.setState({
      opened: !this.state.opened,
    });
  };

  handleSocialLogin = (user) => {
    const ourContext = this.context;
    console.log(user)

    let email = user._profile.email
    let first_name = user._profile.firstName
    let last_name = user._profile.lastName


    fetch("/api/googlelogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      email,
      first_name,
      last_name
      }),
    }).then((response) => {
if (response.status == '200') {
 ourContext.activateUser(email);
 this.props.closeNavModal();
} else {
  console.log("FAIL!")
}
    })

  }
  
  handleSocialLoginFailure = (err) => {
    console.error(err)
    this.setState({
      googleError:true
    })
  }

  handleLogin = (e) => {
    const ourContext = this.context;
        e.preventDefault()
        let email = this.email.current.value
        let password = this.password.current.value

    // console.log(email, password)

    const userPassword = [];

    e.preventDefault();
    // console.log("handled it")

    const signIn = () => {
      // console.log("posting to DB")
      // POST TO DB
      fetch("/api/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // first_name: first_name,
          // last_name: last_name,
          email: email,
          password: password,
        }),
      }).then((response) => {
        // console.log("hey i did it")
        // console.log(response)
        if (response.status == "200") {
          ourContext.activateUser(email);
          console.log(response)
          // console.log(email)
          // this.props.toggleModal();
          this.props.closeNavModal();
          // if (this.props.userLoggedIn) {
        //   this.setState({
        //     // userLoggedIn: true,
        //     // user: email,
        //     show: false,
        //     setShow: false,
        //     showRegisterAlert: false,
        //   });
          // }
          // console.log(email);

          // sessionStorage.setItem("name", postData.name);
          // sessionStorage.setItem("email", email);
          // sessionStorage.setItem("loggedIn", true);

          //   this.props.action(email);
          // alert("success")
        } else if (response.status == "400") {
          this.setState({
            showLoginAlert: true,
          });
        }
      });
    };
    signIn();
  };


  handleRegistration = (e) => {
    const ourContext = this.context;
        e.preventDefault()
        let first_name = this.first_name.current.value
        let last_name = this.last_name.current.value
        let email = this.email.current.value
        let password = this.password.current.value
        let verPassword = this.verPassword.current.value
        let isSubscribed = this.isSubscribed.current.checked
        // let prof_title = this.prof_title.current.value
        // let license = this.license.current.value

    // console.log(email, password)

    const userPassword = [];

    e.preventDefault();
    // console.log("handled it")

    const regUser= () => {
      // console.log("posting to DB")
      // POST TO DB
      fetch("/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          subscribed: isSubscribed
        }),
      }).then((response) => {
        // console.log("hey i did it")
        // console.log(response)
        if (response.status == "200") {
            ourContext.activateUser(email);
        //   ourContext.activateUser(email);
          // console.log(email)
          this.props.closeNavModal();
          // if (this.props.userLoggedIn) {
          this.setState({
            // userLoggedIn: true,
            // user: email,
            show: false,
            setShow: false,
            showRegisterAlert: false,
          });
          // }
          // console.log(email);

          // sessionStorage.setItem("name", postData.name);
          // sessionStorage.setItem("email", email);
          // sessionStorage.setItem("loggedIn", true);

          //   this.props.action(email);
          // alert("success")
        } else if (response.status !== "200") {
          this.setState({
            showRegisterAlert: true,
          });
        }
      });
    };
    if (password === verPassword) {
        regUser()
    } else {
        alert("passwords did not match")
    }
  };

  logOut = () => {
    this.setState({
      loggedIn: false,
    });
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("email");
    window.location.reload();
  };





  render() {

    const {showRegisterAlert, showLoginAlert} = this.state;
    return (
      <div className="modal-background">
          {/* <img className="modal-exit-btn" src={exitBtn} onClick={this.props.toggleModal}></img> */}
          <i onClick={this.props.closeNavModal} className="lni lni-close close"></i>
        <div className="modal-box">
          <div className="modal-content">
            {/* Login Form */}
            {!this.state.registrationToggled ? (
              <div>
              <form className="actual-form" onSubmit={this.handleLogin}>
                     
                <h1>Login</h1>
                <input ref={this.email} placeholder="email" />
                <input type="password" ref={this.password} placeholder="password" />
                {showLoginAlert && <div className="alert alert-danger">Incorrect email or password</div>}
                <button className="modal-btn btn" >Sign In</button>
                <div className="first-time-block">


                <h3>First Time?</h3>
                <p className="" type="submit" onClick={this.toggleRegister}>Create an account</p>
                </div>
       
              </form>
              <div>
  <h3>Or</h3>
  <SocialButton
      provider='google'
      appId='554958832059-qvfl43kqio3mk9hu3p1fl8o3e5mteat6.apps.googleusercontent.com'
      onLoginSuccess={this.handleSocialLogin}
      onLoginFailure={this.handleSocialLoginFailure}
    ><GoogleLoginButton text="Login with Google" ></GoogleLoginButton></SocialButton>
</div>
              </div>
            ) :
           
             (   
              <form className="actual-form registration" onSubmit={this.handleRegistration}>
                    {/* Registration Form */} 
                <h1>Register</h1>
                {showRegisterAlert && <div className="alert alert-danger">This email may already exist in our system</div>}
                <div className="register-form-wrapper">
              <div className="register-left">
              <input ref={this.first_name} name="first" placeholder="First Name" tabIndex="1" />
              <input ref={this.email} name="email" placeholder="Email" tabIndex="3"  />
              <input type="password" ref={this.verPassword} placeholder="Verify Password" tabIndex="5"  />
              </div>
              <div className="register-right">
              <input ref={this.last_name} name="last" placeholder="Last Name" tabIndex="2" />
              <input type="password" ref={this.password} placeholder="Password" tabIndex="4"/>
              </div>
                </div>
           
                {/* <div style={{position:'relative', width:'253px', margin:'0px 0px'}}>
               
             
                </div> */}
                <div className="form-checkbox">
                <button className="modal-btn btn" type="submit">Register</button>
                <div className="subscribe-block">
                <label id="modal-label">Subscribe?</label>
                <input ref={this.isSubscribed} type="checkbox"></input>
                </div>
  
                </div>
                <div>
  <h3>Or</h3>
  <SocialButton
      provider='google'
      appId='554958832059-qvfl43kqio3mk9hu3p1fl8o3e5mteat6.apps.googleusercontent.com'
      onLoginSuccess={this.handleSocialLogin}
      onLoginFailure={this.handleSocialLoginFailure}
    ><GoogleLoginButton className="google-register" text="Register with Google" ></GoogleLoginButton></SocialButton>
</div>
         
              </form>
            )}
           
          </div>
        </div>
      </div>
    );
  }
}
export default LoginModal;
