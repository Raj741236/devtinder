const adminAuth = (req, res, next) => {
  console.log("Admin middleware called");

  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Not a valid admin");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User middleware called");

  const token = "xyz";
  const isUSERAuthorized = token === "xyz";
  if (!isUSERAuthorized) {
    res.status(401).send("Not a valid USER");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
