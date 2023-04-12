const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const {addFavorite,removeFavorite,getFavorites}=require("../Controllers/AddFavController")


router.post('/fav/add',protect,addFavorite)
router.post('/fav/remove',protect,removeFavorite)
router.get('/fav/get',protect,getFavorites)


module.exports=router