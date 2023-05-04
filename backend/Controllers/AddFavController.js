const asyncHandler =require('express-async-handler')
const Favorite=require('../Models/myFavoritiesModel');
const router = require('../Routes/userRoutes');

const addFavorite = asyncHandler(async (req, res) => {
    const user = req.user;
    const data = req.body;
    console.log("----------***ADDING*----------")
    console.log(data)
    console.log("----------***ADDING*----------")
    try {
      // Check if the favorite already exists
      const favorite = await Favorite.findOne({
        userId: user._id,
        itemId: data.itemId
      });
  
      if (favorite) {
        // Return an error if the favorite already exists
        res.status(400).json({ message: 'Favorite already exists' });
      } else {
        // Create a new favorite if it doesn't exist
        const response = await Favorite.create({
          userId: user._id,
          itemId: data.itemId,
          isFavorite: data.isFavorite
        });
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
      res.status(500);
      throw new Error(error);
    }
  });
  
const removeFavorite = asyncHandler(async (req,res)=>{
    // const user=req.user;
    const data=req.params;
    console.log("----------***REMOVING*----------")
    // console.log(user)
    console.log(data)
    console.log("----------***RE*----------")
    res.json({message:"success"})
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
            userId:user.id
        })

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error(error)
    }
})
module.exports={ addFavorite,removeFavorite,getFavorites}