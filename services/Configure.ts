import { IConfigureService } from "@/constants/index";

export class ConfigureService implements IConfigureService {
  configure: any;
  constructor(configure: any) {
    this.configure = configure;
  }

  getProduct(): any {
    return this.configure.run('getProduct');
  }

  getProductName(): string {
    return this.getProduct().name;
  }
}
