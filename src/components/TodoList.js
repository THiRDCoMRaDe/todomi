import React from 'react';
import { useLocation, Route, Redirect } from 'react-router-dom';
import todoContext, { TodoConsumer } from '../contexts/todoList';
import TodoItem from './TodoItem';
import { AiFillWarning } from 'react-icons/ai';
import PerfectScrollbar from 'react-perfect-scrollbar';

const TodoList = () => {
   const location = useLocation().pathname.substr(1);
   const { todoList, removeTodo, toggleStatus, updateTodo } = React.useContext(todoContext);
   const renderTodo = (todo) => (
      <TodoItem {...todo} removeTodo={removeTodo} toggleStatus={toggleStatus} updateTodo={updateTodo} />
   );
   const renderSwitch = () => {
      switch (location) {
         case '':
            return todoList.length ? (
               todoList.map((todo, i) => {
                  return (
                     <li className={'todo-list__item item'} key={todo.id}>
                        {renderTodo(todo)}
                     </li>
                  );
               })
            ) : (
               <div className={'todo-list__msg msg'}>
                  <AiFillWarning className={'msg__icon'} />
                  <span className={'msg__text'}>there is no item to show</span>
               </div>
            );
         case 'completed':
            return todoList.filter((todo) => todo.status === 1).length ? (
               todoList
                  .filter((todo) => todo.status === 1)
                  .map((todo) => {
                     return (
                        <li className={'todo-list__item item'} key={todo.id}>
                           {renderTodo(todo)}
                        </li>
                     );
                  })
            ) : (
               <div className={'todo-list__msg msg'}>
                  <AiFillWarning className={'msg__icon'} />
                  <span className={'msg__text'}>there is no completed item to show</span>
               </div>
            );
         case 'incomplete':
            return todoList.filter((todo) => todo.status === 0).length ? (
               todoList
                  .filter((todo) => todo.status === 0)
                  .map((todo) => {
                     return (
                        <li className={'todo-list__item item'} key={todo.id}>
                           {renderTodo(todo)}
                        </li>
                     );
                  })
            ) : (
               <div className={'todo-list__msg msg'}>
                  <AiFillWarning className={'msg__icon'} />
                  <span className={'msg__text'}>there is no incomplete item to show</span>
               </div>
            );
         default:
            return null;
      }
   };
   return (
      <PerfectScrollbar className={'todo-wrapper--scroll'}>
         <ul className={'todo-list'}>{renderSwitch()}</ul>
      </PerfectScrollbar>
   );
};

export default TodoList;
