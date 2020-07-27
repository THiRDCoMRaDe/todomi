import React from 'react';
import { TodoConsumer } from '../contexts/todoList';
import isTextSelected from '../helpers/isTextSelected';
function once(fn, context) {
   let result;

   return function () {
      console.log('t');
      if (fn) {
         result = fn.apply(context || this, arguments);
         fn = null;
      }
      return result;
   };
}

class Search extends React.Component {
   search = () => {};

   render() {
      return (
         <TodoConsumer>
            {({ saveList, restoreList, filterTodo }) => {
               return (
                  <div className="search">
                     <input
                        type="text"
                        onChange={(e) => {
                           const value = !!e.target.value.length;
                           value ? filterTodo(e.target.value) : restoreList();
                        }}
                        onFocus={(e) => {}}
                        onKeyUp={(e) => {
                           if (isTextSelected(e.target)) {
                              restoreList();
                              filterTodo(e.target.value);
                           }
                           if (e.keyCode === 8) {
                              restoreList();
                              filterTodo(e.target.value);
                           }
                        }}
                     />
                  </div>
               );
            }}
         </TodoConsumer>
      );
   }
}

export default Search;
