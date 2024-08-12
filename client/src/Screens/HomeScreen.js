import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import Banner from '../Components/Home/Banner';
import PopularProducts from '../Components/Home/PopularProducts';
import Promos from '../Components/Home/Promos';
import TopRated from '../Components/Home/TopRated';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction, getRandomProductsAction, getTopRatedProductAction } from '../Redux/Actions/ProductsActions';
import toast from 'react-hot-toast';

function HomeScreen() {
  const dispatch = useDispatch();
  // useSelectors
  const {
    isLoading: randomLoading,
    isError: randomError,
    products: randomProducts,
  } = useSelector((state) => state.getRandomProducts);
  const {
    isLoading: topLoading,
    isError: topError,
    products: topProducts,
  } = useSelector((state) => state.getTopRatedProduct);
  const { isLoading, isError, products } = useSelector(
    (state) => state.getAllProducts
  );

  // useEffect
  useEffect(() => {
    // get random products
    dispatch(getRandomProductsAction());
    // get all products
    dispatch(getAllProductsAction({}));
    // get top rated products
    dispatch(getTopRatedProductAction());
  }, [dispatch]);

  // erorrs
  useEffect(() => {
    if (isError || randomError || topError) {
      toast.error('Щось пішло не так!');
    }
  }, [isError, randomError, topError]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner products={ products } isLoading={ isLoading } />
        <PopularProducts products={ randomProducts } isLoading={ randomLoading } />
        <Promos />
        <TopRated products={ topProducts } isLoading={ topLoading } />
      </div>
    </Layout>
  );
}

export default HomeScreen;
