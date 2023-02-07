import React from 'react';

export const HomeContext = React.createContext({} as any);
export const useHomeContext = () => React.useContext(HomeContext);
