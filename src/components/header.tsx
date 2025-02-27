import React from 'react';

import { useSelector } from 'react-redux';

import { IAppState } from '@/constants';
import { useVMMV } from '@/hooks/vm';

import Icon from './common/icon';
import style from '../css/header.module.css';


function VMButton() {
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

export default function Header() {
  const { product: { name } } = useSelector((state: IAppState) => state.app);
  return (
    <div className={style.fcCustomHeader}>
      <div className={style.flex}>
        <div className={style.rbnLogo}>
          <Icon src='/rbn-logo.svg' alt='RBN logo' width={73} height={32} />
        </div>
        <div className={style.hmMenu}>
          <Icon src='/hm-menu.svg' alt='menu icon' width={28} height={12} />
        </div>
      </div>
      <div className={style.flex}>
        <div className='fc-custom-model-name'>
          <h1 className={style.productName}>{ name }</h1>
        </div>
        <div className='fc-custom-vm'>
          <VMButton></VMButton>
        </div>
      </div>
    </div>
  );
}
