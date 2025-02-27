import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'reflect-metadata';

import { Provider } from 'react-redux';
import { ConfigureProvider } from '../hooks/configure-context';
import { VMMVProvider } from '../hooks/vm';
import { RTRProvider } from '@/hooks/rtr';

import { store } from '../store/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ConfigureProvider>
        <VMMVProvider>
          <RTRProvider>
            <Component {...pageProps} />
          </RTRProvider>
        </VMMVProvider>
      </ConfigureProvider>
    </Provider>
  );
}
