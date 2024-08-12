import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import FlexProductItems from '../FlexProductItems';
import { Link } from 'react-router-dom';
import { GrBasket } from "react-icons/gr";
import Loader from '../../../src/Components/Notification/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { IfProductLiked, LikeProduct } from '../../Context/Functionalities';
import { MdOutlineTravelExplore } from 'react-icons/md';

const Swipper = ({ sameClass, products }) => {
  const { isLoading } = useSelector((state) => state.userLikeProduct);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function
  const isLiked = (product) => {
    return IfProductLiked(product);
  };

  return (
    <Swiper
      direction="vertical"
      slidesPerView={ 1 }
      loop={ true }
      speed={ 1000 }
      modules={ [Autoplay] }
      autoplay={ { delay: 4000, disableOnInteraction: false } }
      className={ sameClass }
    >
      { products?.slice(0.6).map((product, index) => (
        <SwiperSlide key={ index } className='relative rounded overflow-hidden'>
          <img src={ product?.titleImage ? product.titleImage : "/images/user.jpg" } alt={ product?.name } className='w-full h-full object-cover' />
          <div className='absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4'>
            <h1 className='xl:text-4xl truncate text-white capitaliz font-sans sm:text-2xl text-xl font-bold'>
              { product?.name }
            </h1>
            <div className='flex gap-5 items-center text-white'>
              <FlexProductItems product={ product } />
            </div>
            <div className='flex gap-5 items-center text-white'>
              <Link to={ `/product/${product?._id}` } className='bg-subMain hover:text-main transitions text-main px-8 py-3 rounded font-medium sm:text-sm text-xs'>
                Детальніше...
              </Link>
              <button
                onClick={ () => LikeProduct(product, dispatch, userInfo) }
                disabled={ isLiked(product) || isLoading }
                className={ `bg-white
              ${isLiked(product) ? "text-red-500" : "text-white"}
               hover:text-red-500 transitions px-4 py-3 rounded text-sm bg-opacity-30`}
              >
                <GrBasket className='h-5 w-5' />
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))
      }
    </Swiper>
  )
}

function Banner({ products, isLoading }) {
  const sameClass = 'w-full flex-colo xl:h-128 bg-dry lg:h-96 h-64'
  return (
    <div className="relative w-full">
      { isLoading ? (
        <div className={ sameClass }>
          <Loader />
        </div>
      ) : products?.length > 0 ? (
        <Swipper sameClass={ sameClass } products={ products } />
      ) : (
        <div className={ sameClass }>
          <div className='flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl'>
            <MdOutlineTravelExplore />
          </div>
          <p className='text-main text-sm'>На цьому сайті не має товарів</p>
        </div>
      ) }
    </div >
  )
}

export default Banner