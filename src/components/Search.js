import React from 'react';
import { TodoConsumer } from '../contexts/todoList';
import isTextSelected from '../helpers/isTextSelected';
import clearStorage from '../helpers/clearStorage';
window.addEventListener('load', clearStorage('oldSearchValue'));
class Search extends React.Component {
   state = {
      searchValue: '',
   };
   handleChange = (event, filterTodo, restoreList) => {
      const value = !!event.target.value.length;
      value ? filterTodo(event.target.value) : restoreList();
      this.setState({
         searchValue: event.target.value,
      });
      localStorage.setItem('oldSearchValue', this.state.searchValue);
   };
   handleKeyUp = (event, filterTodo, restoreList) => {
      if (isTextSelected(event.target)) {
         restoreList();
         filterTodo(event.target.value);
      }
      if (event.keyCode === 8) {
         restoreList();
         filterTodo(event.target.value);
      }
      this.setState({
         searchValue: event.target.value,
      });
      localStorage.setItem('oldSearchValue', this.state.searchValue);
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
                  <div className="search">
                     <input
                        type="text"
                        value={this.state.searchValue}
                        onChange={(e) => {
                           this.handleChange(e, filterTodo, restoreList);
                        }}
                        onKeyUp={(e) => {
                           this.handleKeyUp(e, filterTodo, restoreList);
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
