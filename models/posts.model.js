
module.exports = (sequelize, Sequelize) => {
    const Posts = sequelize.define("Posts", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            require: true
        },
        desc: {
            type: Sequelize.STRING,
            require: true
        },
        content: {
            type: Sequelize.STRING,
            require: true
        },
        likes: {
            type: Sequelize.INTEGER,
            defaultValue: '0',
            
        },
    },
    {
        timestamps: true,
        },
    );

    return Posts;
}