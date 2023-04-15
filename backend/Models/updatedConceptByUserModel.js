const mongoose=require('mongoose')

const updatedConceptSchema=mongoose.Schema({
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
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    conceptId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Concept'
    },

    readMore:{
        type:String,
    },
},{ timestamps: true })
module.exports=mongoose.model('UpdatedConcept',updatedConceptSchema)