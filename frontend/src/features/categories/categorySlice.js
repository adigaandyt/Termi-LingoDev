import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import categoryService from './categoryService'
const initialState={ 
    categories:null,
    isSuccess:false,
    isError:false,
    isLoading:false,
    message:''
}


//get categories names
export const getCategories=createAsyncThunk(
    'categories/names',
     async(thunkAPI)=>{
        try {
            return await categoryService.getCategories()
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)


export const categorySlice=createSlice({
    name:'category',
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
            .addCase(getCategories.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getCategories.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.categories=null
            })
            .addCase(getCategories.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.categories=action.payload
            })
        
    }

})

export const {reset}=categorySlice.actions
export default categorySlice.reducer