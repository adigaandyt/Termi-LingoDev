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
    top5:null,
    top5ForTransMe:null,
    top5ForGuessTheTerm:null,
    guessTheTermResults:0,
    transMeResults:0,
    GamesRechartData:null,
    usersByAdmin:null,
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
// get the top5 user by coins
export const getTop5Users=createAsyncThunk(
    'get/top5',
     async(thunkAPI)=>{
      
        try { 
            return await authService.getTop5Users()
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
export const getTop5UsersForGuessTheTerm=createAsyncThunk(
    'get/top5/guesstheTerm',
     async(thunkAPI)=>{
      
        try { 
            return await authService.getTop5UsersForGuessTheTerm()
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
export const getTop5UsersForTransMe=createAsyncThunk(
    'get/top5/transme',
     async(thunkAPI)=>{
      
        try { 
            return await authService.getTop5UsersForTransMe()
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
// get Users By Text Search for admin 
export const getUsersByTextSearch=createAsyncThunk(
    'get/users',
     async(textSearch,thunkAPI)=>{
      
        try { 
            return await authService.getUsersByTextSearch(textSearch)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//get the results of guess the term game
export const getGuessTheTermResults=createAsyncThunk(
    'get/user/results/guesstheterm',
     async(formData,thunkAPI)=>{
        try {
            const token=thunkAPI.getState().auth.user.token 
            console.log("tokebguesstheterm:" ,token)

            return await authService.getGuessTheTermResults(token)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//get the results of transme game
export const getTransMeResults=createAsyncThunk(
    'get/user/results/transme',
     async(formData,thunkAPI)=>{
        try {
            const token=thunkAPI.getState().auth.user.token 
            console.log("tokebtransme:" ,token)
            return await authService.getTransMeResults(token)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//get the results of transme game
export const getGamesRechartData=createAsyncThunk(
    'get/rechart/data',
     async(formData,thunkAPI)=>{
        try {
            const token=thunkAPI.getState().auth.user.token 
            return await authService.getGamesRechartData(token)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//set admin by admin 
export const setUserAdminByAdmin=createAsyncThunk(
    'set/admin',
     async(data,thunkAPI)=>{
        try {
            return await authService.setUserAdminByAdmin(data)
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
        .addCase(getTop5Users.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getTop5Users.rejected,(state,action)=>{
            state.isLoading=false
            state.message=action.payload
        })
        .addCase(getTop5Users.fulfilled,(state,action)=>{
            state.isLoading=false
            state.top5=action.payload
        })
        .addCase(getTop5UsersForGuessTheTerm.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getTop5UsersForGuessTheTerm.rejected,(state,action)=>{
            state.isLoading=false
            state.message=action.payload
        })
        .addCase(getTop5UsersForGuessTheTerm.fulfilled,(state,action)=>{
            state.isLoading=false
            state.top5ForGuessTheTerm=action.payload
        })
        .addCase(getTop5UsersForTransMe.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getTop5UsersForTransMe.rejected,(state,action)=>{
            state.isLoading=false
            state.message=action.payload
        })
        .addCase(getTop5UsersForTransMe.fulfilled,(state,action)=>{
            state.isLoading=false
            state.top5ForTransMe=action.payload
        })
        .addCase(getUsersByTextSearch.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getUsersByTextSearch.rejected,(state,action)=>{
            state.isLoading=false
            state.message=action.payload
            state.usersByAdmin=null

        })
        .addCase(getUsersByTextSearch.fulfilled,(state,action)=>{
            state.isLoading=false
            state.usersByAdmin=action.payload
        })
        .addCase(getGuessTheTermResults.pending,(state)=>{
            state.isLoading=true
            
        })
        .addCase(getGuessTheTermResults.fulfilled,(state,action)=>{
            state.isLoading=false
            state.guessTheTermResults=action.payload
        })
        .addCase(getGuessTheTermResults.rejected,(state,action)=>{
            state.message=action.payload
            state.isLoading=false
        })  
        .addCase(getTransMeResults.pending,(state)=>{
            state.isLoading=true
            
        })
        .addCase(getTransMeResults.fulfilled,(state,action)=>{
            state.isLoading=false
            state.transMeResults=action.payload
        })
        .addCase(getTransMeResults.rejected,(state,action)=>{
            state.message=action.payload
            state.isLoading=false
        })
        .addCase(getGamesRechartData.pending,(state)=>{
            state.isLoading=true
            
        })
        .addCase(getGamesRechartData.fulfilled,(state,action)=>{
            state.isLoading=false
            state.GamesRechartData=action.payload
        })
        .addCase(getGamesRechartData.rejected,(state,action)=>{
            state.message=action.payload
            state.isLoading=false
        })
        .addCase(setUserAdminByAdmin.pending,(state)=>{
            state.isLoading=true
            
        })
        .addCase(setUserAdminByAdmin.fulfilled,(state,action)=>{
            state.isLoading=false
        })
        .addCase(setUserAdminByAdmin.rejected,(state,action)=>{
            state.message=action.payload
            state.isLoading=false
        })
    }

})

export const {reset}=authSlice.actions
export default authSlice.reducer