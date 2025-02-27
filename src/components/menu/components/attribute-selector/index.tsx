import { IAttributeValue } from '@/constants';
import React from 'react';

import style from './attribute-selector.module.css';
interface IAttributeSelectorPropTypes {
  onClick: Function;
  avSelected: IAttributeValue,
  avs: IAttributeValue[]
};

const AttributeSelector = function (props: IAttributeSelectorPropTypes) {
  const { avs, onClick, avSelected } = props;
  return (
    <ul className={style.attributeSelector}>
      {avs.map((av: IAttributeValue) => <></>)}
    </ul>
  );
};

export default AttributeSelector;