import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import userRouter from './Routes/UserRouter.js'
import productsRouter from './Routes/ProductsRouter.js'
import categoriesRouter from './Routes/CategoriesRouter.js'
import Uploadrouter from './controller/UploadFile.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
//Connect DB
connectDB();


// Main route
app.get('/', (req, res) => {
    res.send('API is running...');
});
//other routes
app.use('/api/users', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/upload', Uploadrouter);

//error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in http://localhost/${PORT}`);
});
