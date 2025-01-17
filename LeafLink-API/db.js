const { Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(process.env.DB_DATANAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    host: process.env.DB_HOSTNAME,
    dialect: 'mariadb',
    logging: console.log,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Connection failed: " + error);
    }
})();

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.plants = require("./models/Plant")(sequelize, DataTypes);
db.users = require("./models/User")(sequelize, DataTypes);
db.plantlists = require("./models/PlantList")(sequelize, DataTypes);

const sync = (async () => { 
    await sequelize.sync({ alter : true});
    console.log("Models have been synchronized successfully.")
})

module.exports = {db, sync};