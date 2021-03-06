import React, { Component } from "react";
import "./style.css";
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
// import fbLogoW from "../../media/fb-white.png";
// import instaLogoW from "../../media/insta-white.png";
// import cartLogoW from "../../media/cart-white.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import driftLogo from "../../media/drift_logo.png"
import LoginModal from "../LoginModal/index";
import context from "react-bootstrap/esm/AccordionContext";

var _ = require("lodash");

export default class Nav extends Component {
  static contextType = ThemeContextConsumer;
  constructor(props) {
    super(props);

    this.listener = null;
    this.state = {
      // status: "top",
      mobileNavToggle: false,
      scrollingUp: false,
      hideNav: false,
      isMobile: false,
      modalOpened: false,
      overflowHidden: true,
      // registrationToggled: false
    };
  }

  toggleNav = () => {
    if (this.state.mobileNavToggle) {
      this.setState({
        mobileNavToggle: false,
      });
    } else if (!this.state.mobileNavToggle) {
      this.setState({
        mobileNavToggle: true,
      });
    }
  };

  // toggleRegister = () => {
  //   this.setState({
  //     registrationToggled: !this.state.registrationToggled
  // })
  // }

  logOut = () => {
    var ourContext = this.context;
    ourContext.logoutUser();
    sessionStorage.removeItem("userLoggedIn");
    sessionStorage.removeItem("email");
    // window.location.reload();
  };

  toggleModal = () => {
    this.fixOverflow();
    console.log("clicked");
    this.setState({
      modalOpened: !this.state.modalOpened,
    });
  };

  closeNavModal=()=>{
    document.getElementById("responsive-menu").checked = false;
    this.setState({
      modalOpened: !this.state.modalOpened,
    });
  }

  handleNavigation = (e) => {
    // console.log("handling nav");

    // if (window.innerWidth < 750) {

    const window = e.currentTarget;

    if (this.prev > window.scrollY) {
      // console.log("scrolling up")
      this.setState({
        hideNav: false,
      });
    } else if (this.prev < window.scrollY) {
      // console.log("scroll down, hide nav")
      this.setState({
        hideNav: true,
      });
    }
    this.prev = window.scrollY;
    // };
  };

  handleMobileNav = () => {
    this.fixOverflow();
    this.setState({ mobileNavToggle: false });
    document.getElementById("responsive-menu").checked = false;
  };

  getCats = () => {
    fetch(`/api/cats`)
      .then((res) => res.json())
      .then((json) => {
        console.log("nav-cats", json);
        if (json.length > 0) {
          // console.log("we have length")
          this.setState({
            cats: json,
            isLoading: false,
            truthyCats: true,
            // userHasReviewed: false,
          });
        } else {
          // console.log("we have else")
          this.setState({
            cats: [],
            truthyReviews: false,
            isLoading: false,
            truthyCats: false,
          });
        }
      });
  };

  componentDidMount() {
    this.getCats();

    var ourContext = this.context;
    // console.log(ourContext);
    // console.log("HEY!")
    this.prev = window.scrollY;
    window.addEventListener("scroll", (e) => this.handleNavigation(e));

    if (window.innerWidth < 725) {
      this.setState({
        isMobile: true,
      });
    } else if (window.innerWidth < 725) {
      this.setState({
        isMobile: false,
      });
    }
  }

  fixOverflow = () => {
    console.log(this.state.overflowHidden);
    if (this.state.overflowHidden) {
      document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflowY = "unset";
    }
    this.setState({ overflowHidden: !this.state.overflowHidden });
  };

  handleMobileNav = () => {
    this.setState({ mobileNavToggle: false });
    document.getElementById("responsive-menu").checked = false;
  };

  signOut = () => {
    var ourContext = this.context;
    ourContext.logoutUser();
    this.handleMobileNav();
  }

  componentDidUpdate() {
    // console.log(this.state.modalOpened);
    // if (this.state.lastPosition > 0) {
    //   console.log("here boy")
    //       if (position < this.state.lastPosition) {
    //         // console.log(position, "scrolling up")
    //         // console.log("scrolling up")
    //       }
    //     }

    window.addEventListener(
      "resize",
      _.debounce(() => {
        if (document.getElementById("responsive-menu").checked) {
          console.log("its true");
          document.getElementsByTagName("body")[0].style.overflowY = "hidden";
        }

        if (window.innerWidth > 725) {
          this.setState({
            mobileNavToggle: false,
            isMobile: false,
          });
          // change header from mobile view
          // document.getElementById("navvy-bar").className = "header";
          // // hide the nav sub columns if expanded from mobile width
          // document.getElementById("nav-toggle").checked = false;
          // // uncheck the hamburger to reset icon style
          // document.getElementById("menu-toggle").checked = false;
        }
        if (window.innerWidth < 725) {
          this.setState({
            isMobile: true,
          });
          // document.getElementById("menu-toggle").checked = false;
          if (this.state.mobileNavToggle) {
            document.getElementById("menu-toggle").checked = true;
          }
        }
      }, 400)
    );
  }

  render() {
    const { truthyCats, cats } = this.state;

    if (truthyCats) {
      // console.log(truthyReviews, reviews)
      var items = cats.map((item, i) => (
        <Link
          onClick={this.handleMobileNav}
          to={`/categories/${item.panda_cat}`}
        >
          {item.panda_cat}
        </Link>
      ));
    }

    return (
      <ThemeContextConsumer>
        {(context) => (
          <div>
        <nav>
        <div className="container">
       <Link onClick={this.handleMobileNav} to="/"> <img className="nav-logo" src={driftLogo}></img> </Link>
            <input id="responsive-menu" type="checkbox"></input>
            <label for="responsive-menu"><span id="menu-icon"></span>    {!context.userLoggedIn?    <div onClick={this.toggleModal}
                        toggleregister={this.toggleRegister} className="nav-login">
     <i 
              class="lni lni-heart-filled">
            
                </i> </div> : <Link to="/wishlist"> <div className="nav-login"><i class="lni lni-heart-filled">
               {context.userLoggedIn && context.userData.saved && <div className="fav-count">{context.userData.saved.length}</div> }
                </i></div> </Link>  }  
         </label>
          
     
            <div id="overlay"></div>
            <ul>
                <li><Link onClick={this.handleMobileNav} to="/">Contact</Link></li>
                <li><Link onClick={this.handleMobileNav}  to="/">Blog</Link></li>
                <li><Link onClick={this.handleMobileNav}  to="/">About Us</Link></li>
                {context.userLoggedIn &&   <li><Link onClick={this.signOut}  to="/">Sign Out</Link></li>}
               
            </ul>

        </div>
    </nav>
    {this.state.modalOpened && (
              <LoginModal closeNavModal={this.closeNavModal} toggleModal={this.toggleModal}></LoginModal>
            )}
    </div>
        )}
      </ThemeContextConsumer>
    );
  }
}

//     <div className="nav-section">
//       <header
//         id="navvy-bar"
//         // className={this.state.mobileNavToggle ? "mobile-header" + (this.state.hideNav ? '-hidden' : '') : 'header' + (this.state.hideNav ? '-hidden' : '')}
//         className={this.state.mobileNavToggle ? "mobile-header" : "header"}
//       >
//         <div className="nav-brand">
//           <Link to="/">
//             <img src={logo}></img>
//           </Link>
//         </div>
//         {/* <nav className="nav-options">
//           {this.state.mobileNavToggle ? (
//             <ul>
//               <li>
//                 <Link onClick={this.handleMobileNav} to="/blog">
//                   Blog
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   onClick={this.handleMobileNav}
//                   to="/shop/most-popular"
//                 >
//                   Shop
//                 </Link>
//               </li>
//               <li className="service-trigger">
//                 <input
//                   type="checkbox"
//                   className="nav-down-toggle"
//                   id="nav-toggle"
//                 ></input>
//                 <FontAwesomeIcon
//                   className="nav-down"
//                   icon={faChevronDown}
//                 />
//                 <Link to="/about">About</Link>
//                 <div className="nav-services">
//                   <div className="nav-service-arrow"></div>
//                   <li>
//                     <Link to="/about">About me</Link>
//                   </li>
//                   <li>
//                     <Link to="/resources">Resources</Link>
//                   </li>
//                   <li>
//                     <Link to="/speaking-engagements">
//                       Speaking Engagements
//                     </Link>
//                   </li>
//                 </div>
//               </li>
//             </ul>
//           ) : (
//             <ul>
//               <li>
//                 <Link to="/blog">Blog</Link>
//               </li>
//               <li>
//                 <Link to="/shop/most-popular">Shop</Link>
//               </li>
//               <li className="service-trigger">
//                 <input
//                   type="checkbox"
//                   className="nav-down-toggle"
//                   id="nav-toggle"
//                 ></input>
//                 <FontAwesomeIcon
//                   className="nav-down"
//                   icon={faChevronDown}
//                 />
//                 <Link to="/Services">About</Link>
//                 <div className="nav-services">
//                   <div className="nav-service-arrow"></div>
//                   <li>
//                     <Link to="/about">About me</Link>
//                   </li>
//                   <li>
//                     <Link to="/resources">Resources</Link>
//                   </li>
//                   <li>
//                     <Link to="/speaking-engagements">
//                       Speaking Engagements
//                     </Link>
//                   </li>
//                 </div>
//               </li>
//             </ul>
//           )}
//         </nav> */}
//         {/* <div className="mobile-nav-logos">
//     <a  href="/"><img src={instaLogo}></img></Link>
//     <Link to="/"><img src={fbLogo}></img></Link>
//        <a  href="/"><img src={cartLogo}></img></Link>
//     </div> */}

//         {!this.state.isMobile ? (
//           <div className="nav-right">
//             {context.userLoggedIn && context.userData ? (
//               <div className="user-nav">
//                 {/* <p>Welcome back, {context.userData.first_name}</p> */}
//                 {/* <button onClick={this.logOut} className="login-btn btn">
//                   Logout
//                 </button> */}
//                 {/* style={{backgroundImage: context.userData.has_uploaded_img ? `url('https://reviewpanda.s3.amazonaws.com/${context.userData.avatar}')` : `backgroundImage:'url(${context.userData.avatar})'` , */}
//                 {context.userData.has_uploaded_img ?  <img src={`https://reviewpanda.s3.amazonaws.com/${context.userData.avatar}`}/> :  <img src={context.userData.avatar}/> }
//                 <div className="user-nav-options">
//                 <Link to="/myprofile">Profile</Link>
//                 {/* <hr></hr> */}
//                 <Link>Support</Link>
//                 <Link onClick={this.logOut}>Log Out</Link>
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 {" "}
//                 <button
//                   onClick={this.toggleModal}
//                   toggleregister={this.toggleRegister}
//                   className="login-btn btn"
//                 >
//                   Login
//                 </button>

//               </div>
//             )}
//             {/* <Link to="https://www.instagram.com/Carolyn9787/">
//               <img src={instaLogo}></img>
//             </Link>
//             <Link to="/">
//               <img src={fbLogo}></img>
//             </Link> */}
//             {/* <a className="cart-desktop">
//               <img
//                 className="myimg"
//                 // onClick={context.handleCartOpen}
//                 src={cartLogo}
//               ></img>
//             </Link> */}
//           </div>
//         ) : (
//           <div className="nav-right">
//             {context.userLoggedIn && context.userData ? (
//               <div>
//                 <p>Welcome back, {context.userData.first_name}</p>
//                 <button onClick={this.logOut} className="login-btn btn">
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 {" "}
//                 <button
//                   onClick={this.toggleModal}
//                   toggleRegister={this.toggleRegister}
//                   className="login-btn btn"
//                 >
//                   Login | Register
//                 </button>
//               </div>
//             )}
//             {/* <Link to="https://www.instagram.com/Carolyn9787/">
//               <img src={instaLogoW}></img>
//             </Link>
//             <Link to="/">
//               <img src={fbLogoW}></img>
//             </Link> */}
//             {/* <a
//               style={{ cursor: "pointer" }}
//               // onClick={context.handleCartOpen}
//             >
//               <img src={cartLogoW}></img>
//             </Link> */}
//           </div>
//         )}
//       </header>
//       <input
//         type="checkbox"
//         className="menu-toggle"
//         id="menu-toggle"
//         onClick={this.toggleNav}
//       />
//       {/* <div className={this.state.hideNav ? 'mobile-bar-hidden': 'mobile-bar' }> */}
//       <div className="mobile-bar">
//         <label for="menu-toggle" className="menu-icon">
//           <span></span>
//         </label>
//         <div className="mobile-nav-brand">
//           <Link to="/">
//             <img src={logo}></img>
//           </Link>
//         </div>
//         {/* <a className="cart-mobile">
//           <img
//             // onClick={context.handleCartOpen}
//             className="mbar-cart"
//             src={cartLogo}
//           ></img>
//         </Link> */}
//       </div>
//       {this.state.modalOpened && (
//         <LoginModal toggleModal={this.toggleModal}></LoginModal>
//       )}
//     </div>
//   )}
// </ThemeContextConsumer>
//     );
//   }
// }

// {!this.props.isCartOpen ?
//   <a onClick={this.props.handleCartOpen}>
//     <img src={cartLogo}></img>
//   </Link> : <a onClick={this.props.handleCartClose}>
//     <img src={cartLogo}></img>
//   </Link> }
