import {  createContext, useContext, useState } from 'react';

import { IRTRService } from '../../services/RTR';

const RTRContext = createContext({});

export function useRTR(): any {
  return useContext(RTRContext);
}
export function RTRProvider(props: any) {
  const { children } = props;
  const [rtrService, setRTRService] = useState<IRTRService>();
  const value = { rtrService, setRTRService };
  return (
    <RTRContext.Provider value={value}>
      {children}
    </RTRContext.Provider>
  );
}
