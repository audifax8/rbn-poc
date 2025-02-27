import React from 'react';

import Icon from '@/components/common/icon';
import { IAttributeValue } from '@/constants';

import style from './swatch.module.css';

interface IAttributeValuePropTypes {
  onClick: Function;
  avSelected: IAttributeValue,
  av: IAttributeValue
};

function Swatch(props: IAttributeValuePropTypes) {
  const { av, onClick, avSelected } = props;
  const { name, active, selectable, url, id, vendorId } = av;
  const click = (e: any) => {
    e.preventDefault();
    onClick.call(null, av);
  };
  return (active && selectable && url &&
    <li key={id}>
      <button onClick={click} key={id}>
        <div className={style.swatch}>
          <div className={`${style.swatchImageBorder} ${av.id === avSelected?.id ? style.selected : ''}`}>
            <Icon src={url} alt={`option ${name}`} width={40} height={40} />
          </div>
          <div>
            <span id={vendorId} className={style.swatchName}>{name}</span>
          </div>
        </div>
      </button>
    </li>
  );
};

export default Swatch;
