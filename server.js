

    const express = require('express');
    const helmet = require("helmet");
    const bodyParser = require('body-parser');
    var Client = require('ftp');
    var fs = require('fs');
    
    const app = express();
    const port = process.env.PORT || 5000;
    
    const morgan = require('morgan');
    const router = require("express").Router();
    const path = require("path");

    const knex = require("knex");
    const bcrypt = require("bcrypt-nodejs");
const uuid = require('uuid').v4
    
    // aws bucket
    require('dotenv').config();
    const Busboy = require('busboy');
    const busboy = require('connect-busboy');
    const busboyBodyParser = require('busboy-body-parser')
    const cors = require('cors')
    app.use(cors());
    
    app.use(morgan('dev'));
    
    app.use(busboy())
    app.use(busboyBodyParser())
    
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));



    const register = require("./controllers/register");
    const signin = require("./controllers/signin");
    const saveTest = require("./controllers/savetest.js");
    const profile = require("./controllers/profile");
    const removeTest = require("./controllers/removeSavedTest.js");
 



//  production
 const db = knex({
   client: "pg",
   connection: process.env.CONNSTRING,
   searchPath: ["knex", "public"],
 });


// local
// const db = knex({
//     client: "pg",
//     connection: {
//       host: '127.0.0.1',
//       user: 'postgres',
//       password: 'Pass1234',
//       database: 'postgres'
//     },
//     searchPath: ["knex", "public"],
//   });
  
  app.post("/api/register", (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
  });
  app.post("/api/signin", signin.handleSignin(db, bcrypt));

  app.post("/api/savetest", (req, res) => {
    saveTest.handleSaveTest(req, res, db);
  });

  app.get("/api/profile/:email", (req, res) => {
      profile.handleProfileGet(req, res, db);
    });
  

    app.post("/api/removetest", (req, res) => {
      removeTest.handleRemoveSavedTest(req, res, db);
      });



    
    
    
      if (process.env.NODE_ENV === 'production') {

        app.use(helmet({
          contentSecurityPolicy: false,
        }));
        // Serve any static files
        app.use(express.static(path.join(__dirname, 'client/build')));
    
        // Handle React routing, return all requests to React app
        app.get('*', function (req, res) {
          res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
        });
      }
    
    
      app.listen(port, () => console.log(`Listening on port ${port}`));
    // console.log('Application running!' + cluster.worker.id);
    // }