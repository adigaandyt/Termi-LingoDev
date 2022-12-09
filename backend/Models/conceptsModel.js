const mongoose=require('mongoose')

const conceptSchema=mongoose.Schema({
    categories:{
        type:Array, 
        default:[0]
    },
    shortDefinition:{
        type:Object,
        // required:[true,'Please add short definition'],
        hebrew:{
            type:String
        },
        english:{
            type:String
        },
        arabic:{
            type:String
        }
    },
    conceptName:{
        type:Object,
        // required:[true,'Please add concept name'],
        hebrew:{
            type:String
        },
        english:{
            type:String
        },
        arabic:{
            type:String
        }
    },
    longDefinition:{
        type:Object,
        // required:[true,'Please add long definition'],
        hebrew:{
            type:String
        },
        english:{
            type:String
        },
        arabic:{
            type:String
        }
    },
    suggestedBy:{
        type:String
    },
    readMore:{
        type:String,

    },
    

})
conceptSchema.index({ 'conceptName.english': 'text'});
module.exports=mongoose.model('Concept',conceptSchema)