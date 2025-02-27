import React from 'react';

import style from './loader.module.css';
import Icon from '../common/icon';

export default function Loader() {
  return (
    <section className={style.loader}>
      <Icon src='/img/loader.png' alt='loader' width={794} height={449} />
    </section>
  );
};