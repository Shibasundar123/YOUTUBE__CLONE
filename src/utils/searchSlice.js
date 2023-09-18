import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    CachedSuggestions:{

    },
    clickedSuggestion:''
  },
  reducers: {
    cachedResults: (state, action) => {
        // state= {...action.payload,...state}
        const { searchQuery, response } = action.payload;
        state.CachedSuggestions[searchQuery] = [response];
         // Limit the number of key-value pairs in state to 20
      const stateKeys = Object.keys(state);
      if (stateKeys.length > 100) {
        // Remove the initial keys to maintain a limit of 20 pairs
        const keysToRemove = stateKeys.slice(0, stateKeys.length - 100);
        keysToRemove.forEach(key => {
          delete state[key];
        });
      }
    },
    searchSuggestion: (state,action)=>{
        state.clickedSuggestion = action.payload
    }
  },
});

export const {cachedResults,searchSuggestion} = searchSlice.actions;
export default searchSlice.reducer;

