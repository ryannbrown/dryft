import React, { Component, useState, useContext } from "react";

import "./style.css";
import Prismic from "prismic-javascript";
// import { Date, Link, RichText } from "prismic-reactjs";
import linkResolver from "../../utils/linkResolver";
// import logo from '../../media/logo.png'
import { Link } from "react-router-dom";
import ProdDetails from "../../components/ProdDetails/index"
import favIcon from "../../media/fav_icon.png"
import uniq from 'lodash/uniq';

import ClipLoader from "react-spinners/ClipLoader";
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";

import LoginModal from "../LoginModal/index"

var Moment = require("moment");
require("dotenv").config();
const { REACT_APP_PRISMIC_API, REACT_APP_PRISMIC_TOKEN } = process.env;



require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default function ProdList() {
  const apiEndpoint = REACT_APP_PRISMIC_API;
  const accessToken = REACT_APP_PRISMIC_TOKEN;
  const context = useContext(ThemeContextConsumer)
  console.log(context)

  // This is where you would add your access token for a Private repository

  var Client = Prismic.client(apiEndpoint, { accessToken });
  var d = new Date();
  const nowMonth = d.getMonth();
  const nowYear = d.getYear();

  const [doc, setDocData] = React.useState(null);
  const [dates, setDate] = React.useState(null);
  const [year, setDateYear] = React.useState(nowYear);
  const [month, setDateMonth] = React.useState(nowMonth);
  const [itemParam, setItemParam] = React.useState('null');
  const [itemSelected, toggleItemSelected] = React.useState(false);
  const [testSaved, toggleTestSaved] = React.useState(false);
  const [thisTestSaved, toggleThisTestSaved] = React.useState(false);
  const [favItems, setFavItems] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [tags, setTags] = React.useState();

  React.useEffect(() => {
   
    fetchAllData()
    fetchFavItems();
    // fetchDates()
  }, []);



  const fetchAllData = async () => {
    const response = await Client.query(
      Prismic.Predicates.at("document.type", "product"),
      { orderings: "[my.product.post_date desc]" }
    );
    if (response) {
      setDocData(response.results);
      getTags(response.results);
      console.log(response.results);
      console.log(response);
    }
  };


  const getTags = (data) => {
    // This tab is here to operate as a label for the rest of the tags, it is not selectable 
    let tags = ['filter by tag'];
    data.forEach(item => {
      console.log("item", item)
      item.tags.forEach(tag => {
        tags.push(tag)
      })
   
    })
    let uniqueTags = uniq(tags)
   setTags(uniqueTags);
  }

const searchByTag = (e) => {
  let theTag = e.target.value
  console.log(theTag)
  
  const fetchData = async (tag) => {
    let searchByTag = []
    searchByTag.push(tag);
    const response = await Client.query(
      Prismic.Predicates.at("document.tags", searchByTag)
      // { orderings: "[my.product.post_date desc]" }
    );
    if (response) {
      setDocData(response.results);
    }
  };

fetchData(theTag);
  // setDateMonth(theMonth)
}


  const fetchFavItems =() => {
    console.log("get me my items", context)
if (context.userLoggedIn) {
console.log(context.userData);
setFavItems(context.userData.saved)
}
  }


  const saveItem = (test) => {
    // console.log(context)
    // console.log(test)
    

    let email = context.userData.email
    // let email = 'hi'
        if (email) {
          fetch('/api/savetest', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              test_uuid: test,
              email: email,
              title: test
    
            })
          }).then(response => {
            console.log("hey i did it")
            console.log(response)
            if (response.status == '200') {
             toggleTestSaved(true)
             context.fetchUserData(context.userData.email)
    
            } else if (response.status == '400') {
              console.log("failed")
            }
          })
        } else {
          // alert("problems")
          // this.setState({
          //   loginAlert: true
          // })
        }
    
      }

      const removeItem = (test) => {
        if (test) {
       
          let email = context.userData.email;
          // console.log('clicked')
          fetch("/api/removetest", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              test_uuid: test,
              email: email,
            }),
          }).then((response) => {
            console.log("hey i did it");
            console.log(response);
            if (response.status == "200") {
              toggleTestSaved(true)
              context.fetchUserData(context.userData.email)
              // this.fetchData();
            //   formatSavedTests(context.userData.saved);
            // setSaved(true)
            //   context.fetchUserData(email);
            } else if (response.status == "400") {
              console.log("failed");
            }
          });
        } else {
        //   this.setState({
        //     loginAlert: true,
        //   });
        }
      };
    

      const openLoginModal = () => {
        setShowLogin(!showLogin);
      }

      const closeNavModal = () => {
        setShowLogin(false);
      }



      // toggleModal = () => {
      //   this.fixOverflow();
      //   console.log("clicked");
      //   this.setState({
      //     modalOpened: !this.state.modalOpened,
      //   });
      // };
    
      // closeNavModal=()=>{
      //   document.getElementById("responsive-menu").checked = false;
      //   this.setState({
      //     modalOpened: !this.state.modalOpened,
      //   });
      // }


const queryByDate = (e) => {
  e.preventDefault();
  console.log("month", typeof(month))
  console.log("year", typeof(year))

  const fetchDates = async (month, year) => {
    const response = await Client.query([
      Prismic.Predicates.month('my.blog.post_date', month),
      Prismic.Predicates.year('my.blog.post_date', year)
    ]);
    if (response) {
      setDocData(response.results);
      console.log("response", response.results);
    }
  }
  fetchDates(month, year);
}


const setYear = (e) => {
  let theYear = e.target.value
  console.log(theYear)
  setDateYear(theYear)
  // console.log(e.target.value)
}
const setMonth = (e) => {
  let theMonth = e.target.value
  console.log(theMonth)
  setDateMonth(theMonth)
  // console.log(e.target.value)
}


const addFavorite = (card, user) => {
  console.log("CARD + USER ON CLICK", card, user);
  // props.updateUser(card, user);
  setFavItems([...favItems, card.id]);
};


const toggleItem = (uid) => {
    console.log(uid)
    toggleItemSelected(!itemSelected);
    setItemParam(uid);
}
const closeItem = () => {
    toggleItemSelected(false);
}

const resetSearch = () => {

  setDateYear(nowYear)
  setDateMonth(nowMonth)
  const fetchData = async () => {
    const response = await Client.query(
      Prismic.Predicates.at("document.type", "Product"),
    //   { orderings: "[my.blog.post_date desc]" }
    );
    if (response) {
      setDocData(response.results);
      console.log(response.results);
     
    }
  };
  fetchData();
}


// var now = Moment();
// console.log(now);
// let thisYear = Moment(now).format("YYYY")
// let thisMonth = Moment(now).format("MMMM")
// let allYears = [thisYear];
// let allMonths = [thisMonth];
// // to be changed when blog has run longer
// for (var i = 1; i <=1; i++) {
//   allYears.push(Moment(now).subtract(i, 'years').format("YYYY"));
// }
// for (var i = 1; i <=11; i++) {
//   allMonths.push(Moment(now).subtract(i, 'months').format("MMMM"));
// }
// console.log("all months", allMonths)
// console.log("all years", allYears)

// const someYears = ["2021","2020", "2019"]
// const monthsOfYear= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


  if (doc) {
    var data = doc.map(
      (post) => (
        <div className="product">
          {context.userLoggedIn && context.userData.saved !== null &&  <div> {!context.userData.saved.includes(post.id) ? <div className="nav-login"> <i onClick={() => {saveItem(post.id)}} className={!context.userData.saved.includes(post.id) ? "lni lni-heart" : "lni lni-heart-filled"}/> </div> : 
           <div className="nav-login"><i onClick={() => {removeItem(post.id)}} className={!context.userData.saved.includes(post.id) ? "lni lni-heart" : "lni lni-heart-filled"}/> </div> } </div> } 

{context.userLoggedIn && context.userData.saved === null && <div className="nav-login"> <i  onClick={() => {saveItem(post.id)}}  className="lni lni-heart"></i></div> } 

{!context.userLoggedIn &&  <div className="nav-login"> <i onClick={openLoginModal} className="lni lni-heart"></i></div> } 
       
         
           {/* {!testSaved ?  <i className="fav-icon lni lni-heart" onClick={() => {saveItem(post.id)}} src={favIcon}/> : <div className="nav-login">  <i className=" lni lni-heart-filled" 
          //  onClick={() => {removeItem(post.id)}}
           ></i></div> } */}
            {/* <img className="fav-icon" onClick={() => {saveItem(post.id)}} src={favIcon}/> */}
          <Link onClick={() => {toggleItem(post.uid)}}  to={`/products/${post.uid}`}>
            <img
              className="blog-img"
              alt="cover"
              src={post.data.product_image.url}
              />
          </Link>
          <div className="product-box">
            <h1>{post.data.product_name[0].text}</h1>
          <p>{post.data.date}</p>
          {/* <p>{post.data.product_description[0].text}</p> */}
          </div>
      
        </div>
      )
      // <div>post</div>
      // <h1>{RichText.asText(doc.data.title)}</h1>
    );

    if (tags) {
      var tagList = tags.map((tag, i) => (
        <option defaultValue={"Filter by Tag"} selected={i === 0 ? true: false} disabled={i === 0 ? true: false} value={tag}>{tag}</option>
      ));
    }

  

    // var months = allMonths.map((month, i) => (
    //   <option value={month}>{month}</option>
    // ));
    // var years = allYears.map((year, i) => (
    //   <option value={year}>{year}</option>
    // ));
  }

  return (
    <div className="blog-page">
      {/* <Nav></Nav> */}
        {/* filter is hidden for now */}
        {/* <form className="blog-filter" onSubmit={queryByDate}>
        <select className="filter-select" onChange={setMonth}>
        {months}
        </select>
        <select className="filter-select" onChange={setYear} >
        {years}
        </select>
        <button className="filter-select-btn" type="submit">Search</button>
        <button className="filter-select-btn" onClick={resetSearch}>Reset</button>
        </form> */}

        <div>
          <select className="browse-select" onChange={searchByTag}>
            {tagList}
          </select>
          <button onClick={fetchAllData} className="browse-btn">Browse All Items <i class="lni lni-reload"></i></button>
        </div>
      
        <div>
          {doc ? (
            <div >
  
              {doc.length > 0 ?
           <div className="product-wrapper">
               {data}
               </div>
               : <div>No Items available</div>
            }
             
            
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
        </div>
        {itemSelected &&  <ProdDetails closeItem={closeItem} itemParam={itemParam}></ProdDetails> }
        {showLogin && <LoginModal
         closeNavModal={closeNavModal} 
        // toggleModal={this.toggleModal}
         ></LoginModal>}
 
    </div>
  );
}
