const jwt = require("jsonwebtoken");
const SECRETKEY = "Supersecret@123";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRETKEY, (err, user) => {
      if (err) {
        res.status(403);
      }
      req.user = user;
      next();
    });
  }
  else{
    res.status(401)
   }
};

module.exports = { SECRETKEY,authenticateJWT };
