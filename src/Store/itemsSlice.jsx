import { createSlice } from "@reduxjs/toolkit";

// Helper function to calculate the default date (one week ago)
const getOneWeekAgoDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

const initialState = {
  allSources: ["All Source", "News API Org", "The New York Times", "The Guardian"],
  generalItems: ["General", "World News", "Politics", "Business", "Technology", "Health", "Sports"],
  defaultSource: "All Source",
  defaultGeneral: "General",
  defaultDate: getOneWeekAgoDate(), // Set initial default date to one week ago
  selectedCat:{}
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setDefaultSource(state, action) {
      state.defaultSource = action.payload; // Update defaultSource
    },
    setDefaultGeneral(state, action) {
      state.defaultGeneral = action.payload; // Update defaultGeneral
    },
    setDefaultDate(state, action) {
      state.defaultDate = action.payload; // Update defaultDate
    },
    setSelectedCat(state, action) {
      state.selectedCat = action.payload; // Update defaultGeneral
    },
  },
});

export const { setDefaultSource, setDefaultGeneral, setDefaultDate,setSelectedCat } = itemsSlice.actions;

export const selectAllSources = (state) => state.items.allSources;
export const selectGeneralItems = (state) => state.items.generalItems;
export const selectDefaultSource = (state) => state.items.defaultSource;
export const selectDefaultGeneral = (state) => state.items.defaultGeneral;
export const selectDefaultDate = (state) => state.items.defaultDate;
export const selectedCatData = (state) => state.items.selectedCat;


export default itemsSlice.reducer;
