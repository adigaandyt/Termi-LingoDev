import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import conceptProfileService from './conceptProfileService'



const  initialState={
    data:null,
    userRating:null,
    conceptsAdded:null, 
    isConceptsProfileLoading:false,
    isConceptsProfileSuccess:false,
    isConceptsProfileError:false,
    ConceptsProfileMessage:false,
}

// get the data  for the concepts added rechart
export const getDataForConceptsAddedRechart=createAsyncThunk(
    'addedConcepts/rechart',
     async(data,thunkAPI)=>{
        try { 
          
            const token=thunkAPI.getState().auth.user.token 
            // return await authService.uploadImage(formdata)
            return await conceptProfileService.getDataForConceptsAddedRechart(token)
        } catch (error) {
            console.log(error.message)
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
// get the concepts that the user added
export const getUserConceptsAdded=createAsyncThunk(
    'addedConcepts/concept',
     async(data,thunkAPI)=>{
        try { 
          
            const token=thunkAPI.getState().auth.user.token 
            // return await authService.uploadImage(formdata)
            return await conceptProfileService.getUserConceptsAdded(token)
        } catch (error) {
            console.log(error.message)
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)

export  const ConceptsProfileSlice=createSlice({
    name:'profileConcept',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isConceptsProfileLoading=false;
            state.isConceptsProfileSuccess=false;
            state.isConceptsProfileError=false;
            state.ConceptsProfileMessage=false;
        }
    },
    extraReducers:(builder)=>{ 
        builder
        .addCase(getDataForConceptsAddedRechart.fulfilled,(state,action)=>{
            state.isConceptsProfileLoading=false;
            state.isConceptsProfileSuccess=true;
            state.data=action.payload.data;
            state.userRating=action.payload.userRating;
        })
        .addCase(getDataForConceptsAddedRechart.pending,(state)=>{
            state.isConceptsProfileLoading=true;
        })
        .addCase(getDataForConceptsAddedRechart.rejected,(state,action)=>{
            state.isConceptsProfileLoading=false;
            state.isConceptsProfileError=true;
            state.data=null;
            state.userRating=null;
            state.ConceptsProfileMessage=action.payload
        })
        .addCase(getUserConceptsAdded.fulfilled,(state,action)=>{
            state.isConceptsProfileLoading=false;
            state.isConceptsProfileSuccess=true;
            state.conceptsAdded=action.payload.conceptsAddedByUser;
        })
        .addCase(getUserConceptsAdded.pending,(state)=>{
            state.isConceptsProfileLoading=true;
        })
        .addCase(getUserConceptsAdded.rejected,(state,action)=>{
            state.isConceptsProfileLoading=false;
            state.isConceptsProfileError=true;
            state.conceptsAdded=null;
            state.ConceptsProfileMessage=action.payload
        })
     }

})

export const {reset}=ConceptsProfileSlice.actions
export default ConceptsProfileSlice.reducer