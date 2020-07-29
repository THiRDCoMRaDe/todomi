import React from 'react';
import todoContext from './todoList';

const themeContext = React.createContext();
export const ThemeProvider = themeContext.Provider;
export const ThemeConsumer = themeContext.Consumer;
export default themeContext;
