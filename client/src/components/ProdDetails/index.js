import React, { Component, useState } from "react";
// import logo from './logo.svg';
import "./style.css";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import { Link } from "react-router-dom";
import fbGrey from "../../media/fb-grey.png";
import twitGrey from "../../media/twitter-grey.png";
import linkedGrey from "../../media/linked-grey.png";
import linkResolver from "../../utils/linkResolver";
import waveImg from "../../media/wave-img.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import { Helmet } from "react-helmet";
import {
  FacebookShareCount,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

// import "./style.css"
// import logo from '../../media/logo.png'
const { REACT_APP_PRISMIC_API, REACT_APP_PRISMIC_TOKEN } = process.env;

export default function ProdDetails(props) {
  const apiEndpoint = REACT_APP_PRISMIC_API;
  const accessToken = REACT_APP_PRISMIC_TOKEN;

  const Client = Prismic.client(apiEndpoint, { accessToken });

  const [doc, setDocData] = React.useState(null);
  const [shareUrl, setShareUrl] = React.useState(null);

  React.useEffect(() => {
    // let id = Object.values(this.props.match.params);
    let param = props.itemParam;
    console.log(param);
    // console.log(props.match.params.post)
    const fetchData = async () => {
      const response = await Client.query(
        Prismic.Predicates.at("my.product.uid", param)
      );
      if (response) {
        setDocData(response.results[0]);
        console.log(response.results);
      }
    };
    fetchData();
    const fetchPlugins = () => {
      const script = document.createElement("script");

      script.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0&appId=668236647227571&autoLogAppEvents=1";
      script.async = true;
      var url = "https://unbreakable.herokuapp.com/" + window.location.pathname;
      console.log("url", url);
      setShareUrl(url);

      document.body.appendChild(script);
    };
    fetchPlugins();
  }, []);

  return (
    <div>
      <div className="modal-backdrop"></div>
      <div className="product-modal">
        <div className="back-link">
          <i onClick={props.closeItem} className="lni lni-close close"></i>
        </div>
        {doc ? (
          <div>
            <div className="blog-content">
              <Helmet>
                <meta charSet="utf-8" />
                <title>{RichText.asText(doc.data.product_name)}</title>
                {/* <meta name="description" content={doc.data.short_description[0].text} charSet="utf-8" /> */}
                <link rel="canonical" href={shareUrl} />
              </Helmet>
              <div className="off-image-container">
                <img className="product-img" src={doc.data.product_image.url} />
              </div>
              <div className="product-details">
                <h1 className="blog-title">
                  {RichText.asText(doc.data.product_name)}
                </h1>
                <div className="rich-text-container">
                <RichText
                  className="modal-description"
                  render={doc.data.product_description}
                  linkResolver={linkResolver}
                />
                </div>
              <a target="_blank" href={doc.data.product_link.url}>
                <button>
              {/* {doc.data.product_price[0]?.text &&  */}
              <span>{doc.data.product_price[0].text || null} </span> 
              {/* } */}
               on {doc.data.product_location[0].text || null} <i class="lni lni-arrow-right"></i>
                </button>
              </a>
              </div>
              {/* <p >{thisModal.description}</p> */}
            </div>
          </div>
        ) : (
          <div className="loading-block">
            <ClipLoader
              // css={override}
              size={35}
              color={"#5b81ff"}
              // loading={this.state.loading}
            />
          </div>
        )}
        
        {/* <div className="share-block">
          <div className="share-btns">
            <FacebookShareButton url={shareUrl}>
            
              <img className="social-share-icon" src={fbGrey} />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <img className="social-share-icon" src={twitGrey} />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl}>
          
              <img className="social-share-icon" src={linkedGrey} />
            </LinkedinShareButton>
          </div>
          <p>Share</p>
        </div> */}
      </div>
    </div>
  );
}
