const { Sequelize } = require('sequelize');

//conexão sqlite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  })

sequelize.authenticate();

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("../models/User.model")(sequelize, Sequelize)
db.role = require("../models/role.model")(sequelize, Sequelize)//
db.Posts = require("../models/posts.model")(sequelize, Sequelize)
db.Coments = require("../models/Coments.model")(sequelize, Sequelize)
db.AwsersPosts = require("../models/AwsersPosts.model")(sequelize, Sequelize)
db.CreatorsPosts = require("../models/CreatorsPosts.model")(sequelize, Sequelize)
db.CreatorsComents = require("../models/CreatorsComents.model")(sequelize, Sequelize)

// associação da tabela usuario e post
db.Posts.belongsToMany(db.Users,
  {through: 'CreatorsPosts'}
)
db.Users.belongsToMany(db.Posts,
  {through: 'CreatorsPosts'}
)

// associação da tabela post e comentario
db.Posts.belongsToMany(db.Coments,
    {through: 'AwsersPosts'}
)
db.Coments.belongsToMany(db.Posts,
    {through: 'AwsersPosts'}
)

// associação da tabela usuario e comentario
db.Users.belongsToMany(db.Coments,
    {through: 'CreatorsComents'}
)
db.Coments.belongsToMany(db.Users,
    {through: 'CreatorsComents'}
)


module.exports = db;


