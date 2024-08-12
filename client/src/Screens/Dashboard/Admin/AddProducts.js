import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar';
import { Input, Message, Select } from '../../../Components/UsedInputs';
import Uploder from '../../../Components/Uploder';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { ImUpload } from 'react-icons/im';
import CastsModal from '../../../Components/Modals/CastsModal';
import { createProductAction, removeCastAction } from '../../../Redux/Actions/ProductsActions';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { productValidation } from "../../../Components/Validation/ProductValidation";
import { InlineError } from "./../../../Components/Notification/Error";
import { ImagePreview } from "./../../../Components/imagePreview";
import { SizeData, GenderData, MaterialData } from '../../../Data/FilterData';

function AddProducts() {
	const [modalOpen, setModalOpen] = useState(false);
	const [cast, setCast] = useState(null);
	const [imageWithoutTitle, setImageWithoutTitle] = useState("");
	const [imageTitle, setImageTitle] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { categories } = useSelector((state) => state.categoryGetAll);
	const { isLoading, isError, isSuccess } = useSelector(
		(state) => state.createProduct
	);
	const { casts } = useSelector((state) => state.casts);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(productValidation),
	});

	const onSubmit = (data) => {
		dispatch(
			createProductAction({
				...data,
				image: imageWithoutTitle,
				titleImage: imageTitle,
				casts,
			})
		);
	};

	const deleteCastHandler = (id) => {
		dispatch(removeCastAction(id));
		toast.success("Фото видалено!");
	};

	useEffect(() => {
		if (modalOpen === false) {
			setCast();
		}

		if (isSuccess) {
			reset({
				name: "",
				prise: 0,
				size: "",
				gender: "",
				material: 0,
				stock: 0,
				category: "",
				desc: "",
			});
			setImageTitle("");
			setImageWithoutTitle("");
			dispatch({ type: "CREATE_PRODUCT_RESET" });
			navigate("/addProduct");
		}

		if (isError) {
			toast.error("Щось пішло не так");
			dispatch({ type: "CREATE_PRODUCT_RESET" });
		}
	}, [modalOpen, isSuccess, isError, dispatch, reset, navigate]);

	return (
		<SideBar>
			<CastsModal
				modalOpen={ modalOpen }
				setModalOpen={ setModalOpen }
				cast={ cast }
			/>
			<div className='flex  flex-col gap-6'>
				<h2 className='text-xl text-white font-bold'>Додати товар</h2>
				<div className='w-full  grid md:grid-cols-2 gap-6'>
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
				<div className='w-full grid md:grid-cols-2 gap-6'>
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
					disabled={ isLoading }
					onClick={ handleSubmit(onSubmit) }
					className="bg-subMain w-full flex-rows gap-6 font-medium text-main py-4 rounded"
				>
					{ isLoading ? (
						"Зачекайте, йде завантаження..."
					) : (
						<>
							<ImUpload /> Опублікувати
						</>
					) }
				</button>
			</div>
		</SideBar>
	);
}

export default AddProducts;
