export interface IRXCService {
  isBrowserSupported(): Promise<boolean>;
}

export class RXCService implements IRXCService {
  api: any;
  constructor(api: any) {
    this.api = api;
  }

  async isBrowserSupported(): Promise<boolean> {
    return true;
  }
};