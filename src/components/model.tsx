import React from "react";
import { useEffect } from 'react';
import Image from "next/image";

import { useSelector } from 'react-redux';

import style from '../css/model.module.css';

export default function Model() {
  const { configureReady, rtrReady } = useSelector((state: any) => state.app);
  useEffect(() => {
    if (configureReady && !rtrReady) {
      const options = {
        type: 'displayCarousel',
        container: '.fc-carousel',
        format: 'png',
        quality: 95,
        arrows: false,
        clickToConfigure: false,
        dots: false
      };
      window._configure.run('createComponent', options, () => {});
    }
  },
  [configureReady, rtrReady]);
  return (
    <section className={style.model}>
      <div className={`${style.fcCarousel} fc-carousel`}></div>
      {!configureReady && !rtrReady &&
        <Image
          className=""
          src="/img/aviator.png"
          alt="Next.js logo"
          width={768}
          height={384}
          priority
        />
      }
    </section>
  );
};