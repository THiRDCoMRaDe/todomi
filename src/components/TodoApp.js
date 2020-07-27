import React from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import todoContext, { TodoConsumer } from '../contexts/todoList';
import TodoNav from './TodoNav';
import Search from './Search';

class TodoApp extends React.Component {
   state = {
      location: this.props.location.pathname.substr(1),
   };
   componentDidMount() {
      let todoContext = this.context;
      /*todoContext.saveList();
      todoContext.restoreList();
      console.log(todoContext);*/
   }

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
TodoApp.contextType = todoContext;
const Template = ({ addTodo, location }) => (
   <>
      <TodoNav />
      <Search />
      {location !== 'completed' && <AddTodo addTodo={addTodo} />}
      <TodoList />
   </>
);

export default TodoApp;
