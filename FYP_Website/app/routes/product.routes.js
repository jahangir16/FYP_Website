

// Initilize express router
module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Products
    router.get("/products", products.getAllProducts);

    // Retrieve a specific product with reviews
    //router.get("/product/:id", products.getProductWithReviews);
    const { authJwt } = require("../middleware"); // adjust the path as needed

    router.get("/product/:id", [authJwt.verifyToken, authJwt.isModerator], products.getProductWithReviews);
    // Use the router
    app.use('/', router);
};