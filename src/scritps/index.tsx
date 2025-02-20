import Script from 'next/script';

import { useSelector } from 'react-redux';

export default function Scripts() {
  const { product } = useSelector((state: any) => state.app);
  const { vendorId } = product;
  return (
    <>
      <Script
        src="//cdn-prod.fluidconfigure.com/static/code/configure-ui/stable/js/configure-app.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <Script
        src="//rtrmv.essilorluxottica.com/lib/v/3.0.3/main.umd.js"
        strategy="afterInteractive"
      />
      <Script
        src="//vmmv-uat.luxottica.com/v/4.13/index.umd.js"
        strategy="lazyOnload"
      />
      <Script
        src="//rxc.luxottica.com/prod/v1.0.0/rxc.js"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      {vendorId && 
        <Script
          src={`//one-configurator-services-mockup.luxdeepblue.com/components?vendorId=${vendorId}&currency=USD`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      }
    </>
  );
}
