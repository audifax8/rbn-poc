
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { setRenderMenu } from '@/slices/app';
import { IAppState } from '@/constants';

import style from './render-menu.module.css';
import Icon from '../common/icon';

export default function RenderMenu() {

  const { configureReady } = useSelector((state: IAppState) => state.app);
  const dispatch = useDispatch();

  return (
    <>
    {configureReady &&
      <div className={style.renderMenu}>
        <button
          onClick={() => dispatch(setRenderMenu())}
        >
          <Icon src='/render-menu.svg' alt='render menu' width={31} height={54} />
        </button>
      </div>
    }
    </>
  );
};
