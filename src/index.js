import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import 'sanitize.css';
import './style/main.scss';

import { TodoProvider } from './contexts/todoList';
import { VhConsumer, VhProvider } from './contexts/versionHistory';

import Header from './components/Header';
import VersionsHistoryList from './components/VersionsHistoryList';
import VersionHistory from './components/VersionHistory';
// import TodoApp from './components/TodoApp';

const VersionsHistory = React.lazy(() => import('./components/VersionsHistoryList'));
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
               details:
                  "We are super excited to announce Changefeed v2! We spent the last six months iterating and testing these features, and today they're finally ready to be used by all of you",
               features: [
                  {
                     type: {
                        text: 'New',
                        id: 1,
                     },
                     list: ['Mystery feature #1', 'Mystery feature #2', 'Mystery feature #3'],
                  },
               ],
            },
            {
               version: '1.1',
               date: '1593908200',
               details:
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
               features: [
                  {
                     type: {
                        text: 'New',
                        id: 1,
                     },
                     list: ['Mystery feature #4', 'Mystery feature #5', 'Mystery feature #6'],
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
