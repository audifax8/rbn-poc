export interface IRTRService {
  getVersion(): string;
}

export class RTRService implements IRTRService {
  api: any;
  constructor(api: any) {
    this.api = api;
  }

  getVersion(): any {
    return this.api.getVersion();
  }
}
