import { createContext, useContext, useState } from 'react';

import { IRXCService } from '../../services/RXC';

const RXCContext = createContext({});

export function useRXC(): any {
  return useContext(RXCContext);
}
export function RXCProvider(props: any) {
  const { children } = props;
  const [rxcService, setRXCService] = useState<IRXCService>();
  const value = { rxcService, setRXCService };
  return (
    <RXCContext.Provider value={value}>
      {children}
    </RXCContext.Provider>
  );
}
