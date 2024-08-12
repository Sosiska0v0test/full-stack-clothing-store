import Axios from './Axios'

// ******** PUBLICK APIs **********

// register new user API call
const registerService = async (user) => {
  const { data } = await Axios.post('/users', user);
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  return data;
}

// logout user Func
const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
}

// login user API call
const loginService = async (user) => {
  const { data } = await Axios.post('/users/login', user);
  if (data) {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  return data;
}

// ******** PRIVATE APIs **********

// update profile API call
const updateProfileService = async (user, token) => {
  const { data } = await Axios.put("/users", user, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
}

// delete profile API call
const deleteProfileService = async (token) => {
  const { data } = await Axios.delete("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.removeItem("userInfo");
  }
  return data;
}

// change password API call
const changePasswordService = async (password, token) => {
  const { data } = await Axios.put("/users/password", password, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data;
}

// get all favorite products
const getFavoriteProducts = async (token) => {
  const { data } = await Axios.get("/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete a favorite product
const deleteFavoriteProduct = async (id, token) => {
  const { data } = await Axios.delete(`/users/favorites/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};


// delete all favorite product
const deleteFavoriteProducts = async (token) => {
  const { data } = await Axios.delete("/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// like product API call
const likeProductService = async (productId, token) => {
  const { data } = await Axios.post(`/users/favorites`, productId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// ******** ADMIN APIs **********

// admin get all users
const getAllUsersService = async (token) => {
  const { data } = await Axios.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  return data
}

//admin delete user
const deleteUserService = async (id, token) => {
  const { data } = await Axios.delete(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}`, }
  })
  return data;
}

export {
  registerService,
  logoutService,
  loginService,
  updateProfileService,
  deleteProfileService,
  changePasswordService,
  deleteFavoriteProducts,
  deleteFavoriteProduct,
  getFavoriteProducts,
  getAllUsersService,
  deleteUserService,
  likeProductService,
}


