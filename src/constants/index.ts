declare global {
  interface Window {
    rtrViewerMV: any;
    _configure: any;
    vmmv: any;
  }
}

export const MEGA_WAYFARER_ID = 26101;
export const RBN_CUSTOMER_ID = 1581;
export interface IConfigureService {
  getProduct(): any;
  getProductName(): string;
}

export enum RenderType {
  '3D' = '3D',
  '2D' = '2D',
};
export interface IAppState {
  app: AppState
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
  params: any;
};

export interface IAttributeValue {
  active: boolean;
  selected: boolean;
  selectable: boolean;
  id: number;
  url?: string;
  vendorId: string;
  alias: string;
  name: string;
  metadata: any[];
};
export interface IConfigurableAttribute {
  id: number;
  alias: string;
  vendorId: string;
  name: string;
  values: IAttributeValue[];
  metadata: any[];
};

export interface IProduct {
  name: string;
  id: number;
  vendorId: string;
}

export interface IConfigureApi {
  run: Function;
}

export interface ICAMap {
  id: number | null;
  alias: string;
  icon: string;
  //ca: IConfigurableAttribute | null;
  selectedAvId: number | null;
}