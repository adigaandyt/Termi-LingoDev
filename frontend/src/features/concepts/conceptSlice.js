import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import conceptService from './conceptService'
const initialState={ 
    concepts:null,
    concept:null,
    names:null,
    isSuccess:false,
    isError:false,
    isLoading:false,
    message:''
}

//get concepts
export const getConcept=createAsyncThunk(
    'concepts/get',
     async(searchText,thunkAPI)=>{
        try {
            return await conceptService.getConcept(searchText)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//get concepts names
export const getConceptsNames=createAsyncThunk(
    'concepts/names',
     async(thunkAPI)=>{
        try {
            return await conceptService.getConceptsNames()
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)



export const conceptSlice=createSlice({
    name:'concept',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
            state.message=''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getConcept.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getConcept.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.concept=null
            state.message=action.payload
            
        })
        .addCase(getConcept.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.concept=action.payload
        })
        .addCase(getConceptsNames.fulfilled,(state,action)=>{
            state.names=action.payload
        })
        .addCase(getConceptsNames.rejected,(state,action)=>{
            state.message=action.payload
           state.names=null
        })
    }

})
export const {reset}=conceptSlice.actions
export default conceptSlice.reducer