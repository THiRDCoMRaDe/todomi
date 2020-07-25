import React from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { TodoConsumer } from '../contexts/todoList';
import TodoNav from './TodoNav';

class TodoApp extends React.Component {
   state = {
      location: this.props.location.pathname.substr(1),
   };

   render() {
      return (
         <TodoConsumer>
            {({ addTodo }) => {
               return <Template addTodo={addTodo} location={this.state.location} />;
            }}
         </TodoConsumer>
      );
   }
}

const Template = ({ addTodo, location }) => (
   <>
      <TodoNav />
      {location !== 'completed' && <AddTodo addTodo={addTodo} />}
      <TodoList />
   </>
);

export default TodoApp;
