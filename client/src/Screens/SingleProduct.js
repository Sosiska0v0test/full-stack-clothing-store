import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useParams } from 'react-router-dom';
import ProductInfo from '../Components/Single/ProductInfo';
import ProductCasts from '../Components/Single/ProductCasts';
import ProductsRates from '../Components/Single/ProductsRates';
import Titles from '../Components/Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Product from '../Components/Product';
import ShareProductModal from '../Components/Modals/ShareModal';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByIdAction } from '../Redux/Actions/ProductsActions';
import Loader from '../Components/Notification/Loader';
import { SidebarContext } from '../Context/DrawerContext';
import { MdOutlineTravelExplore } from 'react-icons/md';

function SingleProduct() {
  const [modalOpen, setModalOpen] = useState(false);
  const { progress } = useContext(SidebarContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  // use Selector
  const { isLoading, isError, product } = useSelector(
    (state) => state.getProductById
  );
  const { products } = useSelector((state) => state.getAllProducts);
  // related products
  const RelatedProducts = products?.filter((m) => m.category === product?.category);

  // use Effect
  useEffect(() => {
    // product id
    dispatch(getProductByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      { isLoading ? (
        <div className={ sameClass }>
          <Loader />
        </div>
      ) : isError ? (
        <div className={ sameClass }>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <MdOutlineTravelExplore />
          </div>
          <p className="text-border text-sm">Щось пішло не так😯</p>
        </div>
      ) : (
        <>
          <ShareProductModal
            modalOpen={ modalOpen }
            setModalOpen={ setModalOpen }
            product={ product }
          />
          <ProductInfo
            product={ product }
            setModalOpen={ setModalOpen }
            progress={ progress }
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <ProductCasts product={ product } />
            {/* rate */ }
            <ProductsRates product={ product } />
            {/* related */ }
            { RelatedProducts?.length > 0 && (
              <div className="my-16">
                <Titles title="Схожі товари" Icon={ BsCollectionFill } />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-7 2xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
                  { RelatedProducts?.map((product) => (
                    <Product key={ product?._id } product={ product } />
                  )) }
                </div>
              </div>
            ) }
          </div>
        </>
      ) }
    </Layout>
  );
}

export default SingleProduct;



