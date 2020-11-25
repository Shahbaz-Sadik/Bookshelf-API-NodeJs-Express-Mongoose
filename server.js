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

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "A Book must have a name"],
    unique: true,
  },
  authorNmae: {
    type: String,
    required: [true, "A book must have Author"],
  },
  publishYear: {
    type: String,
    required: [true, "A book must have publish Year"],
  },
  edition: {
    type: String,
    default: "1st",
  },
  language: {
    type: String,
    default: "English",
  },
  price: {
    type: Number,
    required: [true, "A book must have a price"],
  },
});

const Books = mongoose.model("Books", bookSchema);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
