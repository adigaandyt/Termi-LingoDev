const asyncHandler =require('express-async-handler')
const Favorite=require('../Models/myFavoritiesModel');
const router = require('../Routes/userRoutes');
const Concept = require('../Models/conceptsModel');

const addFavorite = asyncHandler(async (req, res) => {
    const user = req.user;
    const data = req.body;
    // console.log("----------***ADDING*----------")
    // console.log(data)
    // console.log("----------***ADDING*----------")
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
//@desc remove favorite
//@route GET /remove/:itemId/:userId
//@access public
const removeFavorite = asyncHandler(async (req,res)=>{
    try {
        const response=await Favorite.findOneAndDelete({
            userId:req.user.id,
            itemId:req.params.itemId
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
    // console.log("----------****----------")
    // console.log(data)
    // console.log("----------****----------")
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

const getAllFavorites = asyncHandler(async (req,res)=>{
    const user=req.user;
    const data=req.body;
    // console.log("----------****----------")
    // console.log(data)
    // console.log("----------****----------")
    let Concepts = new Array();
    try {
      const count = await Favorite.countDocuments({ userId: { $exists: true } });

        const response=await Favorite.find({
            userId:user.id
        })
        for (let i = 0; i < response.length; i++) {

          const concept = await Concept.findOne({
            _id: response[i].itemId
          }).select('conceptName categories');
          Concepts.push(concept);
        }
        res.json({allFavorites:count,favorites:Concepts,favoritesCount:response.length})
        // res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500)
        throw new Error(error)
    }
})
module.exports={ addFavorite,removeFavorite,getFavorites,getAllFavorites}