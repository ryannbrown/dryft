import React , {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
// import { Container, Nav, Button, Col, Row, Card } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import history from "./utils/history"

// import Page from "./pages/Homepage/index"
// import Shop from "./pages/Store/index"
// import ShopCollection from "./pages/StoreCollection/index"
// import ShopItem from "./pages/StoreItem/index"
// import Product from "./components/StoreComponents/Product"
// import Products from "./components/StoreComponents/Products"
// import Page from "./pages/Homepage/index"
import About from "./pages/About"
import Homepage from "./pages/Homepage/index"
import Blog from "./pages/Blog/index"
import Hero from "./components/Hero"
// import Resources from "./pages/Resources/index"
// import Now from "./pages/Now/index"
// import Webdev from "./pages/Webdev/index"
// import WebdevDetails from "./pages/WebdevDetails/index"
// import Speaking from "./pages/Speaking/index"
import BlogPost from "./pages/BlogPost/index"
import ScrollToTop from "./utils/scrollToTop.js"
import Nav from "./components/Nav/index"
import Footer from "./components/Footer"
import { ThemeContextConsumer, ThemeContextProvider } from "./utils/themeContext";
import createHistory from 'history/createBrowserHistory';
import {Helmet} from "react-helmet";
import { Fragment } from 'react';
import FavoritesPage from './pages/FavoritesPage';
// import { Router, Route, Link } from 'react-router-dom';
// import history from './history';

// const MyContext = React.createContext();


class App extends Component {
  constructor() {
    super();

    this.state = {
    };


  }


  render() {
    

    const {isCartOpen, checkout, products, shop, collections } = this.state;

    return (
      <div className="App">
          <ThemeContextConsumer>
         {context => (
           <Router history={history}>
             <Fragment>
               <Helmet>
                      <meta charSet="utf-8" />
                      <title>dryft</title>
                      <content>Life | Web Design | Inspiration</content>
                      {/* <link rel="canonical" href="http://www.colemandefense.com/" /> */}
                  </Helmet>
               <Nav
                // client={context.client} checkout={checkout} isCartOpen={context.isCartOpen}
                ></Nav>
                <Hero></Hero>
               <ScrollToTop / >
             <Switch>
               {/* <Route path="/" component={Page}/> */}
               <Route path="/thoughts/:post" component={BlogPost}/>
             <Route path="/thoughts" component={Blog}/>
             <Route path="/thoughts" component={Blog}/>
             <Route path="/wishlist" component={FavoritesPage}/>
             {/* <Route path="/now" component={Now}/> */}
             {/* <Route path="/webdev/:works" component={WebdevDetails}/>
             <Route path="/webdev" component={Webdev}/> */}
             {/* <Route exact path="/resources" component={Resources}/> */}
             {/* <Route exact path="/speaking-engagements" component={Speaking}/> */}
             <Route exact path="/" component={Homepage}/>
             {/* <Route exact path="/shop" component={Shop}/>
             <Route exact path="/shop/:collection" component={ShopCollection}/> */}

               {/* <Route exact path="/shop" render={(props) => <Shop client={context.client} {...props} isCartOpen={context.isCartOpen} checkout={context.checkout} products={context.products } shop={context.shop} collections={context.collections} addVariantToCart={this.addVariantToCart}
              handleCartClose={this.handleCartClose} updateCartClose={this.updateCartClose} updateQuantityInCart={this.updateQuantityInCart} removeLineItemInCart={this.removeLineItemInCart} />} /> */}

              {/* <Route exact path="/shop/:collection/:item" render={(props) => <Products history={history} client={context.client} {...props} isCartOpen={context.isCartOpen} checkout={context.checkout} products={context.products } shop={context.shop} collections={context.collections} addVariantToCart={this.addVariantToCart}
             handleCartClose={this.handleCartClose} updateCartClose={this.updateCartClose} updateQuantityInCart={this.updateQuantityInCart} removeLineItemInCart={this.removeLineItemInCart} />} />

              <Route path="/shop/:collection" render={(props) => <ShopCollection history={history} client={context.client} {...props} isCartOpen={context.isCartOpen} checkout={context.checkout} products={context.products } shop={context.shop} collections={context.collections} addVariantToCart={this.addVariantToCart}
             handleCartClose={this.handleCartClose} updateCartClose={this.updateCartClose} updateQuantityInCart={this.updateQuantityInCart} removeLineItemInCart={this.removeLineItemInCart} />} /> */}
              {/* <Route exact path="/getit" render={(props) => <ShopItem history={history} client={context.client} {...props} isCartOpen={context.isCartOpen} checkout={context.checkout} products={context.products } shop={context.shop} collections={context.collections} addVariantToCart={this.addVariantToCart}
             handleCartClose={this.handleCartClose} updateCartClose={this.updateCartClose} updateQuantityInCart={this.updateQuantityInCart} removeLineItemInCart={this.removeLineItemInCart} />} /> */}
               <Route path="/" component={Homepage}/>
             
             {/* <Route path="/" component={Page}/> */}
           
             </Switch>
             <Footer></Footer>
             </Fragment>
           </Router>
         )}
         </ThemeContextConsumer>
      </div>
    
    );
  }
}

export default App;
