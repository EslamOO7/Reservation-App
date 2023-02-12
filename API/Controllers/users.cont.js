import User from '../models/UserModel.js';
import {createError} from '../utils/errors.js'


//UPDATE
export async function updateUser(req, res, next) {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateUser)
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}
//DELETE
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "Delete User Success" })
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}
//DET
export async function getUser(req, res, next) {
    try {
        const findUser = await User.findById(req.params.id)
        res.status(200).json(findUser )
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}
//GET ALL
export async function getAllUsers(req, res, next) {
    try {
        const findUsers = await User.find({})
        res.status(200).json( findUsers )
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
}