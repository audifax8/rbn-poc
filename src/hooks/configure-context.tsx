import { useEffect, createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ConfigureService } from '../../services/Configure';
import { setConfigureReady, setProductInfo, setParams } from '../slices/app';
import { IConfigureApi, MEGA_WAYFARER_ID, RBN_CUSTOMER_ID } from '@/constants';

const ConfigureContext = createContext({});

export function useConfigure(): any {
  return useContext(ConfigureContext);
}

export function ConfigureProvider(props: any) {
  const { children } = props;
  const [configureService, setConfigureService] = useState<ConfigureService>();
  const dispatch = useDispatch();
  useEffect(() => {
    return document.addEventListener('configureApp', (e: any) => {
      const { configureApp } = e.detail;
      const { _GET } = configureApp;
      const params = {
        ..._GET,
        workflow: 'prod',
        product: _GET.product || _GET.productId || MEGA_WAYFARER_ID,
        customer: RBN_CUSTOMER_ID
      };
      configureApp(params, (err: any, configure: IConfigureApi) => {
        if (err) { return; }
        const cService = new ConfigureService(configure);
        const product = cService.getProduct();
        const { id, vendorId, name } = product;
        setConfigureService(cService)
        window._configure = configure;
        dispatch(setProductInfo({ id, vendorId, name }));
        dispatch(setConfigureReady());
        dispatch(setParams({ params }));
      });
    });
  },[]);
  const value = { configureService };
  return (
    <ConfigureContext.Provider value={value}>
      {children}
    </ConfigureContext.Provider>
  );
};
