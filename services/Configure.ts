import {
  IConfigurableAttribute,
  IConfigureService,
  IProduct,
  IConfigureApi,
  IAttributeValue
} from '@/constants/index';

export class ConfigureService implements IConfigureService {
  configure: IConfigureApi;
  constructor(configure: any) {
    this.configure = configure;
  }

  getProduct(): IProduct {
    return this.configure.run('getProduct');
  }

  getProductName(): string {
    return this.getProduct().name;
  }

  createComponent(options: any): void {
    return this.configure.run(
        'createComponent',
        options
      );
  }

  selectValue(options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.configure.run(
        'selectValue',
        options,
        (err: any, changes: any) => {
          if (err) {
            reject(err);
          }
          resolve(changes)
        });
    });
  }

  getAttributeByAlias(alias: string): IConfigurableAttribute {
    return this.configure.run('getAttribute', { alias });
  }

  getSelectedAV(alias: string): IAttributeValue {
    const ca = this.configure.run('getAttribute', { alias });
    return ca.values.find((av: IAttributeValue) => av.selected);
  }
}
