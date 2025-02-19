import { useEffect } from 'react';

import { container } from "../../di/inversify.config";
import { ConfigureService, IConfigureService } from '../../services/Configure';

export function configureApp() {
  useEffect(() => {
    return document.addEventListener('configureApp', (e: any) => {
      const { configureApp } = e.detail;
      const params = {
        workflow: 'dev',
        //Mega Way
        product: 26101,
        //Aviator
        //product: 22956,
        customer: 1581
      };
      configureApp(params, async (err: any, configure: any) => {
        if (!err) {}
        const cS = new ConfigureService(configure);
        container.bind<IConfigureService>("IConfigureService").toConstantValue(cS);
        const cService = container.get<IConfigureService>("IConfigureService");
        console.log({cService});
        console.log(cService.getProductByType());
      });
    });
  },[]);
}
