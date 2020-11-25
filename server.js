const dotEnv = require("dotenv");
dotEnv.config({ path: "./config.env" });

const app = require("./app");

//console.log(app.get("env"));
//console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
