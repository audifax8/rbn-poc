import React from 'react';
import { useState, memo } from 'react';

import { useConfigure } from '@/hooks/configure-context';
import { IAttributeValue, ICAMap } from '@/constants';

import Icon from '@/components/common/icon';

import style from './attribute-header.module.css';

interface IAttributeHeaderPropTypes {
  onClick: Function;
  caInfo: ICAMap
};

const AttributeHeader = memo(function (props: IAttributeHeaderPropTypes) {
  const { configureService } = useConfigure();
  const { caInfo, onClick } = props;
  const { alias, icon, selectedAvId, id } = caInfo;
  if (!selectedAvId) {
    return <></>
  }
  const ca = configureService.getAttributeByAlias(alias);
  const { values } = ca;
  const [menuOpen, setMenuOpen] = useState(false);
  const [avs] = useState(values);
  const avSelected = values.find((av: IAttributeValue) => av.selected);
  const click = (av: IAttributeValue) => {
    onClick.call(null, {ca, av});
  };
  return (
    <>
      <li className={style.attributeHeader} key={id}>
        <div className=''>
          <Icon src={`/img/${icon}.png`} alt={`configurable attribute ${icon}`} width={48} height={48} />
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
              <Icon src={`/arrow-${ menuOpen ? 'up' : 'down'}.svg`} alt={`arrow ${ menuOpen ? 'up' : 'down'} icon`} width={16} height={16} />
          </button>
        </div>
      </li>
    </>
  );
});

export default AttributeHeader;