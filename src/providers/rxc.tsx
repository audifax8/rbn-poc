import { useEffect, createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IRXCService, RXCService } from '../../services/RXC';

import { setRXCReady } from '../slices/app';

const RXCContext = createContext({});

export function useRXC(): any {
  return useContext(RXCContext);
}
export function RXCProvider(props: any) {
  const { children } = props;
  const [rxcService, setRXCService] = useState<IRXCService>();
  const dispatch = useDispatch();
  useEffect(() => {
    const INTERVAL = 100;
    const checkTimeMs = 20000;
    let elapsedTime = 0;
    let loaded = false;
    const time = setInterval(() => {
      elapsedTime += INTERVAL;
      if (window.RXC) {
        loaded = true;
        clearInterval(time);
        const rxcService = new RXCService(window.RXC);
        setRXCService(rxcService);
        dispatch(setRXCReady());
        return;
      }
      if (elapsedTime > checkTimeMs && !loaded) {
        clearInterval(time);
        return;
      }
    }, INTERVAL);
    return;
  },[]);
  const value = { rxcService };
  return (
    <RXCContext.Provider value={value}>
      {children}
    </RXCContext.Provider>
  );
}
