import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'reflect-metadata';

import { Provider } from 'react-redux';
import { ConfigureProvider } from '../providers/configure';
import { VMMVProvider } from '../providers/vm';
import { RTRProvider } from '@/providers/rtr';
import { RXCProvider } from '@/providers/rxc';

import { store } from '../store/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ConfigureProvider>
        <VMMVProvider>
          <RTRProvider>
            <RXCProvider>
              <Component {...pageProps} />
            </RXCProvider>            
          </RTRProvider>
        </VMMVProvider>
      </ConfigureProvider>
    </Provider>
  );
}
