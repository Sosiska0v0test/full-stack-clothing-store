import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as User from './Reducers/userReducers';
import * as categories from './Reducers/CategoriesReducer';
import * as products from './Reducers/ProductsReducer';

const rootReducer = combineReducers({
  // user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  userChangePassword: User.userChangePasswordReducer,
  userGetFavoriteProducts: User.userGetFavoriteProductsReducer,
  userDeleteFavoriteProducts: User.userDeleteFavoriteProductsReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUserReducer,
  userLikeProduct: User.userLikeProductReducer,
  userDeleteFavoriteProduct: User.userDeleteFavoriteProductReducer,


  //Category reducer
  categoryGetAll: categories.getAllCategoriesReducer,
  categoryCreate: categories.createCategoryReducer,
  categoryUpdate: categories.updateCategoryReducer,
  categoryDelete: categories.deleteCategoryReducer,

  // product reducers
  getAllProducts: products.productsListReducer,
  getRandomProducts: products.productsRandomReducer,
  getProductById: products.productDetailsReducer,
  getTopRatedProduct: products.productTopRatedReducer,
  createReview: products.createReviewReducer,
  deleteProduct: products.deleteProductReducer,
  deleteAllProducts: products.deleteAllProductsReducer,
  createProduct: products.createProductReducer,
  casts: products.CastsReducer,
  updateProduct: products.updateProductReducer,
})

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// initialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
})
