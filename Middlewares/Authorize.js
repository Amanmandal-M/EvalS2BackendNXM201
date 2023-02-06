const jwt = require('jsonwebtoken');

const authorize = (roles) => {
  //inner function
  return (req, res, next) => {
    const UserRoles = req.body.role;
    if (roles.includes(UserRoles)) {
      next();
    } else {
      res.send("not authorised");
    }
  };
};

module.exports = { authorize };