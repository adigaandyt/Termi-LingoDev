const express=require('express')
const router=express.Router()
const {
    registrUser,
    loginUser,
    getMe,
    resetPassword,
    uploadImage,
    updateUserDetails,
    updateUserImage,
    verifyUser,
    setCoinsOnFinishedGame,
    getTop5Users,
    getUsersForAdmin,
    getUserTransMeGameResults,
    getUserGessTheTermGameResults,
    getUserBothGamesResults,
    getTop5UsersForGuessTheTerm,
    getTop5UsersForTransMe,
    setUserAdminByAdmin,
    sendValidationEmail
    }=require('../Controllers/userControllers')
const {protect}=require("../middleware/authMiddleware")
const {upload} =require('../config/S3')

router.post('/register/:categoryId',registrUser)
router.get('/me',protect,getMe)
router.get('/get/top5',getTop5Users)
router.get('/get/top5/guesstheterm',getTop5UsersForGuessTheTerm)
router.get('/get/top5/transme',getTop5UsersForTransMe)
router.get('/get/users/:textSearch',getUsersForAdmin)
router.post('/login',loginUser)
router.post('/upload/image',upload.single("profileImage"), uploadImage)
router.post('/reset/password',protect,resetPassword) 
router.post('/update/user',protect,updateUserDetails)
router.post('/update/image',upload.single("profileImage"),protect,updateUserImage)
router.post('/verify',verifyUser)
router.post('/set/coins',protect,setCoinsOnFinishedGame)
router.get('/get/results/transMe',protect,getUserTransMeGameResults);
router.get('/get/results/guesstheterm',protect,getUserGessTheTermGameResults)
router.get('/get/both/games/results',protect,getUserBothGamesResults);
router.post('/set/user/admin',setUserAdminByAdmin)
router.post('/email/validation',sendValidationEmail)



module.exports=router
