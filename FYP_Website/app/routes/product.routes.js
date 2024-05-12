

// Initilize express router
module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Products
    router.get("/products", products.getAllProducts);

    // Retrieve a specific product with reviews
    // Use the saveUser middleware for authentication
    router.get("/product/:id", products.getProductWithReviews);

    // Use the router
    app.use('/', router);
};