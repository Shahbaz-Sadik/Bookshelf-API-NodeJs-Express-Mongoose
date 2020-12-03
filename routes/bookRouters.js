const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");
const authController = require("./../controller/authController");

router.param("name", (req, res, next, value) => {
  //console.log(`The name of book: ${value}`);
  next();
});

router.route("/").get(bookController.getAllBooks).post(authController.authenticated, bookController.addBook);
router
  .route("/:name")
  .get(bookController.getBookDetails)
  .patch(authController.authenticated, bookController.updateBook)
  .delete(authController.authenticated, bookController.deleteBook);

module.exports = router;
