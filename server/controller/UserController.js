import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middlewares/Auth.js';
import User from '../models/UserModels.js';

//@desc Register user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
	const { fullName, email, password, image } = req.body;
	try {
		const userExists = await User.findOne({ email });
		// check if user exists
		if (userExists) {
			res.status(400);
			throw new Error('User already exists');
		}

		// hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// create user in DB
		const user = await User.create({
			fullName,
			email,
			password: hashedPassword,
			image,
		});

		// if user created successfully send user data and token to client
		if (user) {
			res.status(201).json({
				_id: user._id,
				fullName: user.fullName,
				email: user.email,
				image: user.image,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			});
		} else {
			res.status(400);
			throw new Error('Invalid user data');
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	try {
		//find user in DB
		const user = await User.findOne({ email });
		//if user exists, compare password with hashed password then send user data and token to client
		if (user && (await bcrypt.compare(password, user.password))) { //await bcrypt.compare(password, user.password)
			res.json({
				_id: user._id,
				fullName: user.fullName,
				email: user.email,
				image: user.image,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			});
			// if password does not match, send error message
		} else {
			res.status(401);
			throw new Error('Invalid email or password');
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// **************** PRIVATE CONTROLLERS ****************

//@desc Update user profile
//@route PUT /api/users/login
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const { fullName, email, image } = req.body;
	try {
		//find user in DB 
		const user = await User.findById(req.user._id);
		//if user exists update user data and save it in DB
		if (user) {
			user.fullName = fullName || user.fullName;
			user.email = email || user.email;
			user.image = image || user.image;
			const updatedUser = await user.save();
			//send updated user data and token to client
			res.json({
				_id: updatedUser._id,
				fullName: updatedUser.fullName,
				email: updatedUser.email,
				image: updatedUser.image,
				isAdmin: updatedUser.isAdmin,
				token: generateToken(updatedUser._id),
			});
		}
		// else send error message
		else {
			res.status(404);
			throw new Error('User not found');
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
})

//@desc Delete user profile
//@route DELETE /api/users
//@access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
	try {
		//find user in DB 
		const user = await User.findById(req.user._id);
		//if user exists delete user from DB
		if (user) {
			//if user is admin throw error message
			if (user.isAdmin) {
				res.status(400);
				throw new Error("Can't delete admin user")
			}
			// else delete user from DB 
			await user.deleteOne();
			res.json({ message: 'User deleted successfully' })
		}
		// else send error message
		else {
			res.status(404);
			throw new Error('User not found')
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
})

//@desc Change user password
//@route PUT /api/users/password
//@access Private
const changeUserPassword = asyncHandler(async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	try {
		// find user in DB 
		const user = await User.findById(req.user._id);
		// if user exists, compare old password with the stored password
		if (user && user.password === oldPassword) {
			// update user password without hashing
			user.password = newPassword;
			// save user in the database
			await user.save()
			res.json({ message: "Password changed!!!" });
		} else {
			// send error message if old password is invalid
			res.status(401).json({ message: "Invalid old password" });
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//@desc Get all  liked Products
//@route PUT /api/users/favorites
//@access Private
const getLikedProducts = asyncHandler(async (req, res) => {
	try {
		// find user in DB
		const user = await User.findById(req.user._id).populate("likedProducts");
		// if user exists send liked Products to client
		if (user) {
			res.json(user.likedProducts)
		}
		//else send error message
		else {
			res.status(404);
			throw new Error("User not found");
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
})

//@desc Add Product to liked Product
//@route POST /api/users/favorites
//@access Private
const addLikedProduct = asyncHandler(async (req, res) => {
	const { productId } = req.body;
	try {
		//find user in DB 
		const user = await User.findById(req.user._id);
		//if user exists add Product to liked Products and save it in DB
		if (user) {
			//check if Product already liked
			//if Product already liked send error message
			if (user.likedProducts.includes(productId)) {
				res.status(400);
				throw new Error("Product already liked");
			}
			//else add Product to liked Product and save it in DB
			user.likedProducts.push(productId);
			await user.save();
			res.json(user.likedProducts);
		}
		//else send error message
		else {
			res.status(404);
			throw new Error("Product not found");
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
})

//@desc Delete all liked Product
//@route DELETE /api/users/favorites
//@access Private
const deleteLikedProducts = asyncHandler(async (req, res) => {
	try {
		//find user in DB
		const user = await User.findById(req.user._id);
		//if user exests delete all liked Products and save it in DB
		if (user) {
			user.likedProducts = [];
			await user.save();
			res.json({ message: "Your favorites products deleted successfully" });
		}
		//else send error message
		else {
			res.status(404);
			throw new Error("User not found");
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//@desc Remove Product from liked Products
//@route DELETE /api/users/favorites/:id
//@access Private
const removeLikedProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(req.user._id);
		if (user) {
			user.likedProducts = user.likedProducts.filter(
				(productId) => productId.toString() !== id
			);
			await user.save();
			res.json(user.likedProducts);
		} else {
			res.status(404);
			throw new Error("User not found");
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});


// **************** ADMIN CONTROLLERS ****************

//@desc Get all users
//@route GET /api/users
//@access Private
const getUsers = asyncHandler(async (req, res) => {
	try {
		//find all users in DB
		const users = await User.find({});
		res.json(users);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//@desc Delete user
//@route DELETE /api/users/:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
	try {
		//find user in DB
		const user = await User.findById(req.params.id);
		//if user exists delete user from DB
		if (user) {
			//if user is addmin throw error message
			if (user.isAdmin) {
				res.status(400);
				throw new Error("Can't delete admin user");
			}
			//else delete user from DB 
			await user.deleteOne();
			res.json({ message: "User deleted successfully" });
		}
		//else send error message
		else {
			res.status(404);
			throw new Error("User not found");
		}
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

export { registerUser, loginUser, updateUserProfile, deleteUserProfile, changeUserPassword, getLikedProducts, addLikedProduct, deleteLikedProducts, removeLikedProduct, getUsers, deleteUser };
