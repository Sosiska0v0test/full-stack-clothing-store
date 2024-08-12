import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Filters from '../Components/Filters';
import Layout from '../Layout/Layout';
import Product from '../Components/Product';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';
import Loader from '../Components/Notification/Loader';
import { MdOutlineTravelExplore } from "react-icons/md";
import { getAllProductsAction } from '../Redux/Actions/ProductsActions';
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  SizeData,
  RatesData,
  PriseData,
  MaterialData,
  GenderData,
} from '../Data/FilterData';

function ProductsPage() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [category, setCategory] = useState({ title: 'Усі категорії' });
  const [material, setMaterial] = useState(MaterialData[0]);
  const [prise, setPrise] = useState(PriseData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [size, setSize] = useState(SizeData[0]);
  const [gender, setGender] = useState(GenderData[0]);
  const [showFilters, setShowFilters] = useState(false);

  const sameClass =
    'text-mainText py-2 px-4 rounded font-semibold border-2 border-subMain hover';
  const { isLoading, isError, products, pages, page } = useSelector(
    (state) => state.getAllProducts
  );

  // get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);

  // queries
  const queries = useMemo(() => {
    const query = {
      category: category?.title === 'Усі категорії' ? '' : category?.title,
      prise: prise?.title.replace(/\D/g, ''),
      size: size?.title === 'Розмір' ? '' : size?.title,
      gender: gender?.title === 'Для кого' ? '' : gender?.title,
      rate: rates?.title.replace(/\D/g, ''),
      material: material?.title.replace(/\D/g, ''),
      search: search ? search : '',
    };
    return query;
  }, [category, prise, size, gender, rates, material, search]);

  // useEffect
  useEffect(() => {
    const query = {
      category: category?.title === 'Усі категорії' ? '' : category?.title,
      prise: prise?.title.replace(/\D/g, ''),
      size: size?.title === 'Розмір' ? '' : size?.title,
      gender: gender?.title === 'Для кого' ? '' : gender?.title,
      rate: rates?.title.replace(/\D/g, ''),
      material: material?.title.replace(/\D/g, ''),
      search: search ? search : '',
    };
    dispatch(getAllProductsAction(query));
  }, [dispatch, category, prise, size, gender, rates, material, search]);

  // Handle gender change to show/hide additional filters
  useEffect(() => {
    if (gender.title !== 'Для кого') {
      setShowFilters(true);
    } else {
      setShowFilters(false);
    }
  }, [gender]);

  // pagination next and prev pages
  const nextPage = () => {
    dispatch(
      getAllProductsAction({
        ...queries,
        pageNumber: page + 1,
      })
    );
  };
  const prevPage = () => {
    dispatch(
      getAllProductsAction({
        ...queries,
        pageNumber: page - 1,
      })
    );
  };

  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    size: size,
    setSize: setSize,
    gender: gender,
    setGender: setGender,
    rates: rates,
    setRates: setRates,
    prise: prise,
    setPrise: setPrise,
    material: material,
    setMaterial: setMaterial,
    showFilters: showFilters
  };

  // errors
  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
  }, [isError]);

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        {/* Back Button */ }
        <button
          onClick={ () => navigate(-1) }
          className="mb-4 pt-2 px-4 bg-main text-black rounded flex items-center"
        >
          <IoMdArrowRoundBack className="mr-2" />
          Назад
        </button>
        <Filters data={ datas } />
        { gender.title !== 'Для кого' && (
          <>
            <p className="text-lg font-medium my-6">
              Всього{ ' ' }
              <span className="font-bold text-subMain">
                { products ? products?.length : 0 }
              </span>{ ' ' }
              продуктів знайдено { search && `для "${search}"` }
            </p>
            { isLoading ? (
              <div className="w-full gap-6 flex-colo min-h-screen">
                <Loader />
              </div>
            ) : products?.length > 0 ? (
              <>
                <div className='grid sm:mt-12 mt-7 xl:grid-cols-7 2xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-3 h-86 w-full'>
                  { products.map((product, index) => (
                    <Product key={ index } product={ product } />
                  )) }
                </div>
                {/* Loading More */ }
                <div className="w-full flex-rows gap-6 md:my-20 my-10 ">
                  <button
                    onClick={ prevPage }
                    disabled={ page === 1 }
                    className={ sameClass }
                  >
                    <TbPlayerTrackPrev className="text-xl hover:text-main" />
                  </button>
                  <button
                    onClick={ nextPage }
                    disabled={ page === pages }
                    className={ sameClass }
                  >
                    <TbPlayerTrackNext className="text-xl hover:text-main" />
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full gap-6 flex-colo min-h-screen">
                <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-white text-4xl flex-colo">
                  <MdOutlineTravelExplore />
                </div>
                <p className="text-mainText text-sm">
                  Оберіть категорію
                </p>
              </div>
            ) }
          </>
        ) }
      </div>
    </Layout>
  );
}

export default ProductsPage;
