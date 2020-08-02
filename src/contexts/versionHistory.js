import React from 'react';

const vhContext = React.createContext([]);

export const VhConsumer = vhContext.Consumer;
export const VhProvider = vhContext.Provider;
export default vhContext;
