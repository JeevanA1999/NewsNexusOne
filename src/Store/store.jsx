import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import searchReducer from './searchSlice';
const store = configureStore({
  reducer: {
    items: itemsReducer,
    searchItems: searchReducer,
    
  },
 
});

export default store;
