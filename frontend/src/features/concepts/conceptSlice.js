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
//reset concept
export const resetConcept=createAsyncThunk(
    'concept/reset',
     async(thunkAPI)=>{
        // the concept will reset in the state
        return
     }

)

//get concept
export const getConcept=createAsyncThunk(
    'concepts/get',
     async(data,thunkAPI)=>{
        try {
            return await conceptService.getConcept(data)
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
//get Concepts that are close to the textSearch
export const getConcepts=createAsyncThunk(
    'get/concepts',
     async(data,thunkAPI)=>{
        try {
            return await conceptService.getConcepts(data)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//create new concept by user
export const createNewConceptByUser=createAsyncThunk(
    'create/concept',
     async(data,thunkAPI)=>{
        const token=thunkAPI.getState().auth.user.token 
        try {
            return await conceptService.createNewConceptByUser(data,token)
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
        .addCase(resetConcept.fulfilled,(state)=>{
            state.concept=null;
            state.concepts=null;
        })
        .addCase(getConcepts.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getConcepts.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.concept=null
            state.message=action.payload
            
        })
        .addCase(getConcepts.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.concepts=action.payload
        })
    }

})
export const {reset}=conceptSlice.actions
export default conceptSlice.reducer