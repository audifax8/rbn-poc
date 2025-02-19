import { createSlice } from "@reduxjs/toolkit";
 
import { RenderType, AppState } from "@/constants/indes";
 
const initialState: AppState = {
  configureReady: false,
  renderType: RenderType["2D"],
  ola: {
    data: {},
    initialized: false
  },
  rtrReady: false,
  rxReady: false,
  vmReady: false
};
 
const appSlice = createSlice({
 name: "app", //the way it will look in the store
 initialState,
 reducers: {
    setConfigureReady(state) {
      state.configureReady = true;
    },
    setRenderType(state, action) {
      const { payload } = action;
      state.renderType = payload;
    },
    setRTRReady(state) {
      state.rtrReady = true;
    },
    setRXReady(state) {
      state.rxReady = true;
    },
    setVMReady(state) {
      state.vmReady = true;
    },
    setOLAData(state, action) {
      const { payload } = action;
      state.ola.data = payload;
    },
    setOLAInitialized(state, action) {
      const { payload } = action;
      state.ola.initialized = payload;
    },
 },
});
 
export const {
  setConfigureReady,
  setRenderType,
  setRTRReady,
  setRXReady,
  setVMReady,
  setOLAData,
  setOLAInitialized
} = appSlice.actions;
export default appSlice.reducer;