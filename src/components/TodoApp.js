import React from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import todoContext from '../contexts/todoList';
import TodoNav from './TodoNav';
const TodoApp = (props) => {
   const location = props.location.pathname.substr(1);
   const { addTodo } = React.useContext(todoContext);
   return <Template addTodo={addTodo} location={location} />;
};
const Template = ({ addTodo, location }) => (
   <>
      <TodoNav />
      {location !== 'completed' && <AddTodo addTodo={addTodo} />}
      <TodoList />
   </>
);

export default TodoApp;
