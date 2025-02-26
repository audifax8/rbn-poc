import React from 'react';
import { useState, useEffect, memo } from 'react';
import Image from 'next/image';

import { useSelector } from 'react-redux';

import { useConfigure } from '@/hooks/configure-context';
import { IAttributeValue, ICAMap, IConfigurableAttribute } from '@/constants';

import style from '../css/menu.module.css';

interface IAttributeValuePropTypes {
  onClick: Function;
  avSelected: IAttributeValue,
  av: IAttributeValue
};

function AttributeValue(props: IAttributeValuePropTypes) {
  const { av, onClick, avSelected } = props;
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
          <div className={`${style.swatchImageBorder} ${av.id === avSelected?.id ? style.selected : ''}`}>
            <Image
              src={url}
              alt={name}
              width={40}
              height={40}
            />
          </div>
          <div>
            <span className={style.swatchName}>{name}</span>
          </div>
        </div>
      </button>
    </li>
  );
}

interface IAttributeSelectorPropTypes {
  onClick: Function;
  avSelected: IAttributeValue,
  avs: IAttributeValue[]
};

function AttributeSelector (props: IAttributeSelectorPropTypes) {
  const { avs, onClick, avSelected } = props;
  return (
    <ul className={style.attibuteSelector}>
      {avs.map((av: any) =>
        <AttributeValue key={av.id} av={av} onClick={onClick} avSelected={avSelected}/>)
      }
    </ul>
  );
};

interface IAttributeHeaderPropTypes {
  onClick: Function;
  caInfo: ICAMap
};

const AttributeHeader = memo(function (props: IAttributeHeaderPropTypes) {
  const { configureService } = useConfigure();
  const { caInfo, onClick } = props;
  const { alias, icon, selectedAvId } = caInfo;
  if (!selectedAvId) {
    return <></>
  }
  const ca = configureService.getAttributeByAlias(alias);
  const { values } = ca;
  const [menuOpen, setMenuOpen] = useState(false);
  const [avs] = useState(values);
  const avSelected = values.find((av: IAttributeValue) => av.selected);
  const click = (av: IAttributeValue) => {
    if (av.selected) { return; }
    onClick.call(null, {ca, av});
  };
  return (
    <>
      <div className={style.attibuteSelectorHeader}>
        <div className=''>
          <Image
            src={`/img/${icon}.png`}
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
      {menuOpen && avs.length &&
        <AttributeSelector avs={avs} onClick={click} avSelected={avSelected}/>
      }
    </>
  );
});

export default function Menu() {
  const { configureService } = useConfigure();
  const casToMap: ICAMap[] = [
    {
      id: null,
      alias: 'frame_sku',
      icon: 'frame',
      selectedAvId: null
    },
    {
      id: null,
      alias: 'lenses_sku',
      icon: 'lens',
      selectedAvId: null
    },    
    {
      id: null,
      alias: 'temple_tips_sku',
      icon: 'temple',
      selectedAvId: null
    },
    {
      id: null,
      alias: '',
      icon: 'temple',
      selectedAvId: null
    }
  ];

  function mapCas(): ICAMap[] {
    const sanitizedCas = casToMap.map(
      (ca: ICAMap) => {
        const { alias } = ca;
        try {
          const configurableAttibute = configureService.getAttributeByAlias(alias);
          const av = configureService.getSelectedAV(alias)
          if (configurableAttibute) {
            return {
              ...ca,
              id: configurableAttibute.id,
              selectedAvId: av.id
            };
          }
        } catch (e) {
          return undefined;
        }
      }
    ) as ICAMap[];
    return sanitizedCas.filter((ca: ICAMap) => ca);
  };

  const [casToRender, setCasTorender] = useState<ICAMap[]>(mapCas());
  const { renderMenu } = useSelector((state: any) => state.app);

  useEffect(() => {
    if (renderMenu) {
      const sanitizedCas = mapCas();
      setCasTorender(sanitizedCas);
    }
  },
  [renderMenu]);

  async function click(data: { ca: IConfigurableAttribute, av: IAttributeValue }) {
    const { ca, av } = data;
    const options = {
      ca: { alias: ca.alias },
      av: { id: av.id }
    };
    await configureService.selectValue(options);
    setCasTorender(mapCas());
  };

  return (
    <section className={style.menu}>
      {casToRender.length &&
        casToRender.map(
          (caInfo: any, index: number) => {
            return (
              <>
                <AttributeHeader key={caInfo.id} caInfo={caInfo} onClick={click}/>
                {(index < (casToRender.length - 1)) && <hr className={style.caSeparator}/>}
              </>
            );
        })
      }
    </section>
  );
};
