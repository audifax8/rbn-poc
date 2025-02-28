import { useEffect, createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { VMMVService, IVMMVService } from '../../services/VMMV';

import { setVMReady } from '../slices/app';

const VMMVContext = createContext({});

export function useVMMV(): any {
  return useContext(VMMVContext);
}

export function VMMVProvider(props: any) {
  const { children } = props;
  const [vmmvService, setVMMVService] = useState<IVMMVService>();
  const dispatch = useDispatch();
  useEffect(() => {
    const INTERVAL = 100;
    const checkTimeMs = 20000;
    let elapsedTime = 0;
    let loaded = false;
    const time = setInterval(() => {
      elapsedTime += INTERVAL;
      if (window.vmmv) {
        loaded = true;
        clearInterval(time);
        const vmmvService = new VMMVService(window.vmmv);
        setVMMVService(vmmvService);
        dispatch(setVMReady());
        return;
      }
      if (elapsedTime > checkTimeMs && !loaded) {
        clearInterval(time);
        return;
      }
    }, INTERVAL);
  },[]);
  const value = { vmmvService };
  return (
    <VMMVContext.Provider value={value}>
      {children}
    </VMMVContext.Provider>
  );
};
