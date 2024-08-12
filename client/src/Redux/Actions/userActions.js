import * as userConstants from "../Constants/userConstants";
import * as userApi from "../APIs/userServices"
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from 'react-hot-toast'

// login action
const loginAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userApi.loginService(datas);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
}

//register action
const registerAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userApi.registerService(datas);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL)
  }
}

//logout action
const logoutAction = () => (dispatch) => {
  userApi.logoutService();
  dispatch({ type: userConstants.USER_LOGOUT })
  dispatch({ type: userConstants.USER_LOGIN_RESET })
  dispatch({ type: userConstants.USER_REGISTER_RESET })
}

// update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
    const response = await userApi.updateProfileService(user, tokenProtection(getState));
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_SUCCESS, payload: response });
    toast.success("Профіль відредаговано✨");
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

//delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
    await userApi.deleteProfileService(tokenProtection(getState));
    dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
    toast.success("Профіль видалено👀");
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
  }
};

// change password action
const changePasswordAction = (password) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
    const response = await userApi.changePasswordService(
      password,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
  }
};

//get all favorite product action
const getFavoriteProductsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_FAVORITE_PRODUCTS_REQUEST });
    const response = await userApi.getFavoriteProducts(tokenProtection(getState));
    dispatch({
      type: userConstants.GET_FAVORITE_PRODUCTS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_FAVORITE_PRODUCTS_FAIL);
  }
};

// delete a specific favorite product action
const deleteFavoriteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_FAVORITE_PRODUCT_REQUEST });
    const response = await userApi.deleteFavoriteProduct(id, tokenProtection(getState));
    dispatch({
      type: userConstants.DELETE_FAVORITE_PRODUCT_SUCCESS,
      payload: response,
    });
    dispatch(getFavoriteProductsAction()); // Refresh the favorite products list
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_FAVORITE_PRODUCT_FAIL);
  }
};


//delete all product action
const deleteFavoriteProductsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_FAVORITE_PRODUCTS_REQUEST });
    await userApi.deleteFavoriteProducts(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.DELETE_FAVORITE_PRODUCTS_SUCCESS,
    })
    toast.success("Товари з кошика видалено!")
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_FAVORITE_PRODUCTS_FAIL);
  }
}

//admin get all users action
const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
    const response = await userApi.getAllUsersService(tokenProtection(getState));
    dispatch({
      type: userConstants.GET_ALL_USERS_SUCCESS,
      payload: response,
    })
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
  }
};

//admin delete user action
const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    await userApi.deleteUserService(id, tokenProtection(getState));
    dispatch({
      type: userConstants.DELETE_USER_SUCCESS,
    });
    toast.success("Юзера видалено");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL);
  }
};

// user like product action
const likeProductAction = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.LIKE_PRODUCT_REQUEST });
    const response = await userApi.likeProductService(
      productId,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.LIKE_PRODUCT_SUCCESS,
      payload: response,
    });
    toast.success("Товар додано до вашого кошика");
    dispatch(getFavoriteProductsAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.LIKE_PRODUCT_FAIL);
  }
};

export {
  loginAction,
  registerAction,
  logoutAction,
  updateProfileAction,
  deleteProfileAction,
  changePasswordAction,
  getFavoriteProductsAction,
  deleteFavoriteProductAction,
  deleteFavoriteProductsAction,
  getAllUsersAction,
  deleteUserAction,
  likeProductAction
};