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

  generateToken(): string {
    const skipServices = true;
    const TOKEN_ALIASES = [
      'frame_sku',
      'temple_sku',
      'temple_tips_sku',
      'lenses_sku',
      'metal_sku',
      'size',
      'service_1',
      'service_2',
      'service_3'
    ];
    const recipe = this.configure.run('getRecipe', 'custom', 'alias', 'vendorId');
    const productVendorId = this.getProduct().vendorId;
    let tokenArray = TOKEN_ALIASES.map(alias => {
      if (alias.indexOf('service') > -1) {
        return '';
      } else {
        return recipe[alias] ? recipe[alias].replace(/\s/g, '.') : 'NULL';
      }
    });
    tokenArray = tokenArray.filter(el => {
      if (el) {
        return el;
      }
    });
    if (!skipServices) {
      const selectedLensesSku = this.getAttributeByAlias('lenses_sku').values.filter((value: any) => value.selected)[0];
      if (selectedLensesSku.metadata) {
        const services: any [] = [];
        selectedLensesSku.metadata.map((data: any) => {
          if (data.key.indexOf('Service') > -1) {
            const order = data.key.match(/[0-9]/);
            services[order[0]] = data.value;
          }
        });
        services.map(service => tokenArray.push(service));
      }
    }
    const token = ['TKN', productVendorId.toUpperCase()].concat(tokenArray).join('~');
    return encodeURIComponent(token);
  }
}
