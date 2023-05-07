const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const {addFavorite,removeFavorite,getFavorites,getAllFavorites}=require("../Controllers/AddFavController")


router.post('/add',protect,addFavorite)
router.delete('/remove/:itemId',protect,removeFavorite)
router.get('/get',protect,getFavorites)
router.get('/get/all',protect,getAllFavorites)

module.exports=router