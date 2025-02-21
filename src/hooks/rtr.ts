import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { container } from '../../di/inversify.config';
import { IRTRService, RTRService } from '../../services/RTR';

import { setRTRReady } from '../slices/app';

declare global {
  interface Window {
    rtrViewerMV: any;
    _configure: any;
  }
}

export function rtrApi() {
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
        const rtrS = new RTRService(window.rtrViewerMV);
        container.bind<IRTRService>('IRTRService').toConstantValue(rtrS);
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
}
