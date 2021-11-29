/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const isUserLoggedIn = require("./helpers/isUserLoggedIn");
//const fakeUser = require("../fake-data/user.json");

module.exports = (db) => {
  router.get("/", (req, res) => {
    // db.query(`SELECT * FROM users;`)
    //   .then((data) => {
    //     // const users = data.rows;
    //     res.json({ users: "hello" });
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err.message });
    //   });
    res.json({
      users: "hello",
    });
  });

  router.post("/login", (req, res) => {
    const userID = req.session.user_id;

    isUserLoggedIn(userID, db).then((auth) => {
      if (auth) {
        console.log("already logged in");
        return res.json({
          auth: true,
          message: "already logged in",
        });
      }
      // user is not logged in

      db.getUserByEmail(req.body.email)
        .then((user) => {
          if (user) {
            //if the user exists in the database
            if (req.body.password === user.password) {
              //check the user password vs the form password
              req.session.user_id = user.id;
              console.log(req.session.user_id);
              console.log("authenticated");
              res.json({
                auth: true,
                message: "success",
              });
            } else {
              console.log("not authenticated");
              res.json({
                auth: false,
                message: "bad password",
              });
            }
          } else {
            //user does not exist in db as per email
            console.log("email does not exist");
            res.json({
              auth: false,
              message: "not a valid email address",
            });
          }
        })
        .catch((err) => {
          //db error
          console.log("db error");
          console.log(err);
          res.status(500).json({
            auth: false,
            message: "internal server error",
          });
        });
    });
  });

  router.post("/logout", (req, res) => {
    req.session = null; //deletes user cookies
    res.json({
      auth: false,
      message: "sucessfully logged out user",
    });
  });

  router.post("/signup", (req, res) => {
    const userID = req.session.user_id;

    db.getUserById(userID).then((dbusr) => {
      //the user id from cookie matches an id in the database

      if (dbusr) {
        //user is already logged in
        console.log("already logged in");
        return res.json({
          auth: true,
          message: "already logged in",
        });
      }

      const user = {
        first_name: req.body.FirstName,
        last_name: req.body.LastName,
        email: req.body.email,
        password: req.body.password,
      };
      // const values = [user.first_name, user.last_name, user.email, user.password]
      db.addUser(user)
        .then((result) => {
          if (!result) {
            res.json({
              auth: false,
              message: "not succesful in registering user",
            });
            return console.log("not successful in adding new user");
          }
          console.log("successfully added user to db: ", result);
          req.session.user_id = result.id; //set the cookie according to the userid returned from the database
          res.json({
            auth: true,
            message: "succesful registration",
          });
        })
        .catch((err) => {
          console.log("db error", err);
          res.status(500).json({
            auth: false,
            message: "internal server error",
          });
        });
    });
    // db.addUser()
  });
  return router;
};
