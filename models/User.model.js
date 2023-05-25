

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("Users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,


    },
    email: {
      type: Sequelize.STRING,


    },
    password: {
      type: Sequelize.STRING,

    },
  });

  return Users;
};
