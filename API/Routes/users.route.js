import express from "express";
const router = express.Router();

import { updateUser, deleteUser, getUser, getAllUsers } from '../Controllers/users.cont.js'
import { verifyToken, verifyUser,verifyAdmin } from '../utils/verifyToken.js'

//GET All
router.get('/', verifyAdmin, getAllUsers);
//GET
router.get('/:id', verifyUser, getUser);
//Update
router.put('/:id', verifyUser, updateUser);
//Delete
router.delete('/:id', verifyUser, deleteUser);

export default router
// module.exports  = router
