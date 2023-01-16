const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
    categoryName:{
        english:{
            type:String,
            require:true
        },
        arabic:{
            type:String,
            require:true
        },
        hebrew:{
            type:String,
            require:true
        }  
    },
    accepted:{
        type:Boolean,
        default:false
    },
    suggestBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    }
    

})

module.exports=mongoose.model('Category',categorySchema)