const Coments = require("./Coments.model")
const Users = require("./User.model")

module.exports = (sequelize, Sequelize) => {
    const CreatorsComents = sequelize.define("CreatorsComents", {
    UserId: {
      type: Sequelize.INTEGER,
        references: {
            model: Users,
            key: 'id'
      }
        },
    
    ComentId: {
      type: Sequelize.INTEGER,
        references: {
            model: Coments,
            key: 'id'
      }
    },
    },
      {
        timestamps: false,
      },
    );

  return CreatorsComents;
};