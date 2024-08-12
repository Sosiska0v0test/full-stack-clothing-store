import express from "express";
import { protect, admin } from "../middlewares/Auth.js";
import * as productsController from "../controller/ProductsController.js";

const router = express.Router();

// +++++++++ Public Routes +++++++++

router.post('/import', productsController.importProducts);
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.get('/rated/top', productsController.getTopRatedProducts);
router.get('/random/all', productsController.getRandomProducts);


// +++++++++ PRIVATE ROUTES +++++++++
router.post("/:id/reviews", protect, productsController.createProductReview);


// +++++++++ ADMIN ROUTES +++++++++
router.put("/:id", protect, admin, productsController.updateProduct);
router.delete("/:id", protect, admin, productsController.deleteProduct);
router.delete("/", protect, admin, productsController.deleteAllProducts);
router.post("/", protect, admin, productsController.createProduct);


export default router;