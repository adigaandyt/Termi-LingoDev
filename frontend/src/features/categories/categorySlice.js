import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import categoryService from './categoryService'
const initialState={ 
    categories:null,
    isCategorySuccess:false,
    isCategoryError:false,
    isCategoryLoading:false,
    Categorymessage:''
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
//get categories names
export const createNewCategoryByUser=createAsyncThunk(
    'create/category',
     async(data,thunkAPI)=>{
        const token=thunkAPI.getState().auth.user.token 
        try {
            return await categoryService.createNewCategoryByUser(data,token)
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
        Categoryreset:(state)=>{
            state.isCategoryLoading=false
            state.isCategoryError=false
            state.isCategorySuccess=false
            state.Categorymessage=''
        }
    },
    extraReducers:(builder)=>{
       builder
            .addCase(getCategories.pending,(state)=>{
                state.isCategoryLoading=true
            })
            .addCase(getCategories.rejected,(state,action)=>{
                state.isCategoryLoading=false
                state.isCategoryError=true
                state.Categorymessage=action.payload
                state.categories=null
            })
            .addCase(getCategories.fulfilled,(state,action)=>{
                state.isCategoryLoading=false
                state.isCategorySuccess=true
                state.categories=action.payload
            })
            .addCase(createNewCategoryByUser.pending,(state)=>{
                state.isCategoryLoading=true
            })
            .addCase(createNewCategoryByUser.rejected,(state,action)=>{
                state.isCategoryLoading=false
                state.isCategoryError=true
                state.Categorymessage=action.payload
       
            })
            .addCase(createNewCategoryByUser.fulfilled,(state,action)=>{
                state.isCategoryLoading=false
                state.isCategorySuccess=true
            })
        
    }

})

export const {Categoryreset}=categorySlice.actions
export default categorySlice.reducer