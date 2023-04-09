//this model holds the id of the favorited item, the id of the user who favorited it, and the type of the item (product, category, etc) and the date of the favoriting
//

// Path: backend\Models\myFavoritiesModel.js
// Compare this snippet from backend\Models\categoriesModel.js:
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
