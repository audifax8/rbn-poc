import { useEffect, createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ConfigureService } from '../../services/Configure';
import { setConfigureReady, setProductInfo, setParams } from '../slices/app';
import { IConfigureApi, MEGA_WAYFARER_ID, RBN_CUSTOMER_ID } from '@/constants';

//import p_23351 from '../components-mock/23351';

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
        customer: RBN_CUSTOMER_ID,
        productOverrides: {
          // allows you to see on the console how overrides are being applied
          // when using the non production version of the runtime
          debug: false,
          // if AVs that are set to {active:false} by valueUsage overrides below
          // should still be displayed on the UI, but not selectable
          // also you can use an object on this property to define what, not active
          // ca's, you want to display:
          //
          // renderInactive: {
          //   ca_alias : {true|false}
          // }
          //
          renderInactive: true,
          //values: p_23351
        }
      };
      configureApp(params, (err: any, configure: IConfigureApi) => {
        if (err) { return; }
        const cService = new ConfigureService(configure);
        const product = cService.getProduct();
        const { id, vendorId, name } = product;
        setConfigureService(cService);
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
