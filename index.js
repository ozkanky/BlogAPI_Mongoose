"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */
/*
    BLOG API with Mongoose
*/
/*
    $ npm i express dotenv express-async-errors
    $ npm i mongoose
*/
const express = require("express");
const app = express();

app.use(express.json()); // yukarıda  kalsın

require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

/* DB connection  */
require("./src/configs/dbConnection"); // dotenv çalıştıktan sonra
/* ------------------------------------------------------- */

//! SessionCookies:
// http://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session
//* $ npm i cookie-session

const session = require("cookie-session");
app.use(
  session({
    secret: process.env.SECRET_KEY,
  })
);
/* ------------------------------------------------------- */
//! Middlewares:
// Filter, Search , Sort , Limit
app.use(require('./src/middlewares/findSearchSortPage'))
/* ------------------------------------------------------- */

//! check logined user 
app.use(require("./src/middlewares/userControl"));

/* ------------------------------------------------------- */
app.all("/", (req, res) => {
  // res.send('WELCOME BLOG API PROJECT')

  if (req.isLogin) {
    res.send({
      error: false,
      message: "WELCOME BLOG API PROJECT",
      session: req.session, 
      user: req.user,
    });
  } else {
    res.send({
      error: false,
      message: "WELCOME BLOG API PROJECT",
      session: req.session, 
    });
  }
});

app.use("/user", require("./src/routes/user.router"));
app.use("/blog", require("./src/routes/blog.router"));

app.use(require("./src/middlewares/errorHandler")); // aşağıda kalsın

app.listen(PORT, () =>
  console.log(` Server Running on http://${HOST}:${PORT}`)
);

// require('./src/sync')()
