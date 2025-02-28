import Script from 'next/script';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { setRTRReady, setVMReady, setRXCReady } from '@/slices/app';

import { useRTR } from '@/providers/rtr';
import { useVMMV } from '@/providers/vm';
import { useRXC } from '@/providers/rxc';

import { RTRService } from '../../services/RTR';
import { VMMVService } from '../../services/VMMV';
import { RXCService } from '../../services/RXC';

export default function Scripts() {
  const { product } = useSelector((state: any) => state.app);

  const { setRTRService } = useRTR();
  const { setVMMVService } = useVMMV()
  const { setRXCService } = useRXC();
  
  const { vendorId } = product;
  const dispatch = useDispatch();
  return (
    <>
      <Script
        src='//cdn-prod.fluidconfigure.com/static/code/configure-ui/stable/js/configure-app.js'
        strategy='afterInteractive'
        crossOrigin='anonymous'
        onError={() => {
          console.info('error loading Configure API');
        }}
      />
      <Script
        src='//rtrmv.essilorluxottica.com/lib/v/3.0.3/main.umd.js'
        strategy='afterInteractive'
        onLoad={() => {
          const rtrService = new RTRService(window.rtrViewerMV);
          setRTRService(rtrService);
          dispatch(setRTRReady());
          console.info('RTR successfully loaded');
        }}
        onError={() => {
          console.info('error loading RTR');
        }}
      />
      <Script
        src='//vmmv-uat.luxottica.com/v/4.13/index.umd.js'
        strategy='lazyOnload'
        onLoad={() => {
          const vmmvService = new VMMVService(window.vmmv);
          setVMMVService(vmmvService);
          dispatch(setVMReady());
          console.info('VMMV successfully loaded');
        }}
        onError={() => {
          console.info('error loading VMMV');
        }}
      />
      <Script
        src='//rxc.luxottica.com/rxc3/fe/test/v1.1.1/dist/rxc.js'
        strategy='lazyOnload'
        crossOrigin='anonymous'
        onLoad={() => {
          const rxcService = new RXCService(window.RXC);
          setRXCService(rxcService);
          dispatch(setRXCReady());
          console.info('RXC successfully loaded');
        }}
        onError={() => {
          console.info('error loading RXC');
        }}
      />
      {vendorId && 
        <Script
          src={`//one-configurator-services-mockup.luxdeepblue.com/components?vendorId=${vendorId}&currency=USD`}
          strategy='afterInteractive'
          crossOrigin='anonymous'
          onError={() => {
            console.info('error loading Components');
          }}
        />
      }
    </>
  );
}
