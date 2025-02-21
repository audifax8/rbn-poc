import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';

import { useSelector } from 'react-redux';

import style from '../css/menu.module.css';

const alias = 'lenses_sku';

function AV({ av, onClick }) {
  const { name, active, selectable, url, id } = av;
  const click = (e: any) => {
    e.preventDefault();
    if (av.selected) { return; }
    onClick.call(null, av);
  };
  return (active && selectable && url &&
    <li key={id}>
      <button onClick={click} key={id}>
        <div className={style.swatch}>
          <div className={`${style.swatchImageBorder} ${av.selected ? style.selected : ''}`}>
            <Image
              src={url}
              alt={name}
              width={40}
              height={40}
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

function AttributeSelector ({ avs, onClick }) {
  return (
    <ul className={style.attibuteSelector}>
      {avs.map((av: any) => <AV av={av} onClick={onClick}/>)}
    </ul>
  );
};

function AttributeHeader ({ ca }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { values } = ca;
  const [avs, setValues] = useState(values);
  const avSelected = values.find((av: any) => av.selected);
  const onClick = (e: any) => {
    const options = {
      ca: { alias },
      av: { id: e.id }
    };
    window._configure.run(
      'selectValue',
      options,
      (err: any) => {
        if (err) {
          return;
        }
        const frameCa = window._configure.run('getAttribute', { alias });
        const { values } = frameCa;
        setValues(values);
      });
  };
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
      {menuOpen && avs.length && <AttributeSelector avs={avs} onClick={onClick}/>}
    </>
  );
}

export default function Menu() {
  const [ca, setCa] = useState(null);
  const { renderMenu } = useSelector((state: any) => state.app);
  useEffect(() => {
    if (renderMenu) {
      try {
        const frameCa = window._configure.run('getAttribute', { alias });
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