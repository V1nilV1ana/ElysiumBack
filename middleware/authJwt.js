const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;

verifyToken = (req, res, next) => {
    let token = req.session.token;

    if (!token) {
        return res.status(403).send({
            message: "Token não oferecida",
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Não Autorizado!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
const authJwt = {
  verifyToken,
};
module.exports = authJwt;
