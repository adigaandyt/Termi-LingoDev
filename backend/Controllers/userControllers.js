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
//@route POST /api/users/register/:CategoryId  http://localhost:5000/api/users/:categoryId
//@access public
const registrUser=asyncHandler( async (req,res)=>{
    const categoryId=req.params.categoryId
     const {email, password ,password2 ,name, phoneNumber ,language}=req.body;

    if(!categoryId){
        res.status(500)
        throw new Error("You have to choose category , if there is a category choosen , try to switch it to other category and get back to category you want tot choose")
    }
    if(password!==password2){
        res.status(500)
        throw new Error("You must to include a same passwords")
    }
    
    try {
        const category=await Category.findById(categoryId)
        if(!category){
            res.status(500)
            throw new Error("You have to choose category , if there is a category choosen , try to switch it to other category and get back to category you want tot choose")
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
            categoryId,
            password:hashPassword
        })
        if(user){
            res.status(201)
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                password:user.password,
                phoneNumber:user.phone_number,
                language:user.language,
                categoryId:user.categoryId,
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
            res.status(200).json({
                _id:user._id,
                name:user.name,
                isAdmin:user.isAdmin,
                email:user.email,
                password:user.password,
                language:user.language,
                category:user.category,
                phoneNumber:user.phoneNumber,
                token:generateToken(user._id)
    
    
            })
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
    res.status(200).json(req.user)
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


module.exports={
    registrUser,
    loginUser,
    getMe,
    resetPassword
}
