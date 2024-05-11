const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./product.model.js")(sequelize, Sequelize);
db.reviews = require("./review.model.js")(sequelize, Sequelize);


// Define relationships
db.products.hasMany(db.reviews, { as: "reviews", foreignKey: "product_id" });
db.reviews.belongsTo(db.products, { foreignKey: "product_id", as: "product" });
module.exports = db;
/**
 * In development, you may need to drop existing tables and re-sync database. Just use force: true
 * 
 * db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
 */

