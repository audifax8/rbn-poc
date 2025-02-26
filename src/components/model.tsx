import React, { useEffect, memo } from 'react';
import Image from 'next/image';

import { useSelector } from 'react-redux';

import { useConfigure } from '@/hooks/configure-context';

import style from '../css/model.module.css';

import { container } from '../../di/inversify.config';
import { IRTRService } from '../../services/RTR';
import { IAppState } from '@/constants';


const Model = memo(function () {
  const { configureService } = useConfigure();
  const { rtrReady, params: { avoidRTR } } = useSelector((state: IAppState) => state.app);
  useEffect(() => {
    if (configureService && rtrReady && !avoidRTR) {
      const rtrService = container.get<IRTRService>('IRTRService');
      const token = configureService.generateToken();
      rtrService.init(token);
      return;
    }
    if (configureService && avoidRTR) {
      const options = {
        type: 'displayCarousel',
        container: '#viewer',
        format: 'png',
        quality: 95,
        arrows: false,
        clickToConfigure: false,
        dots: false
      };
      configureService.createComponent(options);
      return;
    }
  },
  [configureService, rtrReady]);
  return (
    <section className={style.model}>
      {!configureService && !rtrReady &&
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
});

export default Model;
