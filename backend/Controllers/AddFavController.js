const asyncHandler =require('express-async-handler')
const Favorite=require('../Models/myFavoritiesModel');
const router = require('../Routes/userRoutes');

const addFavorite = asyncHandler(async (req,res)=>{ 
    const user=req.user;
    const data=req.body;
    console.log("----------****----------")
    console.log(data)
    console.log("----------****----------")
    try {
        const response=await Favorite.create({
            userId:user._id,
            itemId:data.itemId,
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error(error)
    }
})

const removeFavorite = asyncHandler(async (req,res)=>{
    const user=req.user;
    const data=req.body;
    console.log("----------****----------")
    console.log(data)
    console.log("----------****----------")
    try {
        const response=await Favorite.deleteOne({
            userId:user._id,
            itemId:data.itemId
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error(error)
    }
})

const getFavorites = asyncHandler(async (req,res)=>{
    const user=req.user;
    const data=req.body;
    console.log("----------****----------")
    console.log(data)
    console.log("----------****----------")
    try {
        const response=await Favorite.find({
            userId:user._id
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error(error)
    }
})
module.exports={ addFavorite,removeFavorite,getFavorites}