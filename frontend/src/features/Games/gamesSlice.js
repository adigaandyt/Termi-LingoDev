import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import gamesService from './gamesService'




const initialState={ 
    user_concepts:null,
    concept_names:null,
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
//set the game results of gues the term game
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
//set the game results of transME game
export const setTransMeGameResult=createAsyncThunk(
    'set/result/transMe',
     async(data,thunkAPI)=>{
        const token=thunkAPI.getState().auth.user.token
        try {
            return await gamesService.setTransMeGameResult(data,token)
        } catch (error) {
            
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//get concept names  for "TransMe" game2
export const getConceptNames4TransMeGame=createAsyncThunk(
    'get/conceptNames/transme',
     async(data,thunkAPI)=>{
        const token=thunkAPI.getState().auth.user.token
        try {
            return await gamesService.getConceptNames4TransMeGame(token)
        } catch (error) {
            
            const message=(error.response&&error.response.data&&error.response.data.message)
            ||error.message
            ||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }

)
//get concept names  for "TransMe" game2 by categoryId
export const getConceptNames4TransMeGameByCategoryId=createAsyncThunk(
    'get/conceptNames/transme/catId',
     async(categoryId,thunkAPI)=>{
        console.log(categoryId)
        const token=thunkAPI.getState().auth.user.token
        try {
            return await gamesService.getConceptNames4TransMeGameByCategoryId(categoryId,token)
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
        }).addCase(getConceptNames4TransMeGame.fulfilled,(state,action)=>{
            state.isGamesLoading=false
            state.isGamesError=false
            state.isGamesSuccess=true
            state.concept_names=action.payload
            state.message=''
        }).addCase(getConceptNames4TransMeGame.rejected,(state,action)=>{
            state.isGamesLoading=false
            state.isGamesError=true
            state.isGamesSuccess=false
            state.concept_names=null
            state.message=action.payload
        }).addCase(getConceptNames4TransMeGameByCategoryId.rejected,(state,action)=>{
            state.isGamesLoading=false
            state.isGamesError=true
            state.isGamesSuccess=false
            state.concept_names=null
            state.message=action.payload
        }).addCase(getConceptNames4TransMeGameByCategoryId.fulfilled,(state,action)=>{
            state.isGamesLoading=false
            state.isGamesError=false
            state.isGamesSuccess=true
            state.concept_names=action.payload
            state.message=''
        })
 
        
        
    }

})
export const {reset}=gamesSlice.actions
export default gamesSlice.reducer