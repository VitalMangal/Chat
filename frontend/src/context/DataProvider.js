import React, { useMemo } from 'react';
import * as filter from 'leo-profanity';
import { io } from 'socket.io-client';
import DataContext from './DataContext';

const DataProvider = ({ children }) => {
  const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
  const socket = io(URL, {
    autoConnect: false,
  });

  filter.add(filter.getDictionary('ru'));

  const props = useMemo(() => ({ filter, socket }), [socket]);
  return (
    <DataContext.Provider value={props}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
