export interface IConfigureService {
  getProduct(): any;
  getProductName(): string;
}

export enum RenderType {
  '3D' = '3D',
  '2D' = '2D',
};

export interface AppState {
  configureReady: boolean;
  configure: any;
  product: {
    id: number | undefined,
    name: string,
    vendorId: string
  },
  renderType: RenderType,
  ola: {
    data: any;
    initialized: boolean;
  },
  rtrReady: boolean;
  rxReady: boolean;
  vmReady: boolean;
  renderMenu: boolean;
};