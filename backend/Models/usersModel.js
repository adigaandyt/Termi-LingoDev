const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name .']
    },
    email:{
        type:String,
        required:[true,'Please add your email']

    },
    password:{
        type:String,
        required:[true,'Please add your password']

    },
    phoneNumber:{
        type:String,
        required:[true,'Please add a phone number']
    },
    language:{
        type:String,
        required:[true,'Please select a language'],
        enum:['English','עברית', 'العربية' ],
        default:'English'
       },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    

})

module.exports=mongoose.model('User',userSchema)