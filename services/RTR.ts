export interface IRTRService {
  getVersion(): string;
  init(c: any): void;
  generateToken(c: any): string;
}

export class RTRService implements IRTRService {
  api: any;
  constructor(api: any) {
    this.api = api;
  }

  getVersion(): any {
    return this.api.getVersion();
  }

  init(c: any): void {
    const token = this.generateToken(c);
    const initData = {
      data: {
        settings: {
          env: 'PROD',
          orbitPoint: false,
          highlightComponent: true,
          overviewVisibility: false,
          displayComponentPointer: true,
          automaticFramingComponent: true,
          buttonsVisibility: {
            tutorial: 'hidden',
            explosion: 'overlay',
            accessibility: 'overlay',
            animationAtLanding: 'overlay'
          }
        },
        id: {
          type: 'token',
          value: token
        },
        locale: 'en-US', // or any other available locale
        selector: `#viewer`
      },
      metadata: {
        envs: {
          asset: 'production',
          catalog: 'production',
          ms: 'production',
        },
        qa: false
      },
      callbacks: {
        onComponentSelected: () => {
        },
        onActions: () => {
          // one of the possible actions is "click" that will contains the
          // selected component slot in the token. When the user clicks on a
          // configurable part, then the camera frames the clicked component
          // provided that highlightComponentPart has been set to true
        }
      }
    };
    this.api.init(initData);
  }

  generateToken(c: any): string {
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
    const recipe = c.run('getRecipe', 'custom', 'alias', 'vendorId');
    const productVendorId = c.run('getProduct').vendorId;
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
      const selectedLensesSku = c.run('getAttribute', {alias: 'lenses_sku'}).values.filter((value: any) => value.selected)[0];
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
