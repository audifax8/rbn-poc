import Scripts from '../scritps';

import { configureApp } from '@/hooks/configure';
import { rtrApi } from '@/hooks/rtr';

import { useSelector, useDispatch } from 'react-redux';
import { setRXReady } from '../slices/app';


export default function App() {
   configureApp();
  rtrApi();

  const count = useSelector((state: any) => state.app.value);
  const dispatch = useDispatch();

  return (
    <>
      <Scripts/>
      <div>
      <button type="button" onClick={() => dispatch(setRXReady())}>
        count is: {count}
      </button>
      </div>
    </>
  );
}
