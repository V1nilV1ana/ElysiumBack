const db = require("../models")
const User = db.Users

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Nome do usuario
    let user = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (user) {
      return res.status(400).send({
        message: "ERRO: esse nome ja esta sendo usado!"
      });
    }

    // Email
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      return res.status(400).send({
        message: "ERRO: esse email ja esta sendo usado!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Falha em validar o usuario"
    });
  }
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;