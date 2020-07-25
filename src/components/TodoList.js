import React from 'react';
import { useLocation, Route, Redirect } from 'react-router-dom';
import { TodoConsumer } from '../contexts/todoList';
import TodoItem from './TodoItem';
import NotFound from './NotFound';

const TodoList = () => {
   const location = useLocation().pathname.substr(1);
   return (
      <TodoConsumer>
         {({ todoList, removeTodo, toggleStatus, updateTodo }) => {
            return (
               <ul className={'todo-list'}>
                  {todoList.map((todo, i) => {
                     const todoItemRef = (
                        <TodoItem {...todo} removeTodo={removeTodo} toggleStatus={toggleStatus} updateTodo={updateTodo} />
                     );
                     switch (location) {
                        case '':
                           return (
                              <li className={'todo-list__item item'} key={todo.id}>
                                 {todoItemRef}
                              </li>
                           );
                        case 'completed':
                           return (
                              todo.status === 1 && (
                                 <li className={'todo-list__item item'} key={todo.id}>
                                    {todoItemRef}
                                 </li>
                              )
                           );
                        case 'incomplete':
                           return (
                              todo.status === 0 && (
                                 <li className={'todo-list__item item'} key={todo.id}>
                                    {todoItemRef}
                                 </li>
                              )
                           );
                        default:
                           return null;
                     }
                  })}
               </ul>
            );
         }}
      </TodoConsumer>
   );
};

export default TodoList;
