import { createSlice } from '@reduxjs/toolkit';
 
import { RenderType, AppState } from '@/constants/index';

const initialState: AppState = {
  configureReady: false,
  configure: null,
  product: {
    id: undefined,
    name: '',
    vendorId: ''
  },
  renderType: RenderType['2D'],
  ola: {
    data: {},
    initialized: false
  },
  rtrReady: false,
  rxReady: false,
  vmReady: false,
  renderMenu: false
};
 
const appSlice = createSlice({
 name: 'app', //the way it will look in the store
 initialState,
 reducers: {
    setConfigureReady(state) {
      state.configureReady = true;
    },
    setConfigure(state, action) {
      const { payload } = action;
      const { configure } = payload;
      state.configure = configure;
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
    setProductInfo(state, action) {
      const { payload } = action;
      const { id, name, vendorId } = payload;
      state.product = { id, name, vendorId };
    },
    setRenderMenu(state) {
      state.renderMenu = true;
    },
 },
});
 
export const {
  setConfigureReady,
  setConfigure,
  setRenderType,
  setRTRReady,
  setRXReady,
  setVMReady,
  setOLAData,
  setOLAInitialized,
  setProductInfo,
  setRenderMenu
} = appSlice.actions;
export default appSlice.reducer;