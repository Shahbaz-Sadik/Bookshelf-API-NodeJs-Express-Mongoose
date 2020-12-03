const express = require("express");
const morgan = require("morgan");

const booksRouter = require("./routes/bookRouters");
const userRouter = require("./routes/userRouters");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  //console.log("Hit the middle ware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/books", booksRouter);
app.use("/api/v1/users", userRouter);

app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "This URL is not defined",
  });
});

module.exports = app;
