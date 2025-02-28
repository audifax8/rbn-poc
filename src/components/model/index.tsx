import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useConfigure } from '@/providers/configure';
import { setRenderType } from '@/slices/app';
import { IAppState, RenderType } from '@/constants';
import { useRTR } from '@/providers/rtr';

import style from './model.module.css';
import Icon from '../common/icon';

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
        <Icon src='/img/aviator.png' alt='product preview' width={768} height={384} />
      }
      <div
        id='viewer'
        className={`${style.product} ${renderType === RenderType['2D'] ? style.center : ''}`}>
      </div>
    </section>
  );
});
export default Model;
