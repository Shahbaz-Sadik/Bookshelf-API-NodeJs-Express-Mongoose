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
    console.log("Database connection successfully..");
  })
  .catch((err) => {
    console.log("database error!!!");
  });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
