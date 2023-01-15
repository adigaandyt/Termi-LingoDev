const asyncHandler =require('express-async-handler')
const bcrypt=require('bcryptjs')
const User=require('../Models/usersModel')
const Category=require('../Models/categoriesModel')
const jwt =require('jsonwebtoken')


const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        		expiresIn:'30d'
 		   })
         }


//@desc register a new user
//@route POST /api/users/register/:CategoryId  http://localhost:5000/api/users/register/:categoryId
//@access public
const registrUser=asyncHandler( async (req,res)=>{
    const categoryId=req.params.categoryId
    const {email, password ,password2 ,name, phoneNumber ,language,profile_image,favorite_pet,gender}=req.body;

    if(categoryId==='639e49f8dfabd615c821584f'){
        res.status(500)
        throw new Error("Missing Category ID")
    }
    if(!gender){
        res.status(500)
        throw new Error("Choose gender")
    }
    if(!categoryId){
        res.status(500)
        throw new Error("You have to choose category , if there is a category choosen , try to switch it to other category and get back to category you want tot choose")
    }
    if(password!==password2){
        res.status(500)
        throw new Error("You must to include a same passwords")
    }
    
    try {
        const category=await Category.findOne({categoryId})
        console.log(category)
        if(!category){
            res.status(500)
            throw new Error("You have to choose category ")
        }
        const userExist=await User.findOne({email})
        //check if the user is exists by email
        if(userExist){
            res.status(400)
            throw new Error('Email already exist!')
        }
        //hash password
        const salt=await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        //Create user 
        const user=await User.create({
            name,
            email,
            phoneNumber,
            language,
            gender, 
            categoryId,
            favorite_pet,
            profile_image:profile_image,
            password:hashPassword
        })
        if(user){
            res.status(201)
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                phoneNumber:user.phone_number,
                language:user.language,
                favorite_pet:user.favorite_pet,
                categoryId:user.categoryId,
                gender:user.gender,
                games_coins:user.games_coins,
                profile_image:user.profile_image,
                token:generateToken(user._id)
    


            })
        }


    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
 }
 )
 
 //@desc login with existing user
//@route POST /api/users/login http://localhost:5000/api/users/login
//@access publice
const loginUser=asyncHandler( async (req,res)=>{
   const {email,password}=req.body
    try {
        const user =await User.findOne({email})
        
        if(user && (await bcrypt.compare(password,user.password))){
          const  userData={ _id:user._id,
                name:user.name,
                isAdmin:user.isAdmin,
                email:user.email,
                language:user.language,
                categoryId:user.categoryId,
                phoneNumber:user.phoneNumber,
                games_coins:user.games_coins,
                gender:user.gender,
                profile_image:user.profile_image,
                token:generateToken(user._id)}
            res.status(200).json(userData)
        }else{
            res.status(401)
            throw new Error('validation faild')
        }
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
    
 
 })

 //@desc get a current user 
//@route GET /api/users/me
//@access private
const getMe=asyncHandler( async(req,res)=>{
    const user=req.user
    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        phoneNumber:user.phoneNumber,
        language:user.language,
        categoryId:user.categoryId,
        games_coins:user.games_coins,
        profile_image:user.profile_image,
        added_concepts:user.added_concepts,
        gender:user.gender,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
    })
})


 //@desc reset password 
//@route GET /api/users/reset/password
//@access private
const resetPassword=asyncHandler(async (req,res)=>{
    
    

    const {password,password1,password2} =req.body
    const userId=req.user.id

    
    try {
        const user=await User.findById(userId)
        //check if the user is exit and the current password that user included is correct 
        if(user && (await bcrypt.compare(password,user.password))){
            if(password1!==password2){
                res.status(400)
                throw new Error("You must to include a same passwords !")
            }
            //hash the new password
            const salt=await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password1,salt) 

            //change  password in the database
            const isSuccess= await  User.updateOne({_id:user._id} ,{password:hashPassword})
            res.status(200).json(isSuccess)
            
        }else{
            res.status(500)
            throw new Error('Incorrect password')
        }
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }

})
//@desc upload image to s3 bucket and save the url in the data base
//@route post /api/users/upload/image
//@access private 
const uploadImage =asyncHandler(async(req,res)=>{ 
    try{
        res.status(200).json(req.file.location) 
    }catch(err){
        // const imageMimeType=req.file.mimetype.split('/')[0]
        // if(imageMimeType!=="image"){
            res.status(500)
            throw new Error("Invalide authorization")
       
        
       
    }
    
 })
 //@desc upload image to s3 and update user image field with it URL
//@route post /api/users/update/image
//@access private 
const updateUserImage =asyncHandler(async(req,res)=>{ 
    // console.log(req.user.id)
    // console.log(req.file.location) 
    try{
        const newUser=await User.findByIdAndUpdate(req.user.id,{profile_image:req.file.location},{new:true})
        console.log(newUser)
        res.status(200).json({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            phoneNumber:newUser.phoneNumber,
            language:newUser.language,
            categoryId:newUser.categoryId,
            games_coins:newUser.games_coins,
            profile_image:newUser.profile_image,
            gender:newUser.gender,
            isAdmin:newUser.isAdmin,
            token:generateToken(newUser._id)
        })
    }catch(err){
            res.status(500)
            throw new Error("Invalide authorization")  
    }
    
 })
  //@desc update details by user 
//@route GET /api/users/update/user
//@access public
const updateUserDetails=asyncHandler(async (req,res)=>{
const {newCategoryId,newLanguage,newPhoneNumber,newEmail,newName}=req.body

let newUser;
try {
    const userExist=await User.findOne({newEmail})
    //check if the user is exists by email
    if(userExist&& newEmail!==req.user.email){
        res.status(400)
        throw new Error('Email already exist!')
    }
  
  newUser =await User.findByIdAndUpdate({_id:req.user._id},{
    name:newName,
    email:newEmail,
    phoneNumber:newPhoneNumber,
    language:newLanguage,
    categoryId:newCategoryId


 },{new:true})  
} catch (error) {
    res.status(401)
    throw new Error('User not updated')
}

if(newUser){
    res.status(200).json({
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        phoneNumber:newUser.phoneNumber,
        language:newUser.language,
        categoryId:newUser.categoryId,
        profile_image:newUser.profile_image,
        games_coins:newUser.games_coins,
        gender:newUser.gender,
        isAdmin:newUser.isAdmin,
        token:generateToken(newUser._id)
    })
}else{
    throw new Error('Somthing is Wrong, try to Logout and login again')
}
})
  //@desc on user forgot his password 
//@route GET /api/users/verify
//@access public
const verifyUser=asyncHandler(async (req,res)=>{

    const {email,favorite_pet}=req.body
    if(!email||!favorite_pet){
        res.status(404)
        throw new Error("missing details")
    }
    try {
        const emailExist=await User.findOne({email:email})

        if(!emailExist){
        res.status(401)
        throw new Error("Your email is not exist in our database")
        }else{
            if(emailExist.favorite_pet===favorite_pet){
                res.status(200).json({
                    token:generateToken(emailExist._id)
                })
            }else{
                res.status(404)
                throw new Error("Incorrect details")
            }
        }

    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }

    })

 //@desc set coins when the user play game and finished it 
//@route POST /api/users/set/coins
//@access private
const setCoinsOnFinishedGame=asyncHandler( async (req,res)=>{
    const user=req.user
    const data=req.body
    console.log(data)
     try {
        const newUser=await User.findByIdAndUpdate({_id:user._id},{games_coins:user.games_coins+data.score},{new:true})
        const  userData={ 
                _id:newUser._id,
                name:newUser.name,
                isAdmin:newUser.isAdmin,
                email:newUser.email,
                language:newUser.language,
                categoryId:newUser.categoryId,
                phoneNumber:newUser.phoneNumber,
                games_coins:newUser.games_coins,
                gender:newUser.gender,
                profile_image:newUser.profile_image,
                token:generateToken(newUser._id)}
             res.status(200).json(userData)
     } catch (error) {
         res.status(500)
         throw new Error(error)
     }
     
  
  })
  
 //@desc get the top 5 in the games by there coins ....
//@route POST /api/users/get/top5
//@access public
    
const getTop5Users=asyncHandler( async (req,res)=>{

     try {
        // const users=await User.find({},).sort({games_coins: -1}).limit(5)
        const users=await User.aggregate([
            { $sort:{games_coins:-1}},
            {$limit:5},
            {$project:{_id:0,favorite_pet:0,added_concepts:0,password:0,phoneNumber:0}}
        ])


        users.sort(function(a, b) {
            return b.games_coins - a.games_coins;
        });
        
     res.json(users)

     } catch (error) {
         res.status(500)
         throw new Error(error)
     }
  })
module.exports={
    registrUser,
    loginUser,
    getMe,
    resetPassword,
    uploadImage,
    updateUserDetails,
    updateUserImage,
    verifyUser,
    setCoinsOnFinishedGame,
    getTop5Users
}
