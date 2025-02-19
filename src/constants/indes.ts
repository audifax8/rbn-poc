export enum RenderType {
  '3D' = '3D',
  '2D' = '2D',
};

export interface AppState {
  configureReady: boolean;
  renderType: RenderType,
  ola: {
    data: any;
    initialized: boolean;
  },
  rtrReady: boolean;
  rxReady: boolean;
  vmReady: boolean;
};