const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");

router.param("name", (req, res, next, value) => {
  console.log(`The name of book: ${value}`);
  next();
});

router.route("/").get(bookController.getAllBooks).post(bookController.checkBody, bookController.addBook);
router
  .route("/:name")
  .get(bookController.getBookDetails)
  .patch(bookController.updateBook)
  .delete(bookController.deletBook);

module.exports = router;
