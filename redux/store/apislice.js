import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    status: false,
    company: {}
};
const companyReducers = createSlice({
    name: "increment",
    initialState,
    reducers: {
        GetTopGainersLosers: (state, action) => {
            state.status = true;
            state.company = action.payload;
            // console.log(action.payload);
        },

        GetCompanyData: (state, action) => {
            state.status = true;
            state.company = action.payload;
        },


    }
});


export const { GetTopGainersLosers, GetCompanyData } = companyReducers.actions;
export default companyReducers.reducer;


