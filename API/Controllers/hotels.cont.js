
import Hotel from '../models/HotelModel.js';
import Room from '../models/RoomModel.js'
import { createError } from '../utils/errors.js'

//CREATE
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}
//UPDATE
export async function updateHotel(req, res, next) {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateHotel)
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}
//DELETE
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "Delete Hotel Success" })
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}
//DET
export async function getHotel(req, res, next) {
    try {
        const findHotel = await Hotel.findById(req.params.id)
        res.status(200).json(findHotel)
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}
//GET ALL
export async function getAllHotels(req, res, next) {
    const { min, max, ...other } = req.query
    try {
        const findHotels = await Hotel.find({ ...other, cheapestPrice: { $gte: min | 1, $lte: max || 1000 } }).limit(req.query.limit)
        res.status(200).json(findHotels)
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}
export async function countByCity(req, res, next) {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map((city) => {   // because i'll find multiple items 
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}
export async function countByType(req, res, next) {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villas" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })

        res.status(200).json([
            { type: 'hotel', count: hotelCount },
            { type: 'apartment', count: apartmentCount },
            { type: 'resort', count: resortCount },
            { type: 'villas', count: villaCount },
            { type: 'cabin', count: cabinCount },
        ])
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel  = await Hotel.findById(req.params.id)
        const list= await Promise.all(hotel.rooms.map((room)=>{
            return Room.findById(room);
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}