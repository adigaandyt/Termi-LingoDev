import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import authService from './authService'
import { useDispatch } from 'react-redux'
import {me} from './authService'


const user =JSON.parse(localStorage.getItem('user'))


const  initialState={ 
    user:user?user:null,
    image_url:null,
    user_token:null,
    isSuccess:false,
    isError:false,
    isLoading:false,
    isImageLoading:false, 
    message:''
}
// check me 
export const checkme=createAsyncThunk(
    'check/me',
     async(thunkAPI)=>{
        console.log("213")
        const token =JSON.parse(localStorage.getItem('token'))

    //    const user=authService.me(token)
        try { 
            console.log("user")
            return await authService.me(token)
          
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
// const dispatch=useDispatch()


// Upload image to s3
export const uploadImage=createAsyncThunk(
    'upload/image',
     async(formdata,thunkAPI)=>{
        try { 
            return await authService.uploadImage(formdata)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
// Upload image to s3 and store in database
export const updateUserImage=createAsyncThunk(
    'update/image',
     async(formdata,thunkAPI)=>{
        const token=thunkAPI.getState().auth.user.token 
        try { 
            return await authService.updateUserImage(formdata,token)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)

//logout user
export const logout=createAsyncThunk('auth/logout', async()=>{
    await authService.logout()
})

//Register user 
export const register=createAsyncThunk(
    'auth/register',
     async(user,thunkAPI)=>{
        try { 
            return await authService.register(user)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)

//Login user 
export const login=createAsyncThunk(
    'auth/login',
     async(user,thunkAPI)=>{
        try {
            return await authService.login(user)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//Reset password 
export const resetPassword=createAsyncThunk(
    'password/reset',
     async(formData,thunkAPI)=>{
        try {
            const token=thunkAPI.getState().auth.user_token.token 
            return await authService.resetPassword(formData ,token)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//update user 
export const updateUser=createAsyncThunk(
    'update/user',
     async(formData,thunkAPI)=>{
        try {
            const token=thunkAPI.getState().auth.user.token 
            return await authService.updateUser(formData ,token)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//verify user
export const verifyUser=createAsyncThunk(
    'verify/user',
     async(data,thunkAPI)=>{
        try {
            return await authService.verifyUser(data)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
// set coins after the game play
export const setCoins=createAsyncThunk(
    'update/coins',
     async(data,thunkAPI)=>{
        const token=thunkAPI.getState().auth.user.token 
        try { 
            return await authService.setCoins(data,token)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)


export  const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=false
            state.isImageLoading=false
            state.message=''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(checkme.pending,(state)=>{
            state.isLoading=true
            
        })
        .addCase(checkme.fulfilled,(state,action)=>{
            state.isLoading=false
            state.user=action.payload
        })
        .addCase(checkme.rejected,(state,action)=>{
            console.log(action.payload)
            state.isLoading=false
            state.isError=true
        })
        .addCase(register.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.user=null
            state.message=action.payload
            
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(login.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.user=null
        })
        .addCase(updateUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(logout.fulfilled,(state)=>{
            state.user=null
        })
        .addCase(resetPassword.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
        })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        .addCase(uploadImage.pending,(state)=>{
            state.isImageLoading=true
        })
        .addCase(uploadImage.rejected,(state,action)=>{
            state.isImageLoading=false
            state.image_url=null
            state.message=action.payload
            
        })
        .addCase(uploadImage.fulfilled,(state,action)=>{
            state.isImageLoading=false
            state.image_url=action.payload
        })
        .addCase(updateUserImage.pending,(state)=>{
            state.isImageLoading=true
        })
        .addCase(updateUserImage.rejected,(state,action)=>{
            state.isImageLoading=false
            state.isError=true
            state.message=action.payload
            
        })
        .addCase(updateUserImage.fulfilled,(state,action)=>{
            state.isImageLoading=false
            state.isSuccess=true
            state.user=action.payload
        })
        .addCase(verifyUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(verifyUser.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.payload
            state.user_token=null
            
        })
        .addCase(verifyUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.isError=false
            state.user_token=action.payload
        })
        .addCase(setCoins.pending,state=>{
            state.isLoading=true
        })
        .addCase(setCoins.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.message=""
            state.user=action.payload
        })
        .addCase(setCoins.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message=action.payload
        })
    }

})

export const {reset}=authSlice.actions
export default authSlice.reducer