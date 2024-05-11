const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productname: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        brandname: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        discountprice: {
            type: DataTypes.TEXT
        },
        originalprice: {
            type: DataTypes.TEXT
        },
        rating: {
            type: DataTypes.TEXT
        },
        category: {
            type: DataTypes.TEXT
        },
        producturl: {
            type: DataTypes.TEXT
        },
        image_urls: {
            type: DataTypes.TEXT
        },
        images: {
            type: DataTypes.JSONB
        }
    }, {
        timestamps: false, // add this line
        // Other configurations if needed
        
    });
 
    
    return Product;
};
