const express = require("express");
const Books = require("./../models/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const getAllBooks = await Books.find({}, { bookName: 1, authorName: 1, _id: 0 });
    res.status(200).json({
      status: "success",
      requestAt: req.requestTime,
      result: getAllBooks.length,
      getAllBooks,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      err,
    });
  }
};

exports.getBookDetails = async (req, res) => {
  try {
    //console.log(req.params.name);
    const bookDetails = await Books.findOne({ bookName: req.params.name }, { _id: 0, __v: 0 });

    if (!bookDetails) {
      throw `No book with this name: ${req.params.name}`;
    }

    res.status(200).json({
      status: "success",
      bookDetails,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      err,
    });
  }
};

exports.addBook = async (req, res) => {
  try {
    const newBook = await Books.create(req.body);

    res.status(200).send({ status: "success", message: `${newBook.bookName} successfully added to the book list`});
  } catch (err) {
    res.status(400).send({ status: "Fail", message: "Invalid data send or Add an Existing book"});
  }
};

exports.updateBook = async (req, res) => {
  try {
    const editBook = await Books.findOneAndUpdate({ bookName: req.params.name }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!editBook) throw "No Book with this name to update";

    res.status(200).json({
      status: "success",
      message: `successfully updated ${editBook.bookName}`,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      err,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleteOne = await Books.findOneAndDelete({ bookName: req.params.name });
    if (!deleteOne) throw "No book with this name to delete";
    res.status(200).json({
      status: "success",
      message: `Delete ${req.params.name} from book list`,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      err,
    });
  }
};
