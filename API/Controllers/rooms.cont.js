import Room from "../models/RoomModel.js"
import Hotel from "../models/HotelModel.js"

import { createError } from "../utils/errors.js"

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)

    try {
        const saveRoom = await newRoom.save();
        console.log(saveRoom);
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: saveRoom._id } })
        } catch (error) {
            next(error)
        }
        res.status(200).json({ Msg: 'Room created succfully', Rooms: saveRoom });
    } catch (error) {
        next(error)
    }
}

//UPDATE
export async function updateRoom(req, res, next) {
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateRoom)
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}

export async function updateRoomAvailability(req, res, next) {
    try {
        await Room.updateOne({ "roomNumbers._id": req.params.id },
            {
                //to update nested properties
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            })
        res.status(200).json("Room status has been Updated",)
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}

//DELETE
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });
            console.log(req.params.hotelid);
        } catch (err) {
            next(err);
        }
        res.status(200).json("Room has been deleted.");
    } catch (err) {
        next(err);
    }
};
//DET
export async function getRoom(req, res, next) {
    try {
        const findRoom = await Room.findById(req.params.id)
        res.status(200).json( findRoom )
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}
//GET ALL
export async function getAllRooms(req, res, next) {
    try {
        const findRooms = await Room.find({})
        res.status(200).json( findRooms )
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}