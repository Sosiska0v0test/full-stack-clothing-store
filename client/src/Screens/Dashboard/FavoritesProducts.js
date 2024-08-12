import React, { useContext, useEffect, useState } from 'react';
import SideBar from './SideBar';
import Table from '../../Components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavoriteProductsAction, getFavoriteProductsAction, deleteFavoriteProductAction } from '../../Redux/Actions/userActions';
import toast from 'react-hot-toast';
import Loader from './../../Components/Notification/Loader';
import { Empty } from '../../Components/Notification/Empty';
import { GrBasket } from "react-icons/gr";
import { SidebarContext } from '../../Context/DrawerContext';
import { useNavigate } from 'react-router-dom';

function FavoritesProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, likedProducts } = useSelector(
    (state) => state.userGetFavoriteProducts
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavoriteProducts);

  const [canCheckout, setCanCheckout] = useState(true); // State to track checkout permission

  const deleteProductsHandler = () => {
    window.confirm('Ви дійсно хочете видалити всі товари з кошика?') &&
      dispatch(deleteFavoriteProductsAction());
  };

  const deleteSingleProductHandler = (id) => {
    dispatch(deleteFavoriteProductAction(id));
  };

  const checkoutHandler = () => {
    // Check if any product's stock is less than 1
    const hasStockBelowOne = likedProducts.some(product => product.stock < 1);

    if (hasStockBelowOne) {
      toast.error('Деякі товари відсутні на складі. Будь ласка, видаліть їх з кошика.');
    } else {
      const orderDetails = {
        orderNumber: Math.floor(Math.random() * 1000000),
        totalAmount: likedProducts.reduce((total, product) => total + product.prise, 0),
        email: userInfo.email,
      };

      navigate('/order-success', { state: orderDetails });
    }
  };

  useEffect(() => {
    dispatch(getFavoriteProductsAction());
  }, [dispatch, isSuccess]);

  useEffect(() => {
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? 'GET_FAVORITE_PRODUCTS_RESET'
          : 'DELETE_FAVORITE_PRODUCTS_RESET',
      });
    }
  }, [dispatch, isError, deleteError]);

  return (
    <SideBar>
      <div className='flex flex-col gap-6'>
        <div className='flex items-right gap-10'>
          <div className='flex items-center gap-2'>
            <h2 className='text-xl font-bold text-white'>Кошик</h2>
            <GrBasket className='text-subMain w-5 h-5' />
          </div>
          { likedProducts?.length > 0 && (
            <>
              <button
                disabled={ deleteLoading }
                onClick={ deleteProductsHandler }
                className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-mainText hover:text-white py-3 px-6 rounded"
              >
                { deleteLoading ? 'Видалення...' : 'Видалити все' }
              </button>
              <button
                onClick={ checkoutHandler }
                disabled={ !canCheckout } // Disable button if canCheckout is false
                className={ `bg-subMain font-medium text-white py-3 px-6 rounded ${!canCheckout && 'opacity-50 cursor-not-allowed'}` }
              >
                Оформити замовлення
              </button>
            </>
          ) }
        </div>
        { isLoading ? (
          <Loader />
        ) : likedProducts.length > 0 ? (
          <>
            <Table
              data={ likedProducts }
              onDeleteHandler={ deleteSingleProductHandler }
            />
            <div className='text-white font-bold text-right'>
              Загальна сума: { likedProducts.reduce((total, product) => total + product.prise, 0) } $
            </div>
          </>
        ) : (
          <Empty message="Ваш кошик з товарами порожній" />
        ) }
      </div>
    </SideBar>
  );
}

export default FavoritesProducts;
