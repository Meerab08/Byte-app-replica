const jwt = require("jsonwebtoken");

const config = process.env;
// console.log("config: ", config);

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    res.status(403).send("An access token is required!");
  }
  try {
    console.log("token: ", token);
    console.log("token_key: ", config.TOKEN_KEY);
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    // res.send(decoded);
    req.user = decoded;
  } catch (error) {
    res.status(401).send("Access token is not valid!");
  }
  return next();
};

module.exports = verifyToken;
