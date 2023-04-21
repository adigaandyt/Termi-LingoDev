import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import conceptReducer from '../features/concepts/conceptSlice'
import categoryReducer from '../features/categories/categorySlice'
import gamesReducer from '../features/Games/gamesSlice'
import loggingReducer from '../features/logging/loggingSlice'
import favReducer from '../features/fav/favSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    concept:conceptReducer,
    category:categoryReducer,
    games:gamesReducer,
    log:loggingReducer,
    fav:favReducer
  },
    
});
