import React from 'react';

const todoContext = React.createContext([]);

export const TodoProvider = todoContext.Provider;
export const TodoConsumer = todoContext.Consumer;
export default todoContext;
