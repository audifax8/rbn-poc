import { useEffect } from 'react';

import { container } from "../../di/inversify.config";
import { IRTRService, RTRService } from '../../services/RTR';

declare global {
  interface Window {
    rtrViewerMV: any;
    _configure: any;
  }
}

const waitForScriptToLoad = (checkTimeMs: number, timeOutMs: number) => {
  let elapsedTime = 0;
  let loaded = false;
  return new Promise((resolve, reject) => {
    const time = setInterval(() => {
      //console.log(window.rtrViewerMV);
      elapsedTime += checkTimeMs;
      //console.log({loaded});
      if (window.rtrViewerMV) {
        //console.log('@here');
        loaded = true;
        clearInterval(time);
        return resolve({
          time: (elapsedTime / 1000).toFixed(2) + 's'
        });
      } else if (elapsedTime > timeOutMs && !loaded) {
        //console.log('####');
        reject({
          time: elapsedTime
        });
        clearInterval(time);
      }
      //console.log('∞∞∞∞');
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
