import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { container } from '../../di/inversify.config';
import { ConfigureService } from '../../services/Configure';
import { IConfigureService } from '@/constants/index';

import { setConfigureReady, setProductInfo } from '../slices/app';

const MEGA_WAYFARER_ID = 26101;
const RBN_CUSTOMER_ID = 1581;

export function configureApp() {
  const dispatch = useDispatch();
  useEffect(() => {
    return document.addEventListener('configureApp', (e: any) => {
      const { configureApp } = e.detail;
      const { _GET } = configureApp;
      const params = {
        workflow: 'prod',
        product: _GET.product || _GET.productId || MEGA_WAYFARER_ID,
        customer: RBN_CUSTOMER_ID
      };
      configureApp(params, async (err: any, configure: any) => {
        if (err) {
          return;
        }
        const cS = new ConfigureService(configure);
        container.bind<IConfigureService>('IConfigureService').toConstantValue(cS);
        const cService = container.get<IConfigureService>('IConfigureService');
        const product = cService.getProduct();
        const { id, vendorId, name } = product;
        dispatch(setConfigureReady());
        window._configure = configure;
        dispatch(setProductInfo({ id, vendorId, name }));
      });
    });
  },[]);
}
