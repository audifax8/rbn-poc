import Scripts from '../scritps';

import { configureApp } from '@/hooks/configure';
import { rtrApi } from '@/hooks/rtr';

import { useSelector, useDispatch } from 'react-redux';
import { setRenderMenu } from '../slices/app';
import Header from '@/components/header';
import Model from '@/components/model';
import Menu from '@/components/menu';

export default function App() {
   configureApp();
  rtrApi();

  const { renderMenu } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();

  return (
    <>
      <Scripts/>
      <Header></Header>
      <Model></Model>
      {!renderMenu && 
        <div>
          <button type="button" onClick={() => dispatch(setRenderMenu())}>
            render menu
          </button>
        </div>
      }
      {renderMenu &&
        <Menu></Menu>
      }
    </>
  );
}
