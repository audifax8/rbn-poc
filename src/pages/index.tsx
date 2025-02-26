import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import { rtrApi } from '@/hooks/rtr';

import Header from '@/components/header';
import Model from '@/components/model';
import RenderMenu from '@/components/render-menu';
//import { IAppState } from '@/constants';

import Scripts from '../scritps';

export default function App() {
  rtrApi();

  //const { params: { useImage } } = useSelector((state: IAppState) => state.app);

  const searchParams = useSearchParams();
  const useImage = searchParams.get('useImage') === 'true';
  const { configureReady } = useSelector((state: any) => state.app);

  return (
    <>
      <Scripts/>
      {!configureReady && useImage &&
        <section className='loader'>
          <div className={``}>
            <Image
              className=''
              src='/img/loader.png'
              alt='Next.js logo'
              width={794}
              height={449}
              priority
            />
          </div>
        </section>
      }
      {
        <>
          <Header></Header>
          <Model></Model>
          <RenderMenu></RenderMenu>
        </>
      }
    </>
  );
}
