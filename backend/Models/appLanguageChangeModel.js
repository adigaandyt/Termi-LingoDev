const { urlencoded } = require('express')
const mongoose=require('mongoose')



const appLanguageChangeSchema=mongoose.Schema({
        
     userEmail:{
        type:String,
        required:[true,'YOU MUST TO contain email'],
     },
     newLanguage:{
        type:String,
        required:true,
        enum:['English','עברית', 'العربية' ]
     }

  }, { timestamps: true })

module.exports=mongoose.model('AppLanguageChange',appLanguageChangeSchema)
