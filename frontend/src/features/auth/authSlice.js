import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localstorage
const user =JSON.parse(localStorage.getItem('user'))

const initialState={ 
    user:user?user:null,
    isSuccess:false,
    isError:false,
    isLoading:false,
    message:''
}

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
            const token=thunkAPI.getState().auth.user.token 
            return await authService.resetPassword(formData ,token)
        } catch (error) {
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)


export const authSlice=createSlice({
    name:'auth',
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
    }

})

export const {reset}=authSlice.actions
export default authSlice.reducer