import Scripts from '../scritps';

import { configureApp } from '@/hooks/configure';
import { rtrApi } from '@/hooks/rtr';

import { useSelector, useDispatch } from 'react-redux';
import { setRXReady } from '../slices/app';
import Header from '@/components/header';
import Model from '@/components/model';

export default function App() {
   configureApp();
  rtrApi();

  const count = useSelector((state: any) => state.app.value);
  const dispatch = useDispatch();

  return (
    <>
      <Scripts/>
      <Header></Header>
      <Model></Model>
      <div>
      <button type="button" onClick={() => dispatch(setRXReady())}>
        count is: {count}
      </button>
      </div>
    </>
  );
}
