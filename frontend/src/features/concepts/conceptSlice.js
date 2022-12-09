import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import conceptService from './conceptService'
const initialState={ 
    concepts:null,
    concept:null,
    isSuccess:false,
    isError:false,
    isLoading:false,
    message:''
}

//get concepts
export const getConcepts=createAsyncThunk(
    'concepts/get',
     async(searchText,thunkAPI)=>{
        try {
            return await conceptService.getConcepts(searchText)
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
        .addCase(getConcepts.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getConcepts.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.concepts=null
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