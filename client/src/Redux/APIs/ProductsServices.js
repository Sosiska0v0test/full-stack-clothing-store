import Axios from './Axios'

// ******** PUBLICK APIs **********

// get all products Function
export const getAllProductsService = async (
  category,
  prise,
  size,
  gender,
  rate,
  material,
  search,
  pageNumber
) => {
  const { data } = await Axios.get(
    `/products?category=${category}&prise=${prise}&size=${size}&gender=${gender}&rate=${rate}&material=${material}&search=${search}&pageNumber=${pageNumber}`
  );
  return data;
};

// get random Product Function
export const getRandomProductsService = async () => {
  const { data } = await Axios.get(`/products/random/all`);
  return data;
};

// get product by id Function
export const getProductByIdService = async (id) => {
  const { data } = await Axios.get(`/products/${id}`);
  return data;
};

// get top rated product Function
export const getTopRatedProductService = async () => {
  const { data } = await Axios.get(`/products/rated/top`);
  return data;
};

// review product Function
export const reviewProductService = async (token, id, review) => {
  const { data } = await Axios.post(`/products/${id}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete product Function
export const deleteProductService = async (token, id) => {
  const { data } = await Axios.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete all product function
export const deleteAllProductsService = async (token) => {
  const { data } = await Axios.delete(`/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// create product Function
export const createProductService = async (token, product) => {
  const { data } = await Axios.post(`/products`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update product Function
export const updateProductService = async (token, id, product) => {
  const { data } = await Axios.put(`/products/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
