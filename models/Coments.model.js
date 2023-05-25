
module.exports = (sequilize, Sequelize) => {
    const Coments = sequilize.define("Coments", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        coment: {
            type: Sequelize.STRING,
            require: true
        },
        like: {
            type: Sequelize.INTEGER,
            defaultValue: '0',
        },
    },
        {
            timestamp: true,
        },


    )

    return Coments
}