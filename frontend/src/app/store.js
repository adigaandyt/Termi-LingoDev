import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import conceptReducer from '../features/concepts/conceptSlice'
export const store = configureStore({
  reducer: {
    auth:authReducer,
    concept:conceptReducer,
  },
    
});
