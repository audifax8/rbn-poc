export interface IConfigureService {
  getProductByType(): any;
}

export class ConfigureService implements IConfigureService {
  configure: any;
  constructor(configure: any) {
    this.configure = configure;
  }

  getProductByType(): any {
    return this.configure.run('getProduct');
  }
}
