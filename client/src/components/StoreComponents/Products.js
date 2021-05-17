import React, { Component } from 'react';
import Product from './Product';
import "./style.css"
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";

class Products extends Component {
  static contextType = ThemeContextConsumer;
  
  constructor(props) {
    super(props);

    this.listener = null;
    this.state = {
      products: [],
      handle: "",
      item: "",
      collection: '',
      thisProduct: [],
      itemLoaded: false
    };
  }

componentDidMount() {
  const ourContext = this.context;
  let collection = this.props.match.params.collection;
  let item = this.props.match.params.item
  this.setState({ item: item
  , collection: collection});
  // console.log(handle);
  ourContext.grabProduct(item);

}

clearCurrentItem = () => {
  const ourContext = this.context;
  ourContext.clearCurrentItem()

}

// componentDidUpdate() {
//   const ourContext = this.context;
//   console.log(ourContext, "updated")
// }

  render() {
    const ourContext = this.context;

if (ourContext.thisProduct.options) {
  return (
    <ThemeContextConsumer>
    {(context) => (
      <div className="App">
        {/* <h1>{context.thisProduct.title}</h1> */}
        <div className="product-block">
        <Link className="product-back-btn" onClick={this.clearCurrentItem} to={`/shop/${this.state.collection}/${this.state.handle}`}><FontAwesomeIcon className="icon-margin" icon={faChevronLeft}></FontAwesomeIcon> Back to <span style={{textTransform:'capitalize'}}>{this.state.collection}</span></Link>
      <Product
      updateQuantityInCart={context.updateQuantityInCart}
        addVariantToCart={context.addVariantToCart}
        client={context.client}
        key={context.thisProduct.id.toString()}
        product={context.thisProduct}
        lineItemId={this.props.lineItemId}
      />
        </div>
    </div>
    )}
    </ThemeContextConsumer>
  );
} else return (
  <div className="loading-block">

  <ClipLoader
  // css={override}
  className="clippy"
  size={35}
  color={"#5b81ff"}
  // loading={this.state.loading}
/>
</div>)
  }
}

export default Products;
