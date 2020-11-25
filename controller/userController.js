exports.getAlluser = (req, res) => {
  res.status(200).json({
    status: "succes",
    message: "Show all user",
  });
};

exports.createUser = (req, res) => {
  res.status(200).json({
    status: "succes",
    message: "Create user",
  });
};
