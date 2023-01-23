import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import categoryService from './categoryService'
const initialState={ 
    categories:null,
    unAcceptedCategories:null,
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
//get categories names
export const getUnAcceptedCategories=createAsyncThunk(
    'get/unacceptedcategories',
     async(data,thunkAPI)=>{
        try {
            return await categoryService.getUnAcceptedCategories()
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
// update category by admin 
export const updateCategoryByAdmin=createAsyncThunk(
    'update/unacceptedcategory',
     async(data,thunkAPI)=>{
        try {
            return await categoryService.updateCategoryByAdmin(data)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
// delete category by admin 
export const deleteCategoryByAdmin=createAsyncThunk(
    'delete/unacceptedcategory',
     async(data,thunkAPI)=>{
        try {
            return await categoryService.deleteCategoryByAdmin(data)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
// accept category by admin 
export const acceptCategoryByAdmin=createAsyncThunk(
    'accept/unacceptedcategory',
     async(data,thunkAPI)=>{
        try {
            return await categoryService.acceptCategoryByAdmin(data)
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
            .addCase(getUnAcceptedCategories.pending,(state)=>{
                state.isCategoryLoading=true
            })
            .addCase(getUnAcceptedCategories.rejected,(state,action)=>{
                state.isCategoryLoading=false
                state.isCategoryError=true
                state.Categorymessage=action.payload
            })
            .addCase(getUnAcceptedCategories.fulfilled,(state,action)=>{
                state.isCategoryLoading=false
                state.isCategorySuccess=true
                state.unAcceptedCategories=action.payload
            })
            .addCase(acceptCategoryByAdmin.pending,(state)=>{
                state.isCategoryLoading=true
            })
            .addCase(acceptCategoryByAdmin.rejected,(state,action)=>{
                state.isCategoryLoading=false
                state.isCategoryError=true
                state.Categorymessage=action.payload
            })
            .addCase(acceptCategoryByAdmin.fulfilled,(state,action)=>{
                state.isCategoryLoading=false
                state.isCategorySuccess=true
            })
            .addCase(deleteCategoryByAdmin.pending,(state)=>{
                state.isCategoryLoading=true
            })
            .addCase(deleteCategoryByAdmin.rejected,(state,action)=>{
                state.isCategoryLoading=false
                state.isCategoryError=true
                state.Categorymessage=action.payload
            })
            .addCase(deleteCategoryByAdmin.fulfilled,(state,action)=>{
                state.isCategoryLoading=false
                state.isCategorySuccess=true
            })
            .addCase(updateCategoryByAdmin.pending,(state)=>{
                state.isCategoryLoading=true
            })
            .addCase(updateCategoryByAdmin.rejected,(state,action)=>{
                state.isCategoryLoading=false
                state.isCategoryError=true
                state.Categorymessage=action.payload
            })
            .addCase(updateCategoryByAdmin.fulfilled,(state,action)=>{
                state.isCategoryLoading=false
                state.isCategorySuccess=true
            })
        
    }

})

export const {Categoryreset}=categorySlice.actions
export default categorySlice.reducer