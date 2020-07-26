import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import 'sanitize.css';
import './style/main.scss';

import { TodoProvider } from './contexts/todoList';
import { VhConsumer, VhProvider } from './contexts/versionHistory';

import Header from './components/Header';
import VersionHistory from './components/VersionHistory';

const VersionsHistoryList = React.lazy(() => import('./components/VersionsHistoryList'));
const TodoApp = React.lazy(() => import('./components/TodoApp'));
const NotFound = React.lazy(() => import('./components/NotFound'));

class App extends React.Component {
   state = {
      todoContext: {
         todoList: [
            {
               id: uuidv4(),
               description: 'write a book',
               status: 1,
            },
            {
               id: uuidv4(),
               description: 'read',
               status: 0,
            },
         ],
         addTodo: (description) => {
            const id = uuidv4();
            this.setState(({ todoContext }) => ({
               todoContext: {
                  ...todoContext,
                  todoList: [
                     ...todoContext.todoList,
                     {
                        id: id,
                        description,
                        status: 0,
                     },
                  ],
               },
            }));
         },
         removeTodo: (id) => {
            this.setState(({ todoContext }) => ({
               todoContext: {
                  ...todoContext,
                  todoList: todoContext.todoList.filter((todo) => todo.id !== id),
               },
            }));
         },
         toggleStatus: (id) => {
            this.setState(({ todoContext }) => ({
               todoContext: {
                  ...todoContext,
                  todoList: todoContext.todoList.map((todo) => {
                     if (todo.id === id) {
                        return {
                           ...todo,
                           status: todo.status === 1 ? 0 : 1,
                        };
                     } else {
                        return todo;
                     }
                  }),
               },
            }));
         },
         updateTodo: ({ id, description }) => {
            this.setState(({ todoContext }) => ({
               todoContext: {
                  ...todoContext,
                  todoList: todoContext.todoList.map((todo) => {
                     if (todo.id === id) {
                        return {
                           ...todo,
                           id,
                           description,
                        };
                     } else {
                        return todo;
                     }
                  }),
               },
            }));
         },
      },
      vhContext: {
         updateLogs: [
            {
               version: '1.0',
               date: '1593718200',
               details: '🚀 First release',
               features: [
                  {
                     type: {
                        text: 'new',
                        id: 1,
                     },
                     list: ['Add Todo', 'Update Todo', 'Remove Todo'],
                  },
               ],
            },
            {
               version: '1.1',
               date: '1595755798',
               details: 'Update codebase to improve UX',
               features: [
                  {
                     type: {
                        text: 'improved',
                        id: 2,
                     },
                     list: ['Conditional rendering for each list to show warning message'],
                  },
                  {
                     type: {
                        text: 'new',
                        id: 1,
                     },
                     list: [
                        'Show notification on copy link in individual update card',
                        "Add doubleClick functionality to each item's input",
                     ],
                  },
               ],
            },
         ],
      },
   };

   render() {
      return (
         <div className={'wrapper'}>
            <Router>
               <TodoProvider value={this.state.todoContext}>
                  <VhProvider value={this.state.vhContext}>
                     <Header />
                     <React.Suspense fallback={<h1>Loading...</h1>}>
                        <Switch>
                           <Route path={'/'} exact key={'all'} component={TodoApp} />
                           <Route path={'/completed'} key={'completed'} component={TodoApp} />
                           <Route path={'/incomplete'} key={'incomplete'} component={TodoApp} />
                           <Route path="/releases-info" exact component={VersionsHistoryList} />
                           <Route
                              path="/releases-info/:id/"
                              render={(props) => (
                                 <VhConsumer>
                                    {({ updateLogs }) => {
                                       const update = updateLogs.find((update) => update.version === props.match.params.id);
                                       return update ? (
                                          <>
                                             <Link className={'releases-info-title-link'} to={'/releases-info'}>
                                                {'<'} Back to releases
                                             </Link>
                                             <VersionHistory update={update} {...props}>
                                                {{
                                                   link: update.version,
                                                }}
                                             </VersionHistory>
                                          </>
                                       ) : (
                                          <Redirect
                                             to={{
                                                pathname: '/404',
                                                state: { from: props.location },
                                             }}
                                          />
                                       );
                                    }}
                                 </VhConsumer>
                              )}
                           />
                           <Route path="/404" component={NotFound} />
                           <Route
                              render={({ location }) => (
                                 <Redirect
                                    to={{
                                       pathname: '/404',
                                       state: { from: location },
                                    }}
                                 />
                              )}
                           />
                        </Switch>
                     </React.Suspense>
                  </VhProvider>
               </TodoProvider>
            </Router>
         </div>
      );
   }
}

ReactDOM.render(<App />, document.getElementById('root'));
