import React, { useEffect, memo } from 'react';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';

import { useConfigure } from '@/hooks/configure-context';
import { setRenderType } from '@/slices/app';
import { IAppState, RenderType } from '@/constants';
import { useRTR } from '@/hooks/rtr';

import style from '../css/model.module.css';

const Model = memo(function () {
  const dispatch = useDispatch();
  const { configureService } = useConfigure();
  const { rtrService } = useRTR();
  const {
    rtrReady,
    renderType,
    params: { avoidRTR, useImage }
  } = useSelector((state: IAppState) => state.app);

  useEffect(() => {
    if (configureService && rtrReady && !avoidRTR) {
      dispatch(setRenderType({
        renderType: useImage ? RenderType['2D'] : RenderType['3D']
      }));
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
      <div
        id='viewer'
        className={`${style.product} ${renderType === RenderType['2D'] ? style.center : ''}`}>
      </div>
    </section>
  );
});
export default Model;
