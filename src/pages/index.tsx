import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import Header from '@/components/header';
import Model from '@/components/model';
import RenderMenu from '@/components/render-menu';
import { IAppState, RenderType } from '@/constants';

import Scripts from '../scritps';
import style from '../css/app.module.css';

export default function App() {
  const searchParams = useSearchParams();
  const useImage = searchParams.get('useImage') === 'true';
  const {
    configureReady, renderType
  } = useSelector((state: IAppState) => state.app);

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
        <section className={`${renderType === RenderType['3D'] ? style.threeD : style.twoD}`}>
          <Header></Header>
          <Model></Model>
          <RenderMenu></RenderMenu>
        </section>
      }
    </>
  );
}
