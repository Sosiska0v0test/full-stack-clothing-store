import asyncHandler from 'express-async-handler';
import Product from "../models/ProductsModel.js";
import { ProductsData } from '../Data/ProductData.js';

// ********** PUBLIC CONTROLLERS **********
// @desc import products
// @route POST /api/products/import
// @access Public

const importProducts = asyncHandler(async (req, res) => {
  await Product.deleteMany({});
  const products = await Product.insertMany(ProductsData);
  res.status(201).json(products);
});

// @desc get all products
// @route GER /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  try {
    //filter products by category, size, rate, material and search
    const { category, prise, size, rate, gender, material, search, stock } = req.query;
    let query = {
      ...(category && { category }),
      ...(prise && { prise }),
      ...(size && { size }),
      ...(gender && { gender }),
      ...(rate && { rate }),
      ...(material && { material }),
      ...(stock && { stock }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    }

    // load more products functionality
    const page = Number(req.query.pageNumber) || 1;
    const limit = 24;
    const skip = (page - 1) * limit;

    // find products by query, skip and limit
    const products = await Product.find(query)
      //.sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    //get total number of products
    const count = await Product.countDocuments(query);

    //send response with products and total number of products
    res.json({ products, page, pages: Math.ceil(count / limit), totalProducts: count })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// @desc get product by id
// @route GER /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  try {
    // find product by id in database
    const product = await Product.findById(req.params.id);
    // if the product if found send it to the client
    if (product) {
      res.json(product);
    }
    // if the products is not found send 404 error
    else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// @desc get top rated products
// @route GER /api/products/rated/top
// @access Public

const getTopRatedProducts = asyncHandler(async (req, res) => {
  try {
    //find top rated products
    const products = await Product.find({}).sort({ rate: -1 });
    //send top rated products to the client
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// @desc get random products
// @route GER /api/products/random/all
// @access Public

const getRandomProducts = asyncHandler(async (req, res) => {
  try {
    //find random products
    const products = await Product.aggregate([{ $sample: { size: 8 } }]);
    //send random products to the client
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// ************ PRIVATE CONTROLLERS ************

// @desc Create product review
// @route GER /api/products/:id/reviews
// @access Public

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    //find product by id in database
    const product = await Product.findById(req.params.id);
    if (product) {
      //check if the user alresdy reviewed this product
      const alreadyReviewed = product.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      //if user already reviewed this product send 400 error
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You already reviewed this product")
      }
      // else create a new review 
      const review = {
        userName: req.user.fullName,
        userImage: req.user.image,
        userId: req.user._id,
        rating: Number(rating),
        comment,
      }
      //push the new review to the reviews array
      product.reviews.push(review);
      //increment the number of review
      product.numberOfReviews = product.reviews.length;
      //calculate the new rate
      product.rate =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      //save the product in database
      await product.save();
      //send the new product to the client
      res.status(201).json({
        message: 'Review added'
      });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// ****************** ADMIN CONTROLLERS ******************

// @desc Update product
// @route PUT /api/products/:id/
// @access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  try {
    //get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      prise,
      size,
      gender,
      material,
      stock,
      casts,
    } = req.body;

    // find product by id database
    const product = await Product.findById(req.params.id);
    if (product) {
      // update product data
      product.name = name || product.name;
      product.desc = desc || product.desc;
      product.image = image || product.image;
      product.titleImage = titleImage || product.titleImage;
      product.rate = rate || product.rate;
      product.numberOfReviews = numberOfReviews || product.numberOfReviews;
      product.category = category || product.category;
      product.prise = prise || product.prise;
      product.size = size || product.size;
      product.gender = gender || product.gender;
      product.material = material || product.material;
      product.stock = stock || product.stock;
      product.casts = casts || product.casts;

      //save the product in database
      const updatedProduct = await product.save();
      //send the updated product to the client
      res.status(201).json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete product
// @route DELETE /api/products/:id/
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    //find product by id in DataBase
    const product = await Product.findById(req.params.id);
    //if the product is found delete it
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    }
    // if the product is not found send 404 error
    else {
      res.status(404);
      throw new Error("Product not found")
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// @desc Delete all product
// @route DELETE /api/product/
// @access Private/Admin

const deleteAllProducts = asyncHandler(async (req, res) => {
  try {
    //delete all products
    await Product.deleteMany({});
    res.json({ message: "All products removed" })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// @desc Create product
// @route POST /api/products/
// @access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  try {
    //get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      prise,
      size,
      gender,
      material,
      stock,
      casts,
    } = req.body;

    //create a new product
    const product = new Product({
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      prise,
      size,
      gender,
      material,
      stock,
      casts,
      userId: req.user._id,
    });

    //save the product in database
    if (product) {
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    }
    else {
      res.status(400);
      throw new Error("Invalid product data")
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

export { importProducts, getProducts, getProductById, getTopRatedProducts, getRandomProducts, createProductReview, updateProduct, deleteProduct, deleteAllProducts, createProduct };
