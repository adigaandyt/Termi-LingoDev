import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import favService from './favService'
const initialState={
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:'',
    concept:null,
    concepts:null,
    conceptsNames:null,
    unAcceptedConcepts:null
}

//get favorite by user id
export const getFav =createAsyncThunk('get',async (data,thunkAPI)=>{
    try {
        const response=await favService.createNewFavByUser(data)
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
}
)

// Add new favorite
export const addFav =createAsyncThunk('add',async (data,thunkAPI)=>{
    try {
        const response=await favService.createNewFavByUser(data)
        console.log(response)
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
}
)
//remove favorite by item id
export const removeFav =createAsyncThunk('remove',async (data,thunkAPI)=>{
    try {
        const response=await favService.removeFav(data)
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
}
)
//get all favorites by user id
export const getFavorites =createAsyncThunk('get',async (data,thunkAPI)=>{
    try {
        const response=await favService.getFavorites(data)
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
}
)


export const favSlice=createSlice({
    name:'fav',
    initialState,
    reducers:{
        resetFav:(state)=>{
            state.concept=null
            state.concepts=null
            state.conceptsNames=null
            state.unAcceptedConcepts=null
            state.isSuccess=false
            state.isError=false
            state.message=''
        }
    },
    extraReducers:{
        [getFav.pending]:(state)=>{
            state.isLoading=true
        }
        ,
        [getFav.fulfilled]:(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.concept=action.payload
        }
        ,
        [getFav.rejected]:(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        }
        ,
        [addFav.pending]:(state)=>{
            state.isLoading=true
        }
        ,
        [addFav.fulfilled]:(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.concept=action.payload
        }
        ,
        [addFav.rejected]:(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        }
        ,
        [removeFav.pending]:(state)=>{
            state.isLoading=true
        }
        ,
        [removeFav.fulfilled]:(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.concept=action.payload
        }
        ,
        [removeFav.rejected]:(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        }
        ,
        [getFavorites.pending]:(state)=>{
            state.isLoading=true
        }
        ,
        [getFavorites.fulfilled]:(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.concepts=action.payload
        }
        ,
        [getFavorites.rejected]:(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        }
    }
})
