import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import gamesService from './gamesService'




const initialState={ 
    user_concepts:null,
    isGamesSuccess:false,
    isGamesError:false,
    isGamesLoading:false,
    message:''
}


//get concept name and shortdefintion for "Guess the term" game
export const getConcepts4GuessTerm=createAsyncThunk(
    'games/user',
     async(data,thunkAPI)=>{
        const token=thunkAPI.getState().auth.user.token
        try {
            return await gamesService.getConcepts4GuessTerm(token)
        } catch (error) {
            
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//get concept name and shortdefintion for "Guess the term" game
export const getConcepts4GuessTermByCategoryId=createAsyncThunk(
    'games/category',
     async(data,thunkAPI)=>{
        console.log(data)
        const token=thunkAPI.getState().auth.user.token
        try {
            return await gamesService.getConcepts4GuessTermByCategoryId(data,token)
        } catch (error) {
            
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//get concept name and shortdefintion for "Guess the term" game
export const setGuessTheTermGameResult=createAsyncThunk(
    'set/result',
     async(data,thunkAPI)=>{
        const token=thunkAPI.getState().auth.user.token
        try {
            return await gamesService.setGuessTheTermGameResult(data,token)
        } catch (error) {
            
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)


export const gamesSlice=createSlice({
    name:'games',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isGamesLoading=false
            state.isGamesError=false
            state.isGamesSuccess=false
            state.message=''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getConcepts4GuessTerm.pending,(state)=>{
            state.isGamesLoading=true
        })
        .addCase(getConcepts4GuessTerm.rejected,(state,action)=>{
            state.isGamesLoading=false
            state.isGamesError=true
            state.isGamesSuccess=false
            state.user_concepts=null
            state.message=action.payload
            
        })
        .addCase(getConcepts4GuessTerm.fulfilled,(state,action)=>{
            state.isGamesLoading=false
            state.isGamesError=false
            state.isGamesSuccess=true
            state.user_concepts=action.payload
            state.message=''
        })
        .addCase(getConcepts4GuessTermByCategoryId.pending,(state)=>{
            state.isGamesLoading=true
        })
        .addCase(getConcepts4GuessTermByCategoryId.rejected,(state,action)=>{
            state.isGamesLoading=false
            state.isGamesError=true
            state.isGamesSuccess=false
            state.user_concepts=null
            state.message=action.payload
            
        })
        .addCase(getConcepts4GuessTermByCategoryId.fulfilled,(state,action)=>{
            state.isGamesLoading=false
            state.isGamesError=false
            state.isGamesSuccess=true
            state.user_concepts=action.payload
            state.message=''
        })
 
        
        
    }

})
export const {reset}=gamesSlice.actions
export default gamesSlice.reducer