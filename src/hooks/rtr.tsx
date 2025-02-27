import { useEffect, createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IRTRService, RTRService } from '../../services/RTR';

import { setRTRReady } from '../slices/app';

const RTRContext = createContext({});

export function useRTR(): any {
  return useContext(RTRContext);
}
export function RTRProvider(props: any) {
  const { children } = props;
  const [rtrService, setRTRService] = useState<IRTRService>();
  const dispatch = useDispatch();
  useEffect(() => {
    const INTERVAL = 100;
    const checkTimeMs = 20000;
    let elapsedTime = 0;
    let loaded = false;
    const time = setInterval(() => {
      elapsedTime += INTERVAL;
      if (window.rtrViewerMV) {
        loaded = true;
        clearInterval(time);
        const rtrService = new RTRService(window.rtrViewerMV);
        setRTRService(rtrService);
        dispatch(setRTRReady());
        return;
      }
      if (elapsedTime > checkTimeMs && !loaded) {
        clearInterval(time);
        return;
      }
    }, INTERVAL);
    return;
  },[]);
  const value = { rtrService };
  return (
    <RTRContext.Provider value={value}>
      {children}
    </RTRContext.Provider>
  );
}
