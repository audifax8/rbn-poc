import { useEffect } from 'react';

import { container } from "../../di/inversify.config";
import { IRTRService, RTRService } from '../../services/RTR';

declare global {
  interface Window {
    rtrViewerMV: any;
  }
}

const waitForScriptToLoad = (checkTimeMs: number, timeOutMs: number) => {
  let elapsedTime = 0;
  let loaded = false;
  return new Promise((resolve, reject) => {
    const time = setInterval(() => {
      elapsedTime += checkTimeMs;
      if (window.rtrViewerMV) {
        loaded = true;
        resolve({
          time: (elapsedTime / 1000).toFixed(2) + 's'
        });
        clearInterval(time);
      } else if (elapsedTime > timeOutMs && !loaded) {
        reject({
          time: elapsedTime
        });
        clearInterval(time);
      }
    }, checkTimeMs);
  });
};

export async function rtrApi() {
  useEffect(() => {
    waitForScriptToLoad(100, 20000)
      .then(() => {

        const rtrS = new RTRService(window.rtrViewerMV);
        container.bind<IRTRService>("IRTRService").toConstantValue(rtrS);
        //const rtrService = container.get<IRTRService>("IRTRService");
        //console.log({rtrService});
        //console.log(rtrService.getVersion());
      })
      .catch((err) => {
        console.log(err);
        console.log('err');
      });
    return;
  },[]);
}
