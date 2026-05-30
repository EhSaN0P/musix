import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLang: "en"
};

const langSlice = createSlice({
    name: "lang",
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.currentLang = action.payload;

        }
    }
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
