import { createContext, useContext, useState } from 'react';

import { IVMMVService } from '../../services/VMMV';

const VMMVContext = createContext({});

export function useVMMV(): any {
  return useContext(VMMVContext);
}

export function VMMVProvider(props: any) {
  const { children } = props;
  const [vmmvService, setVMMVService] = useState<IVMMVService>();
  const value = { vmmvService, setVMMVService };
  return (
    <VMMVContext.Provider value={value}>
      {children}
    </VMMVContext.Provider>
  );
};
