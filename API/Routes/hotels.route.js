import express from "express";
const router = express.Router();

import { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels ,countByCity,countByType,getHotelRooms} from '../Controllers/hotels.cont.js'
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js'

//CREATE
router.post('/', verifyAdmin, createHotel)
//UPDATE
router.put('/:id', verifyAdmin, updateHotel)
//DELETE
router.delete('/:id', verifyAdmin, deleteHotel)
//GET 
router.get('/find/:id', getHotel);
//GET ALL
router.get('/', getAllHotels);
router.get('/countByCity',countByCity);
router.get('/countByType',countByType);
router.get('/room/:id',getHotelRooms)

export default router