import React from 'react';
import { useSelector } from 'react-redux';

import { IAppState } from '@/constants';
import { useRXC } from '@/providers/rxc';

import Icon from '../common/icon';
import style from './rxc.module.css';

export default function RXCButton() {
  const { vmReady } = useSelector((state: IAppState) => state.app);
  const { rxcService } = useRXC();
  async function rxcOnClick() {
    const isBrowserSupported = await rxcService?.isBrowserSupported();
    console.log({isBrowserSupported});
  }
  return (
    <button
      className={`${style.rxcButton}  ${!vmReady ? style.disabled : ''}`}
      disabled={!vmReady}
      onClick={rxcOnClick}
    >
      <Icon src='/rxc.svg' alt='virtual mirror icon' width={18} height={18} />
      <span className={style.rxcLabel}>try lenses</span>
    </button>
  );
};