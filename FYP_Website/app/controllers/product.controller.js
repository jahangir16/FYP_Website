const db = require("../models");
const Product = db.products;
const Review = db.reviews;
/**
// Get all products with pagination
//you would make a GET request to /products?page=2&limit=20.
exports.getAllProducts = (req, res) => {
    const page = req.query.page ? req.query.page : 1; // Default to page 1
    const limit = req.query.limit ? req.query.limit : 10; // Default limit to 10 items
    const offset = (page - 1) * limit;

    Product.findAll({
        limit: +limit,
        offset: +offset
    })
    .then((products) => {
        // Preprocess the products
        const processedProducts = products.map(product => {
            const data = product.dataValues;
            const processedProduct = {
                ...data,
                productname: data.productname.replace(/[{}"]/g, ''),
                brandname: data.brandname.replace(/[{}"]/g, ''),
                discountprice: data.discountprice.replace(/[{}"]/g, ''),
                originalprice: data.originalprice.replace(/[{}"]/g, ''),
                rating: data.rating.replace(/[{}"]/g, ''),
                image_urls: data.image_urls.replace(/[{}"]/g, '')
            };
            return processedProduct;
        });
    
        res.send(processedProducts); // Send processed products data back to the client
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "Error retrieving products" });
    });
};

Let's break down data.productname.replace(/[{}"]/g, ''):

/[{}"]/g: This is a regular expression pattern enclosed within forward slashes /. 
The pattern [{}"] means match any of the characters {, }, or ".
 The g flag at the end indicates a global search, meaning it will replace all occurrences in the 
 string rather than just the first one.

'': This is the replacement string, which in this case is an empty string.
 It means that any occurrence of the characters {, }, or " in the data.productname string will be 
 replaced with nothing, effectively removing them from the string.

So, data.productname.replace(/[{}"]/g, '') essentially removes any occurrences of {, }, 
or " characters from the productname property of the data object. 

*/

// Get product with its reviews
exports.getProductWithReviews = (req, res) => {
    const productId = req.params.id;

    Product.findByPk(productId, { include: { model: Review, as: 'reviews' } })
        .then((product) => {
            if (!product) {
                return res.status(404).send({ message: "Product not found" });
            }

            // Preprocess the product data
            const { reviews: productReviews, ...data } = product.dataValues;
            const processedProduct = {
                ...data,
                productname: data.productname.replace(/[{}"]/g, ''),
                brandname: data.brandname.replace(/[{}"]/g, ''),
                discountprice: data.discountprice.replace(/[{}"]/g, ''),
                originalprice: data.originalprice.replace(/[{}"]/g, ''),
                rating: data.rating.replace(/[{}"]/g, ''),
                image_urls: data.image_urls.replace(/[{}"]/g, '')
            };

            // Check if there are any reviews
            const reviews = product.reviews;
            if (!reviews || reviews.length === 0) {
                return res.send({
                    product: processedProduct,
                    reviews: "No reviews"
                });
            }

            res.send({
                product: processedProduct,
                reviews: reviews,
            });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error retrieving product" });
        });
};
//, you can search for products by making a GET request to /products?search=samsung
exports.getAllProducts = (req, res) => {
    const page = req.query.page ? req.query.page : 1; // Default to page 1
    const limit = req.query.limit ? req.query.limit : 10; // Default limit to 10 items
    const offset = (page - 1) * limit;
    const search = req.query.search; // Get the search term from the query parameters

    // Define the where clause for the search
    const whereClause = search ? { productname: { [db.Sequelize.Op.iLike]: `%${search}%` } } : {};
    Product.findAll({
        where: whereClause,
        limit: +limit,
        offset: +offset
    })
    .then((products) => {
        // Preprocess the products
        const processedProducts = products.map(product => {
            const data = product.dataValues;
            const processedProduct = {
                ...data,
                productname: data.productname.replace(/[{}"]/g, ''),
                brandname: data.brandname.replace(/[{}"]/g, ''),
                discountprice: data.discountprice.replace(/[{}"]/g, ''),
                originalprice: data.originalprice.replace(/[{}"]/g, ''),
                rating: data.rating.replace(/[{}"]/g, ''),
                image_urls: data.image_urls.replace(/[{}"]/g, '')
            };
            return processedProduct;
        });
    
        res.send(processedProducts); // Send processed products data back to the client
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "Error retrieving products" });
    });
};

/**
// Get all products
// Get all products with pagination
exports.getAllProducts = (req, res) => {
    const page = req.query.page ? req.query.page : 1; // Default to page 1
    const limit = req.query.limit ? req.query.limit : 10; // Default limit to 10 items
    const offset = (page - 1) * limit;

    Product.findAll({
        limit: +limit,
        offset: +offset
    })
    .then((products) => {
        res.send(products); // Send products data back to the client
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "Error retrieving products" });
    });
};
/**
// Get all products
exports.getAllProducts = (req, res) => {
    Product.findAll({ include: Review })
        .then((products) => {
            res.send(products);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error retrieving products" });
        });
};
/**



// Search product by ID
exports.getProductById = (req, res) => {
    const productId = req.params.id;

    Product.findByPk(productId, { include: Review })
        .then((product) => {
            if (!product) {
                return res.status(404).send({ message: "Product not found" });
            }
            res.send(product);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Error retrieving product" });
        });
};

 */