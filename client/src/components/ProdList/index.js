import React, { Component, useState } from "react";

import "./style.css";
import Prismic from "prismic-javascript";
// import { Date, Link, RichText } from "prismic-reactjs";
import linkResolver from "../../utils/linkResolver";
// import logo from '../../media/logo.png'
import { Link } from "react-router-dom";
import ProdDetails from "../../components/ProdDetails/index"
import favIcon from "../../media/fav_icon.png"

import ClipLoader from "react-spinners/ClipLoader";
var Moment = require("moment");

require("dotenv").config();
const { REACT_APP_PRISMIC_API, REACT_APP_PRISMIC_TOKEN } = process.env;

export default function ProdList() {
  const apiEndpoint = REACT_APP_PRISMIC_API;
  const accessToken = REACT_APP_PRISMIC_TOKEN;

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

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query(
        Prismic.Predicates.at("document.type", "product"),
        { orderings: "[my.product.post_date desc]" }
      );
      if (response) {
        setDocData(response.results);
        console.log(response.results);
      }
    };
    fetchData();
    // fetchDates()
  }, []);


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
        <div onClick={() => {toggleItem(post.uid)}} className="product">
            <img className="fav-icon" src={favIcon}/>
          <Link to={`/products/${post.uid}`}>
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
 
    </div>
  );
}
