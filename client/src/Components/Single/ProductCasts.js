import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Titles from '../Titles';
import { IoMdPhotos } from "react-icons/io";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function ProductCasts({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const images = product?.casts?.map((cast) => cast.image) || [];

  const handleImageClick = (index) => {
    const img = new Image();
    img.src = images[index];
    img.onload = () => {
      setPhotoIndex(index);
      setIsOpen(true);
    };
  };

  return (
    product?.casts?.length > 0 && (
      <div className='my-12'>
        <Titles title='Фото товару' Icon={ IoMdPhotos } />
        <div className='mt-10'>
          <Swiper
            autoplay={ { delay: 1000, disableOnInteraction: false } }
            speed={ 1000 }
            modules={ [Autoplay] }
            spaceBetween={ 10 }
            breakpoints={ {
              0: { slidesPerView: 1 },
              400: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5, spaceBetween: 30 },
            } }
          >
            { product.casts.map((cast, index) => (
              <SwiperSlide key={ cast._id }>
                <div
                  className='w-full p-3 italic text-xs text-text rounded flex-colo bg-dry border border-main'
                  onClick={ () => handleImageClick(index) }
                >
                  <img
                    src={ cast.image ? cast.image : '/images/user.jpg' }
                    alt={ cast.name }
                    className='w-full h-64 object-cover rounded mb-4 cursor-pointer'
                  />
                  <p>{ cast.name }</p>
                </div>
              </SwiperSlide>
            )) }
          </Swiper>
        </div>

        { isOpen && (
          <Lightbox
            mainSrc={ images[photoIndex] }
            nextSrc={ images[(photoIndex + 1) % images.length] }
            prevSrc={ images[(photoIndex + images.length - 1) % images.length] }
            onCloseRequest={ () => setIsOpen(false) }
            onMovePrevRequest={ () =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={ () =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        ) }
      </div>
    )
  );
}

export default ProductCasts;
