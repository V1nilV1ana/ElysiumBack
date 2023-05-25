const Coments = require("../models/coments.model")
const Posts = require("../models/posts.model")

module.exports = (sequelize, Sequelize) => {
    const AwsersPosts = sequelize.define("AwsersPosts", {
    PostId: {
      type: Sequelize.INTEGER,
        references: {
            model: Posts,
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

  return AwsersPosts;
};