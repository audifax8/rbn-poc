import React from "react";
import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import style from '../css/menu.module.css';

export default function Menu() {
  const { configureReady } = useSelector((state: any) => state.app);
  useEffect(() => {
    if (configureReady) {
      //window._configure.run('createComponent', options, () => {});
    }
  },
  [configureReady]);
  return (
    <section className={style.menu}>
    </section>
  );
};