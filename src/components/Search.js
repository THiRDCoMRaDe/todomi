import React from 'react';
import todoContext from '../contexts/todoList';
import clearStorage from '../helpers/clearStorage';
import debounce from '../helpers/debounce';
import { css } from '@emotion/core';
import BounceLoader from 'react-spinners/BounceLoader';

window.addEventListener('load', clearStorage('oldSearchValue'));
const Search = () => {
   const [searchValue, setSearchValue] = React.useState('');
   const [loader, setLoader] = React.useState(false);
   const updateResult = (event, filterTodo) => {
      filterTodo(event.target.value);
      setLoader(false);
   };
   const handleChange = (event) => {
      setSearchValue(event.target.value);
      localStorage.setItem('oldSearchValue', event.target.value);
      setLoader(true);
   };
   React.useEffect(() => {
      setSearchValue(localStorage.getItem('oldSearchValue') || '');
   });
   const { restoreList, filterTodo } = React.useContext(todoContext);
   return (
      <div className="search-input">
         <input
            type="text"
            value={searchValue}
            placeholder={'Type to search ...'}
            onChange={(e) => {
               e.persist();
               let debouncedFn;
               if (!debouncedFn) {
                  debouncedFn = debounce(() => {
                     updateResult(e, filterTodo, restoreList);
                  }, 500);
               }
               debouncedFn();
               handleChange(e);
            }}
         />
         <div className="search-input__icon">
            <BounceLoader size={20} color={'#7F5AF0'} loading={loader} />
         </div>
      </div>
   );
};
export default Search;
