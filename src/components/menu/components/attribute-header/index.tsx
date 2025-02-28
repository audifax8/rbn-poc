import React from 'react';
import { useState, memo } from 'react';

import { useConfigure } from '@/providers/configure';
import { IAttributeValue, ICAMap } from '@/constants';

import Icon from '@/components/common/icon';

import style from './attribute-header.module.css';
import AttributeSelector from '../attribute-selector';
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
      <div className={style.attributeHeader} key={id}>
        <div>
          <Icon src={`/img/${icon}.png`} alt={`configurable attribute ${icon}`} width={48} height={48} />
        </div>
        <div>
          <span className={style.caName}>{ca?.name}</span>
        </div>
        <div >
          <span className={style.avName}>{avSelected?.name}</span>
        </div>
        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon src={`/arrow-${ menuOpen ? 'up' : 'down'}.svg`} alt={`arrow ${ menuOpen ? 'up' : 'down'} icon`} width={16} height={16} />
          </button>
        </div>
      </div>
      {menuOpen && avs.length &&
        <AttributeSelector avs={avs} onClick={click} avSelected={avSelected}/>
      }
    </>
  );
});

export default AttributeHeader;