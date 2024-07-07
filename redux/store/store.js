import { configureStore } from '@reduxjs/toolkit';
import companyReducers from "./apislice"

const store = configureStore({
    reducer: {
        companydata: companyReducers,
    },

});

export default store;