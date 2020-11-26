const dotEnv = require("dotenv");
const mongoose = require("mongoose");
dotEnv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE_NAME.replace("<PASSWORD>", process.env.PASSWORD);

//console.log(app.get("env"));
//console.log(process.env);
//console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Database connection sucessfull..");
  })
  .catch((err) => {
    console.log("database error!!!");
  });


// const testBooks = new Books({
//   bookName: "Js Book",
//   authorNmae: "G. K. Rouling",
//   publishYear: "May-2002",
//   edition: "1st",
//   language: "English",
//   price: 2000,
// });

// testBooks
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
