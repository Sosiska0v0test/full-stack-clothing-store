import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { likeProductAction } from "../Redux/Actions/userActions";

// check if product is added to favorites
const IfProductLiked = (product) => {
  const { likedProducts } = useSelector((state) => state.userGetFavoriteProducts);
  return likedProducts?.find((likedProducts) => likedProducts?._id === product?._id);
};

// like product functionalty
const LikeProduct = (product, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Спершу необхідно авторизуватися, щоб додавати товари до кошику")
    : dispatch(
      likeProductAction({
        productId: product._id,
      })
    );
};

export { IfProductLiked, LikeProduct };
