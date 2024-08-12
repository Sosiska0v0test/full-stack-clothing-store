import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import AboutUs from './Screens/AboutUs';
import NotFound from './Screens/NotFound';
import ContactUs from './Screens/ContactUs';
import ProductsPage from './Screens/Products';
import SingleProduct from './Screens/SingleProduct';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from './Screens/Dashboard/Profile';
import Aos from 'aos';
import Password from './Screens/Dashboard/Password';
import FavoritesProducts from './Screens/Dashboard/FavoritesProducts';
import ProductList from './Screens/Dashboard/Admin/ProductList';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import Categories from './Screens/Dashboard/Admin/Categories';
import Users from './Screens/Dashboard/Admin/Users';
import AddProducts from './Screens/Dashboard/Admin/AddProducts';
import ScrollOnTop from './ScrollOnTop';
import ToastContainer from './Components/Notification/ToastContainer';
import { AdminProtectionRouter, ProtectedRouter } from './ProtectedRouter';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesAction } from './Redux/Actions/CategoriesActions';
import { getAllProductsAction } from './Redux/Actions/ProductsActions';
import { getFavoriteProductsAction } from './Redux/Actions/userActions';
import toast from 'react-hot-toast';
import EditProduct from './Screens/Dashboard/Admin/EditProduct';
import DrawerContext from './Context/DrawerContext';
import OrderSuccess from './Screens/Dashboard/OrderSuccess';
import CategoriesPage from './Screens/CategoriesPage';

function App() {
	Aos.init();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { isError, isSuccess } = useSelector((state) => state.userLikeProduct);
	const { isError: catError } = useSelector((state) => state.categoryGetAll);

	useEffect(() => {
		dispatch(getAllCategoriesAction());
		dispatch(getAllProductsAction({}));
		if (userInfo) {
			dispatch(getFavoriteProductsAction());
		}
		if (isError || catError) {
			toast.error(isError || catError);
			dispatch({ type: "LIKE_PRODUCT_RESET" });
		}
		if (isSuccess) {
			dispatch({ type: "LIKE_PRODUCT_RESET" });
		}
	}, [dispatch, userInfo, isError, catError, isSuccess]);

	return (
		<>
			<BrowserRouter>
				<ToastContainer />
				<DrawerContext>
					<ScrollOnTop>
						<Routes>
							{/* Public routes */ }
							<Route path='/' element={ <HomeScreen /> } />
							<Route path='/about-us' element={ <AboutUs /> } />
							<Route path='/contact-us' element={ <ContactUs /> } />
							<Route path='/categoriespage' element={ <CategoriesPage /> } />
							<Route path='/products' element={ <ProductsPage /> } />
							<Route path="/products/:search" element={ <ProductsPage /> } />
							<Route path='/product/:id' element={ <SingleProduct /> } />
							<Route path='/login' element={ <Login /> } />
							<Route path='/register' element={ <Register /> } />
							<Route path='' element={ <NotFound /> } />

							{/* Private routes */ }
							<Route element={ <ProtectedRouter /> }>
								<Route path='/profile' element={ <Profile /> } />
								<Route path='/password' element={ <Password /> } />
								<Route path='/favorites' element={ <FavoritesProducts /> } />
								<Route path='/order-success' element={ <OrderSuccess /> } />

								{/* Admin routes */ }
								<Route element={ <AdminProtectionRouter /> }>
									<Route path='/productslist' element={ <ProductList /> } />
									<Route path='/dashboard' element={ <Dashboard /> } />
									<Route path='/categories' element={ <Categories /> } />
									<Route path='/users' element={ <Users /> } />
									<Route path='/addproduct' element={ <AddProducts /> } />
									<Route path='/edit/:id' element={ <EditProduct /> } />
								</Route>
							</Route>
						</Routes>
					</ScrollOnTop>
				</DrawerContext>
			</BrowserRouter>
		</>
	);
}

export default App;
