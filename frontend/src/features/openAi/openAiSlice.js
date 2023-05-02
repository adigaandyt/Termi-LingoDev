import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import openAiService from './openAiService'
// import authService from './authService'
// import { useDispatch } from 'react-redux'
// import {me} from './authService'




const  initialState={ 
    isOpenAiLoading:false,
    isOpenAiError:false,
    isOpenAiSuccess:false,
    openAiConcept:null,
    openAiMessage:''
}

// get a concept by ChatGPT API Request 
export const getConceptByOpenAiAPIRequest=createAsyncThunk(
    'OpenAi/ChatGPT',
     async(formdata,thunkAPI)=>{
        try { 
            const token=thunkAPI.getState().auth.user.token 
            return await openAiService.getConceptByOpenAiAPIRequest(formdata,token)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)

export  const openAiSlice=createSlice({
    name:'openAi',
    initialState,
    reducers:{
        resetOpenAi:(state)=>{
            state.isOpenAiLoading=false
            state.isOpenAiError=false
            state.isOpenAiSuccess=false
            state.openAiMessage=''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getConceptByOpenAiAPIRequest.fulfilled,(state,action)=>{
            state.isOpenAiLoading=false;
            state.isOpenAiSuccess=true;
            state.openAiMessage='';
            console.log("slice openai openAiConcept",action.payload)
            state.openAiConcept=action.payload

        })
        .addCase(getConceptByOpenAiAPIRequest.rejected,(state,action)=>{
            state.isOpenAiLoading=false;
            state.isOpenAiSuccess=false;
            state.isOpenAiError=true;
            state.openAiMessage=action.payload;
            state.openAiConcept=null

        })
        .addCase(getConceptByOpenAiAPIRequest.pending,(state)=>{
            state.isOpenAiLoading=true;
            state.isOpenAiSuccess=false;
            state.isOpenAiError=false;

        })

    }

})

export const {resetOpenAi}=openAiSlice.actions
export default openAiSlice.reducer