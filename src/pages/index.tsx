import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';

import { IAppState, RenderType } from '@/constants';

import Scripts from '../scritps';
import style from '../css/app.module.css';
import Header from '@/components/header';
import Model from '@/components/model';
import Loader from '@/components/loader';
import RenderMenu from '@/components/render-menu';
import Menu from '@/components/menu';

export default function App() {
  const searchParams = useSearchParams();
  const useFullImage = searchParams.get('useFullImage') === 'true';
  const {
    configureReady, renderType, renderMenu
  } = useSelector((state: IAppState) => state.app);

  return (
    <>
      <Scripts/>
      {!configureReady && useFullImage && <Loader />}
      {
        <section className={`${renderType === RenderType['3D'] ? style.threeD : style.twoD}`}>
          <Header />
          <Model />
          {!renderMenu && <RenderMenu />}
          {renderMenu && <Menu />}
        </section>
      }
    </>
  );
}
