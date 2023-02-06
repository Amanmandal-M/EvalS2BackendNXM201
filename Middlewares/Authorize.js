const jwt = require('jsonwebtoken');

const authorize = (roles) => {
  
      return (req, res, next) => {
        const UserRoleses = req.body.role;
        if (roles.includes(UserRoleses)) {
          next();
        } else {
          res.send("not authorised");
        }
      };
};

module.exports = { authorize };