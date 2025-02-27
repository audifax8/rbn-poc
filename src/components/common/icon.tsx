import React from 'react';
import Image from 'next/image';

import { IIcon } from '@/constants';

export default function Icon(props: IIcon) {
  const { src, alt, width, height } = props;
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority
    />
  );
};
