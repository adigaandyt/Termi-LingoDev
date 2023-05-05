const mongoose=require('mongoose')

const conceptSchema=mongoose.Schema({
    categories:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Category'
    }],

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
    suggestedBy_userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    isOpenAi:{
        type:Boolean,
        default:false
    },

    readMore:{
        type:String,

    },
    accepted:{
        type:Boolean,
        default:false
    }
    
    

}, { timestamps: true })
conceptSchema.index({ 'conceptName.english': 'text'});
module.exports=mongoose.model('Concept',conceptSchema)