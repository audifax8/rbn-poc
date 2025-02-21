import React from "react";
import { useEffect } from 'react';
import { useState } from 'react';
import Image from "next/image";

import { useSelector } from 'react-redux';

import style from '../css/menu.module.css';

function AV({ av, onClick }) {
  const { name, active, selectable, url, id } = av;
  return (active && selectable && url &&
    <li key={id}>
      <button onClick={onClick} key={id}>
        <div className={style.swatch}>
          <div>
            <Image
              src={url}
              alt={name}
              width={40}
              height={40}
              priority
              unoptimized={true}
            />
          </div>
          <div>
            <span>{name}</span>
          </div>
        </div>
      </button>
    </li>
  );
}

function AttributeSelector ({ avs }) {
  return (
    <ul className={style.attibuteSelector}>
      {avs.map((av: any) => <AV av={av} onClick={() => console.log('click')}/>)}
    </ul>
  );
};

function AttributeHeader ({ ca }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { values } = ca;
  const avSelected = values.find((av: any) => av.selected);
  return (
    <>
      <div className={style.attibuteSelectorHeader}>
        <div className=''>
          <Image
            src='/img/lenses.png'
            alt=''
            width={48}
            height={48}
            priority
            unoptimized={true}
          />
        </div>
        <div className=''>
          <span className={style.caName}>{ca?.name}</span>
        </div>
        <div className=''>
          <span className={style.avName}>{avSelected?.name}</span>
        </div>
        <div className=''>
          <button
            className={``}
            onClick={() => setMenuOpen(!menuOpen)}
            >
              <Image
                src={`/arrow-${ menuOpen ? 'up' : 'down'}.svg`}
                alt=''
                width={16}
                height={16}
                priority
              />
          </button>
        </div>
      </div>
      {menuOpen && values.length && <AttributeSelector avs={values}/>}
    </>
  );
}

export default function Menu() {
  const [ca, setCa] = useState(null);
  const { renderMenu } = useSelector((state: any) => state.app);
  useEffect(() => {
    if (renderMenu) {
      try {
        const frameCa = window._configure.run('getAttribute', { alias: 'lenses_sku' });
        if (!frameCa) {
          return;
        }
        setCa(frameCa);
      } catch (e) {
      }
    }
  },
  [renderMenu]);
  return (
    <section className={style.menu}>
      {ca && <AttributeHeader ca={ca}/>}
    </section>
  );
};