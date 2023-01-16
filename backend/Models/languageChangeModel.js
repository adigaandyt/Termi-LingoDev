const { urlencoded } = require('express')
const mongoose=require('mongoose')



const languageChangeSchema=mongoose.Schema({
        
     userEmail:{
        type:String,
        required:[true,'YOU MUST TO contain email'],
     },
     categoryName:{
        type:String,
        required:[true,'YOU MUST TO contain categoryName'],
     },
     conceptName:{
        type:String,
        required:[true,'YOU MUST TO contain conceptName'],
     },
     previousLanguage:{
        type:String,
        required:true,
        enum:['English','עברית', 'العربية' ]
     },
     newLanguage:{
        type:String,
        required:true,
        enum:['English','עברית', 'العربية' ]
     }
  
      
  
  }, { timestamps: true })

module.exports=mongoose.model('SearchLanguageChange',languageChangeSchema)
