import { configureStore } from "@reduxjs/toolkit";
import configureReducer from "../slices/app";
 
//compare with combine reducers, this does it automatically.
export const store = configureStore({
 reducer: {
   app: configureReducer,
 },
});

// This is a wrapper based on the createStore function, devtools extension, thunk middleware, and some alerts about accidental mutations.
export type RootState = ReturnType<typeof store.getState>;