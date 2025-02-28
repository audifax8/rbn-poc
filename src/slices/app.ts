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
  rxcReady: false,
  vmReady: false,
  renderMenu: false,
  params: {}
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
      const { renderType } = payload;
      state.renderType = renderType;
    },
    setRTRReady(state) {
      state.rtrReady = true;
    },
    setRXCReady(state) {
      state.rxcReady = true;
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
    setParams(state, action) {
      const { payload } = action;
      const { params } = payload;
      state.params = params;
    }
 }
});
 
export const {
  setConfigureReady,
  setConfigure,
  setRenderType,
  setRTRReady,
  setRXCReady,
  setVMReady,
  setOLAData,
  setOLAInitialized,
  setProductInfo,
  setRenderMenu,
  setParams
} = appSlice.actions;
export default appSlice.reducer;