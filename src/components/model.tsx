import React from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { useSelector } from 'react-redux';

import style from '../css/model.module.css';

import { container } from '../../di/inversify.config';
import { IRTRService } from '../../services/RTR';

export default function Model() {
  const { configureReady, rtrReady } = useSelector((state: any) => state.app);
  const searchParams = useSearchParams();
  const avoidRTR = searchParams.get('avoidRTR');
  useEffect(() => {
    if (configureReady && rtrReady && !avoidRTR) {
      const rtrService = container.get<IRTRService>('IRTRService');
      rtrService.init(window._configure);
      return;
    }
    if (configureReady && avoidRTR) {
      const options = {
        type: 'displayCarousel',
        container: '#viewer',
        format: 'png',
        quality: 95,
        arrows: false,
        clickToConfigure: false,
        dots: false
      };
      window._configure.run('createComponent', options, () => {});
      return;
    }
  },
  [configureReady, rtrReady]);
  return (
    <section className={style.model}>
      {!configureReady && !rtrReady &&
        <Image
          className=''
          src='/img/aviator.png'
          alt='Next.js logo'
          width={768}
          height={384}
          priority
        />
      }
      <div className={style.product}>
        <div id='viewer' className={style.fcCarousel}></div>
      </div>
    </section>
  );
};
