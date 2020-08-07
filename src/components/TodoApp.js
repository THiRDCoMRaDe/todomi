import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import todoContext from '../contexts/todoList';
import TodoNav from './TodoNav';

const Template = ({ addTodo, location }) => (
   <>
      <TodoNav />
      {location !== 'completed' && <AddTodo addTodo={addTodo} />}
      <TodoList />
   </>
);
Template.propTypes = {
   addTodo: PropTypes.func.isRequired,
   location: PropTypes.string.isRequired,
};

const TodoApp = ({ location }) => {
   const categoryFromLocation = location.pathname.substr(1);
   const { addTodo } = React.useContext(todoContext);
   return <Template addTodo={addTodo} location={categoryFromLocation} />;
};
TodoApp.propTypes = {
   location: PropTypes.object.isRequired,
};

export default TodoApp;
