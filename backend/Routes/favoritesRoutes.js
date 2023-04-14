const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const {addFavorite,removeFavorite,getFavorites}=require("../Controllers/AddFavController")


router.post('/add',protect,addFavorite)
router.delete('/remove/:conceptId',protect,removeFavorite)
router.get('/get',protect,getFavorites)


module.exports=router