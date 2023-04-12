const asyncHandler =require('express-async-handler')
const FavoritedItem=require('../Models/myFavoritiesModel');
const router = require('../Routes/userRoutes');

const addFavorite = asyncHandler(async (req,res)=>{ 
    const user=req.user;
    const data=req.body;
    console.log("----------****----------")
    console.log(data)
    console.log("----------****----------")
    try {
        const response=await FavoritedItem.create({
            userEmail:user.email,
            itemId:data.itemId,
            itemType:data.itemType
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
        const response=await FavoritedItem.deleteOne({
            userEmail:user.email,
            itemId:data.itemId,
            itemType:data.itemType
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
        const response=await FavoritedItem.find({
            userEmail:user.email,
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error(error)
    }
})
module.exports={ addFavorite,removeFavorite,getFavorites}