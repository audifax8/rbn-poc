
import React from 'react';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';

import { setRenderMenu } from '@/slices/app';
import { IAppState } from '@/constants';

import Menu from './menu';

import style from '../css/render-menu.module.css';

export default function RenderMenu() {

  const { renderMenu, configureReady } = useSelector((state: IAppState) => state.app);
  const dispatch = useDispatch();

  return (
    <>
    {!renderMenu && configureReady &&
      <div className={style.showMenuContainer}>
        <button
          onClick={() => dispatch(setRenderMenu())}
        >
          <Image
            src='/menu.svg'
            alt='Next.js logo'
            width={31}
            height={54}
          />
        </button>
      </div>
    }
    {renderMenu && <Menu></Menu>}
    </>
  );
};
