import React, { Component, useState, useContext } from "react";

import "./style.css";
import Prismic from "prismic-javascript";
// import { Date, Link, RichText } from "prismic-reactjs";
import linkResolver from "../../utils/linkResolver";
// import logo from '../../media/logo.png'
import { Link } from "react-router-dom";
import ProdDetails from "../../components/ProdDetails/index"
import favIcon from "../../media/fav_icon.png"

import ClipLoader from "react-spinners/ClipLoader";
import {
  ThemeContextConsumer,
  ThemeContextProvider,
} from "../../utils/themeContext";
var Moment = require("moment");
require("dotenv").config();
const { REACT_APP_PRISMIC_API, REACT_APP_PRISMIC_TOKEN } = process.env;



require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default function FavoritesPage() {
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
  const [saved, setSaved] = React.useState(false);






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
    
            } else if (response.status == '400') {
              console.log("failed")
            }
          })
        } else {
          alert("problems")
          // this.setState({
          //   loginAlert: true
          // })
        }
    
      }
    



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

const formatSavedTests = (savedTests) => {
    context.fetchUserData(context.userData.email)
    // setSaved(context.userData.saved)
    // console.log("saved tests", savedTests)
    const fetchData = async () => {
        // if (context.userLoggedIn) {
            console.log("THE CONTEXT", context)
       let ids = savedTests
       console.log(ids);
      const response = await Client.query(
        Prismic.Predicates.in('document.id', ids),
      );
      if (response) {
          console.log('setting')
        setDocData(response.results);
        console.log(response.results);
      }
    // }
    };
    fetchData();
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
          formatSavedTests(context.userData.saved);
        setSaved(true)
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




React.useEffect(() => {
    console.log("effect context updated", context)
  const fetchData = async () => {
      // if (context.userLoggedIn) {
          console.log("THE CONTEXT", context)
          if (saved){
              var ids = saved;
          } else  {
              var ids = context.userData.saved;
          }
     console.log(ids);
    const response = await Client.query(
      Prismic.Predicates.in('document.id', ids),
    );
    if (response) {
      setDocData(response.results);
      console.log(response.results);
    }
  // }
  };
  fetchData();
  // fetchDates()
}, []);



var now = Moment();
// console.log(now);
let thisYear = Moment(now).format("YYYY")
let thisMonth = Moment(now).format("MMMM")
let allYears = [thisYear];
let allMonths = [thisMonth];
// to be changed when blog has run longer
for (var i = 1; i <=1; i++) {
  allYears.push(Moment(now).subtract(i, 'years').format("YYYY"));
}
for (var i = 1; i <=11; i++) {
  allMonths.push(Moment(now).subtract(i, 'months').format("MMMM"));
}
console.log("all months", allMonths)
console.log("all years", allYears)

// const someYears = ["2021","2020", "2019"]
// const monthsOfYear= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


  if (doc) {
    var data = doc.map(
      (post) => (
        <div className="product">
            {/* <img className="fav-icon" onClick={() => {saveItem(post.id)}} src={favIcon}/> */}
            <div className="nav-login">
            <i class="lni lni-heart-filled" onClick={() => {removeItem(post.id)}}></i>
            </div>
          <Link onClick={() => {toggleItem(post.uid)}}
            to={`/wishlist/${post.uid}`}>
            <img
              className="blog-img"
              alt="cover"
              src={post.data.product_image.url}
              />
          </Link>
          <div className="product-box">
            <h1>{post.data.product_name[0].text}</h1>
          <p>{post.data.date}</p>
          <p>{post.data.product_description[0].text}</p>
          </div>
      
        </div>
      )
      // <div>post</div>
      // <h1>{RichText.asText(doc.data.title)}</h1>
    );

    var months = allMonths.map((month, i) => (
      <option value={month}>{month}</option>
    ));
    var years = allYears.map((year, i) => (
      <option value={year}>{year}</option>
    ));
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
          {doc ? (
            <div >
              {doc.length > 0 ?
              <div>
               <h1>Your Favorites</h1>
           <div className="product-wrapper">
               {data}
               </div>
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
 
    </div>
  );
}
