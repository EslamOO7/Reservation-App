import express from "express";
const router = express.Router();

import { createRoom, updateRoom, deleteRoom, getAllRooms, getRoom,updateRoomAvailability } from '../Controllers/rooms.cont.js'
import { verifyAdmin } from '../utils/verifyToken.js'

//CREATE
router.post('/:hotelid',verifyAdmin ,createRoom)
//GET
router.get('/:id', getRoom)
//GET ALL
router.get('/', getAllRooms);
//UPDATE
router.put('/:id/',verifyAdmin, updateRoom);
router.put('/availability/:id',updateRoomAvailability)
//DELETE
router.delete('/:id/:hotelid',verifyAdmin, deleteRoom);

export default router