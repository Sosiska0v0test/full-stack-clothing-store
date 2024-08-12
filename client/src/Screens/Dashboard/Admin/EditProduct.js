import React, { useEffect, useState } from "react";
import Uploder from "../../../Components/Uploder";
import { Input, Message, Select } from "../../../Components/UsedInputs";
import SideBar from "../SideBar";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../Components/Modals/CastsModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productValidation } from "../../../Components/Validation/ProductValidation";
import {
  getProductByIdAction,
  removeCastAction,
  updateProductAction,
} from "../../../Redux/Actions/ProductsActions";
import toast from "react-hot-toast";
import { ImagePreview } from "../../../Components/imagePreview";
import { GrBasket } from "react-icons/gr";
import Loader from "../../../Components/Notification/Loader";
import { InlineError } from "../../../Components/Notification/Error";
import { SizeData, GenderData, MaterialData } from '../../../Data/FilterData';

function EditProduct() {
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // use Selectors
  const { categories } = useSelector((state) => state.categoryGetAll);
  const { isLoading, isError, product } = useSelector(
    (state) => state.getProductById
  );
  const {
    isLoading: editLoading,
    isError: editError,
    isSuccess,
  } = useSelector((state) => state.updateProduct);
  const { casts } = useSelector((state) => state.casts);


  // validate product
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(
      updateProductAction(product?._id, {
        ...data,
        image: imageWithoutTitle,
        titleImage: imageTitle,
        casts: casts.length > 0 ? casts : product?.casts,
      })
    );
  };

  // delete cast handler
  const deleteCastHandler = (id) => {
    dispatch(removeCastAction(id));
    toast.success("Фото успішно видалено");
  };

  useEffect(() => {
    if (product?._id !== id) {
      dispatch(getProductByIdAction(id));
    } else {
      setValue("name", product?.name);
      setValue("prise", product?.prise);
      setValue("size", product?.size);
      setValue("gender", product?.gender);
      setValue("material", product?.material);
      setValue("stock", product?.stock);
      setValue("category", product?.category);
      setValue("desc", product?.desc);
      setImageWithoutTitle(product?.image);
      setImageTitle(product?.titleImage);

    }
    // if modal is false then reset cast
    if (modalOpen === false) {
      setCast();
    }
    // if its success then reset form and navigate to editproduct
    if (isSuccess) {
      dispatch({ type: "UPDATE_PRODUCT_RESET" });
      navigate(`/edit/${id}`);
    }
    // if error then show error
    if (editError) {
      toast.error("Щось пішло не так😯");
      dispatch({ type: "UPDATE_PRODUCT_RESET" });
    }
  }, [
    dispatch,
    id,
    product,
    modalOpen,
    setValue,
    isSuccess,
    editError,
    navigate,
  ]);

  return (
    <SideBar>
      <CastsModal
        modalOpen={ modalOpen }
        setModalOpen={ setModalOpen }
        cast={ cast }
      />
      { isLoading ? (
        <Loader />
      ) : isError ? (
        <div className={ sameClass }>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <GrBasket />
          </div>
          <p className="text-border text-sm">Щось пішло не так😯</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">Редагувати "{ product?.name }"</h2>
          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="w-full ">
              <Input
                label="Назва товару"
                placeholder="Блузка"
                type="text"
                bg={ true }
                name="name"
                register={ register("name") }
              />
              { errors.name && <InlineError text={ errors.name.message } /> }
            </div>
            <div className="w-full">
              <Input
                label="Ціна"
                placeholder="200"
                type="number"
                bg={ true }
                name="prise"
                register={ register("prise") }
              />
              { errors.prise && <InlineError text={ errors.prise.message } /> }
            </div>
          </div>
          <div className="w-full grid md:grid-cols-2 gap-6">
            <div className="w-full">
              <Select
                label="Розмір"
                options={ SizeData }
                name="size"
                register={ { ...register("size") } }
              />
              { errors.size && <InlineError text={ errors.size.message } /> }
            </div>
            <div className="w-full">
              <Select
                label="Для кого"
                options={ GenderData }
                name="gender"
                register={ { ...register("gender") } }
              />
              { errors.gender && <InlineError text={ errors.gender.message } /> }
            </div>
            <div className="w-full">
              <Select
                label="Матеріал"
                options={ MaterialData }
                name="material"
                register={ { ...register("material") } }
              />
              { errors.material && <InlineError text={ errors.material.message } /> }
            </div>
            <div className="w-full">
              <Input
                label="Кількість товару на складі (в одиницях)"
                placeholder="12"
                type="number"
                bg={ true }
                name="stock"
                register={ register("stock") }
              />
              { errors.stock && <InlineError text={ errors.stock.message } /> }
            </div>
          </div>
          <div className='w-full grid md:grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <p className='text-white font-semibold text-sm'>
                Фото товару
              </p>
              <Uploder setImageUrl={ setImageWithoutTitle } />
              <ImagePreview image={ imageWithoutTitle } name="imageWithouTitle" />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-white font-semibold text-sm'>
                Банер
              </p>
              <Uploder setImageUrl={ setImageTitle } />
              <ImagePreview image={ imageTitle } name="imageTitle" />
            </div>
          </div>
          <div className="w-full">
            <Message
              label="Опис товару"
              placeholder="Напишіть найголовніше про товару..."
              name="desc"
              register={ { ...register("desc") } }
            />
            { errors.desc && <InlineError text={ errors.desc.message } /> }
          </div>
          <div className="text-sm w-full">
            <Select
              label="Категорія"
              options={ categories?.length > 0 ? categories : [] }
              name="category"
              register={ { ...register("category") } }
            />
            { errors.category && <InlineError text={ errors.category.message } /> }
          </div>
          <div className="w-full  grid lg:grid-cols-2 gap-6 items-start ">
            <button
              onClick={ () => setModalOpen(true) }
              className="w-full py-4 bg-main border border-subMain border-dashed text-mainText rounded"
            >
              Додати фото товару
            </button>
            <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
              { casts?.length > 0 &&
                casts?.map((user) => (
                  <div
                    key={ user.id }
                    className="p-2 italic text-xs text-mainText rounded flex-colo bg-main"
                  >
                    <img
                      src={ `${user?.image ? user.image : "/images/user.jpg"}` }
                      alt={ user.name }
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <p>{ user.name }</p>
                    <div className="flex-rows mt-2 w-full gap-2">
                      <button
                        onClick={ () => deleteCastHandler(user?.id) }
                        className="w-6 h-6 flex-colo bg-dry text-red-500 rounded"
                      >
                        <MdDelete />
                      </button>
                      <button
                        onClick={ () => {
                          setCast(user);
                          setModalOpen(true);
                        } }
                        className="w-6 h-6 flex-colo bg-dry  text-green-600 rounded"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                )) }
            </div>
          </div>
          <button
            disabled={ editLoading }
            onClick={ handleSubmit(onSubmit) }
            className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded"
          >
            { editLoading ? (
              "Updating..."
            ) : (
              <>
                <ImUpload /> Оновити товар
              </>
            ) }
          </button>
        </div>
      ) }
    </SideBar>
  );
}

export default EditProduct;
