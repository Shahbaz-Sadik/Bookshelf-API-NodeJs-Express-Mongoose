const express = require("express");

exports.getAllBooks = (req, res) => {
  res
    .status(200)
    .json({ status: "success", requestAt: req.requestTime, message: "Here You can get all the book list..." });
};

exports.getBookDetails = (req, res) => {
  console.log(req.params);
  res.status(200).json({ status: "success", message: "Here You can get a book details" });
};

exports.addBook = (req, res) => {
  console.log(req.body);
  res.status(200).send({ status: "success", message: "Add a new book" });
};

exports.updateBook = (req, res) => {
  console.log(req.params);
  console.log(req.body);
  res.status(200).json({
    status: "success",
    message: "update book.....a",
  });
};

exports.deletBook = (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: "success",
    message: "Delete a book",
  });
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: "failled",
      message: "Please Give The Book Name",
    });
  }

  next();
};
