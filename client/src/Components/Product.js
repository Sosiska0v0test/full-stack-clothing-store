import React from 'react'
import { Link } from 'react-router-dom'
import { GrBasket } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { IfProductLiked, LikeProduct } from '../Context/Functionalities';

function Product({ product }) {
  const { isLoading } = useSelector((state) => state.userLikeProduct);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function
  const isLiked = IfProductLiked(product);

  return (
    <>
      <div className='p-3 bg-main rounded-lg hover:scale-95 transitions relative overflow-hidden'>
        <Link to={ `/product/${product?._id}` } className='w-full'>
          <img src={ product?.image ? product?.image : "/images/user.jpg" } alt={ product?.name } className='h-86 w-full rounded-lg object-cover' />
        </Link>
        <div className='absolute flex-btn gap-2 bottom-0 right-0 left-2 bg-main bg-opacity-60 text-mainText px-10 py-5'>
          <h3 className='font-semibold truncate'>{ product?.name }</h3>

          <button
            onClick={ () => LikeProduct(product, dispatch, userInfo) }
            disabled={ isLiked || isLoading }
            className={ `min-h-10 min-w-10  text-sm flex-colo transitions
           ${isLiked ? "bg-red-500 border-subMain" : "bg-white text-mainText "}
            hover:bg-transparent rounded-full border-2 border-subMain text-mainText`}
          >
            <div className='text-md'>< GrBasket className='h-5 w-5' /></div>
          </button>

        </div>
      </div>
    </>
  )
}

export default Product
