import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import loggingService from './appLanguageChangeService'




const initialState={
    isLogSuccess:false,
    isLogError:false,
    isLogLoading:false,
    message:''
}


//get concept name and shortdefintion for "Guess the term" game
export const sendLanguageChange=createAsyncThunk(
    'Log/user',
     async(data,thunkAPI)=>{
        const token=thunkAPI.getState().auth.user.token
        try {
            return await loggingService.sendLanguageChange(token,data)
        } catch (error) {
            
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)



export const loggingSlice=createSlice({
    name:'Log',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLogLoading=false
            state.isLogError=false
            state.isLogSuccess=false
            state.message=''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(sendLanguageChange.pending,(state)=>{
            state.isLogLoading=true
        })
        .addCase(sendLanguageChange.rejected,(state,action)=>{
            state.isLogLoading=false
            state.isLogError=true
            state.isLogSuccess=false
            state.message=action.payload
            
        })
        .addCase(sendLanguageChange.fulfilled,(state,action)=>{
            state.isLogLoading=false
            state.isLogError=false
            state.isLogSuccess=true
            state.message=''
        })
    }

})
export const {reset}=loggingSlice.actions
export default loggingSlice.reducer