import React from 'react';
import { useSelector } from 'react-redux';

import { IAppState } from '@/constants';
import { useVMMV } from '@/providers/vm';

import Icon from '../common/icon';
import style from './vm.module.css';

export default function VMButton() {
  const { vmReady } = useSelector((state: IAppState) => state.app);
  const { vmmvService } = useVMMV();
  async function vmmvOnClick() {
    const isBrowserSupported = await vmmvService.isBrowserSupported();
    console.log({isBrowserSupported});
  }
  return (
    <button
      className={`${style.vmButton}  ${!vmReady ? style.disabled : ''}`}
      disabled={!vmReady}
      onClick={vmmvOnClick}
    >
      <Icon src='/vm.svg' alt='virtual mirror icon' width={18} height={18} />
      <span className={style.vmLabel}>try on</span>
    </button>
  );
};