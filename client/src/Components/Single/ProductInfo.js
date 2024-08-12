import React, { useState } from 'react';
import FlexProductItems from '../FlexProductItems';
import { FaShareAlt } from 'react-icons/fa';
import Rating from '../Stars';
import { useDispatch, useSelector } from 'react-redux';
import { IfProductLiked, LikeProduct } from '../../Context/Functionalities';
import { GrBasket } from 'react-icons/gr';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function ProductInfo({ product, setModalOpen }) {
  const { isLoading } = useSelector((state) => state.userLikeProduct);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // if liked function
  const isLiked = IfProductLiked(product);

  const images = product?.images || [product?.image];

  const handleImageClick = (index) => {
    const img = new Image();
    img.src = images[index];
    img.onload = () => {
      setPhotoIndex(index);
      setIsOpen(true);
    };
  };

  return (
    <div className='w-full xl:h-screen relative text-mainText'>
      <img src={ product?.titleImage ? product?.titleImage : "/images/user.jpg" } alt={ product?.name }
        className='w-full hidden xl:inline-block h-full object-cover' onClick={ () => setIsOpen(true) } />
      <div className='xl:bg-main bg-main flex-colo xl:bg-opacity-100 xl:absolute top-0 left-0 right-0 bottom-0'>
        <div className='container px-3 mx-auto 2xl:px-4 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8'>
          <div className='xl:col-span-1 w-full xl:order-none order-last h-header bg-main border border-main rounded-lg overflow-hidden'>
            <img src={ product?.image ? product?.image : "/images/user.jpg" } alt={ product?.name } className='w-full h-100 object-cover' onClick={ () => handleImageClick(0) } />          </div>
          <div className='col-span-2 md:grid grid-cols-3 gap-4 items-center'>
            <div className='col-span-3 flex flex-col gap-10'>
              {/* Title */ }
              <h1 className='xl:text-4xl capitalize font-sans text-2xl font-bold'>
                { product?.name }
              </h1>
              {/* flex items */ }
              <div className='flex items-center gap-4 font-medium text-mainText'>
                <div className='flex-colo bg-subMain text-xs px-2 py-1'>
                  <dic className='text-main'>Тип: </dic>
                </div>
                <FlexProductItems product={ product && product } />
              </div>
              {/* description */ }
              <p className='text-mainText text-sm leading-7'>{ product?.desc }</p>

              <div className='flex p-4 gap-20 bg-main border border-main rounded-lg'>
                {/* share */ }
                <div className=' '>
                  <button onClick={ () => setModalOpen(true) } className='w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20'>
                    <FaShareAlt />
                  </button>
                </div>

                {/* ratings */ }
                <div className='flex-grow flex items-center btn-flex relative mb-6 text-lg gap-6 text-star'>
                  <Rating value={ product?.rate } />
                  <button
                    onClick={ () => LikeProduct(product, dispatch, userInfo) }
                    disabled={ isLiked || isLoading }
                    className={ `h-10 w-10 text-sm flex-colo transitions
       ${isLiked ? "bg-red-500 border-white" : "bg-subMain text-mainText "}
            hover:bg-transparent rounded-full border-2 border-subMain text-mainText`}
                  >
                    <div className='text-md'>< GrBasket className='h-5 w-5' /></div>
                  </button>
                </div>
              </div>
            </div>
            <div className='col-span-2 md:mt-0 mt-2 flex justify-end'>
            </div>
          </div>
        </div>
      </div>

      { isOpen && (
        <Lightbox
          mainSrc={ images[photoIndex] }
          nextSrc={ images[(photoIndex + 1) % images.length] }
          prevSrc={ images[(photoIndex + images.length - 1) % images.length] }
          onCloseRequest={ () => setIsOpen(false) }
          onMovePrevRequest={ () => setPhotoIndex((photoIndex + images.length - 1) % images.length) }
          onMoveNextRequest={ () => setPhotoIndex((photoIndex + 1) % images.length) }
        />
      ) }
    </div>
  );
}

export default ProductInfo;
