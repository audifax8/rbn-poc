import React from 'react';
import Image from 'next/image';

import { useSelector } from 'react-redux';

import style from '../css/header.module.css';
import { IAppState } from '@/constants';
import { useVMMV } from '@/hooks/vm';

export default function Header() {
  const { vmReady, product: { name } } = useSelector((state: IAppState) => state.app);

  const { vmmvService } = useVMMV();

  async function vmmvOnClick() {
    const isBrowserSupported = await vmmvService.isBrowserSupported();
    console.log({isBrowserSupported});
  }

  return (
    <div className={style.fcCustomHeader}>
      <div className={style.flex}>
        <div className={style.rbnLogo}>
          <Image
            className='fc-custom-rbn--icon'
            src='/rbn-logo.svg'
            alt='Next.js logo'
            width={73}
            height={32}
            priority
          />
        </div>
        <div className={style.hmMenu}>
          <Image
            className='fc-custom-vm--icon'
            src='/hm-menu.svg'
            alt='Next.js logo'
            width={28}
            height={12}
            priority
          />
        </div>
      </div>
      <div className={style.flex}>
        <div className='fc-custom-model-name'>
          <h1 className={style.productName}>{ name }</h1>
        </div>
        <div className='fc-custom-vm'>
          <button
            className={`${style.vmButton}  ${!vmReady ? style.disabled : ''}`}
            disabled={!vmReady}
            onClick={vmmvOnClick}
            >
            <Image
              className='fc-custom-vm-button--icon'
              src='/vm.svg'
              alt='vm logo'
              width={18}
              height={18}
              priority
            />
            <span className={style.vmLabel}>try on</span>
          </button>
        </div>
      </div>
    </div>
  );
}
