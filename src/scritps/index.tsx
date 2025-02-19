import Script from 'next/script';

export default function Scripts() {
  return (
    <>
      <Script
        src="//cdn-prod.fluidconfigure.com/static/code/configure-ui/stable/js/configure-app.js"
        strategy="afterInteractive"
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
    </>
  );
}
