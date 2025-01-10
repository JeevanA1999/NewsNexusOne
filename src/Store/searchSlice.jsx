import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  searchToggle: false, 
  searchFeild:"",
};

const searchSlice = createSlice({
  name: "searchItems",
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.searchToggle = !state.searchToggle;
    },
    setSearchFeild: (state, action) => {
        state.searchFeild = action.payload.searchTerm;
      },
      
  },
});

export const { toggleSearch,setSearchFeild } = searchSlice.actions;

export default searchSlice.reducer;
