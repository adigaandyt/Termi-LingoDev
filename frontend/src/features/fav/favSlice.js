import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import favService from './favService'
const initialState={
    favs:null,
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:''
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
    const token =JSON.parse(localStorage.getItem('token'));
    try {
        const response=await favService.createNewFavByUser(data,token)
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
        const token =JSON.parse(localStorage.getItem('token'));
        const response=await favService.removeFav(data,token)
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
}
)
//get all favorites by user id
export const getFavorites =createAsyncThunk('get/all',async (data,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token 
       
        return await favService.getFavorites(token)
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

   
            state.isLoading=false
            state.isSuccess=false
            state.isError=false
            state.message=''
            state.isFavorite=false
        }
    },
    extraReducers:{
        [getFav.pending]:(state)=>{
            state.isLoading=true
        }
        ,
        [getFav.fulfilled]:(state,action)=>{
            state.isLoading=false
            state.favs=action.payload
            state.isSuccess=true
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
            state.isFavorite=action.payload.isFavorite
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
            state.favs=action.payload.favorites
        }
        ,
        [getFavorites.rejected]:(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        }
    }
})
export const {resetFav}=favSlice.actions
export default favSlice.reducer