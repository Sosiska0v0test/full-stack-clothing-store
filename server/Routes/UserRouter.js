import express from "express";
import { addLikedProduct, changeUserPassword, deleteLikedProducts, removeLikedProduct, deleteUser, deleteUserProfile, getLikedProducts, getUsers, loginUser, registerUser, updateUserProfile } from "../controller/UserController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();
// +++++++++ Public Routes +++++++++

router.post('/', registerUser);
router.post('/login', loginUser);

// +++++++++ PRIVATE ROUTES +++++++++

router.put('/', protect, updateUserProfile);
router.delete('/', protect, deleteUserProfile);
router.put('/password', protect, changeUserPassword);
router.get('/favorites', protect, getLikedProducts);
router.post('/favorites', protect, addLikedProduct);
router.delete('/favorites', protect, deleteLikedProducts);
router.route('/favorites/:id').delete(protect, removeLikedProduct);


// +++++++++ ADMIN ROUTES +++++++++
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser);

export default router;