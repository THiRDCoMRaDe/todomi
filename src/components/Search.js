import React from 'react';
import { TodoConsumer } from '../contexts/todoList';
import isTextSelected from '../helpers/isTextSelected';
import clearStorage from '../helpers/clearStorage';
import debounce from '../helpers/debounce';
import { css } from '@emotion/core';
import BounceLoader from 'react-spinners/BounceLoader';

window.addEventListener('load', clearStorage('oldSearchValue'));
const override = css`
   display: flex;
   margin: 0 auto;
   border-color: red;
`;
class Search extends React.Component {
   state = {
      searchValue: '',
      loader: false,
   };
   updateSearchValue = (event) => {
      this.setState({
         searchValue: event.target.value,
         loader: true,
      });
   };
   handleChange = (event, filterTodo, restoreList) => {
      filterTodo(event.target.value);
      localStorage.setItem('oldSearchValue', this.state.searchValue);
      this.setState({
         loader: false,
      });
   };
   componentDidMount() {
      this.setState({
         searchValue: localStorage.getItem('oldSearchValue') || '',
      });
   }

   render() {
      return (
         <TodoConsumer>
            {({ saveList, restoreList, filterTodo }) => {
               return (
                  <div className="search-input">
                     <input
                        type="text"
                        value={this.state.searchValue}
                        placeholder={'Type to search ...'}
                        onChange={(e) => {
                           e.persist();
                           if (!this.debouncedFn) {
                              this.debouncedFn = debounce(() => {
                                 this.handleChange(e, filterTodo, restoreList);
                              }, 500);
                           }
                           this.debouncedFn();
                           this.updateSearchValue(e);
                        }}
                     />
                     <div className="search-input__icon">
                        <BounceLoader size={20} color={'#7F5AF0'} loading={this.state.loader} />
                     </div>
                  </div>
               );
            }}
         </TodoConsumer>
      );
   }
}

export default Search;
