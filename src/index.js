import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import 'sanitize.css';
import './style/main.scss';

import todoContext, { TodoProvider } from './contexts/todoList';
import { VhConsumer, VhProvider } from './contexts/versionHistory';
import { ThemeProvider } from './contexts/theme';

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
            {
               id: uuidv4(),
               description: 'read a book ',
               status: 0,
            },
            {
               id: uuidv4(),
               description: 'watch a movie',
               status: 1,
            },
            {
               id: uuidv4(),
               description: 'do nothing!',
               status: 1,
            },
            {
               id: uuidv4(),
               description: 'read a story',
               status: 0,
            },
            {
               id: uuidv4(),
               description: 'run',
               status: 0,
            },
            {
               id: uuidv4(),
               description: 'lola lita',
               status: 1,
            },
            {
               id: uuidv4(),
               description: 'really?',
               status: 0,
            },
         ],
         tempList: [],
         addTodo: (description) => {
            const id = uuidv4();
            const newItem = {
               id: id,
               description,
               status: 0,
            };
            this.setState(({ todoContext }) => ({
               todoContext: {
                  ...todoContext,
                  todoList: [...todoContext.todoList, newItem],
                  tempList: todoContext.tempList.length ? [...todoContext.tempList, newItem] : [],
               },
            }));
         },
         removeTodo: (id) => {
            this.setState(({ todoContext }) => ({
               todoContext: {
                  ...todoContext,
                  todoList: todoContext.todoList.filter((todo) => todo.id !== id),
                  tempList: todoContext.tempList.filter((todo) => todo.id !== id),
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
                  tempList: todoContext.tempList.map((todo) => {
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
                  tempList: todoContext.tempList.map((todo) => {
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
         saveList: () => {
            this.setState(({ todoContext }) => ({
               todoContext: {
                  ...todoContext,
                  tempList: todoContext.todoList,
               },
            }));
         },
         restoreList: () => {
            this.setState(({ todoContext }) => ({
               todoContext: {
                  ...todoContext,
                  todoList: todoContext.tempList,
               },
            }));
         },
         filterTodo: (text) => {
            if (!this.state.todoContext.tempList.length) {
               this.state.todoContext.saveList();
            }
            this.state.todoContext.restoreList();
            this.setState(({ todoContext }) => ({
               todoContext: {
                  ...todoContext,
                  todoList: todoContext.todoList.filter((todo) => todo.description.includes(text)),
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
            {
               version: '1.2',
               date: '1595923176',
               details: 'Add search functionality',
               features: [
                  {
                     type: {
                        text: 'new',
                        id: 1,
                     },
                     list: [
                        'Add button for toggling search box',
                        'keep state of search field on each category',
                        'Use debounce method to reduce api calls',
                        'keep syncing todo list (in case of add, edit or remove any item during search)',
                     ],
                  },
               ],
            },
            {
               version: '1.3',
               date: '1596066564',
               details: 'Add Themes and improve copy link functionality',
               features: [
                  {
                     type: {
                        text: 'new',
                        id: 1,
                     },
                     list: [
                        'Add button for switching between dark and light theme',
                        'Add animation for theme switch button',
                        'Add and update all related css file for theming',
                     ],
                  },
                  {
                     type: {
                        text: 'improved',
                        id: 2,
                     },
                     list: ['Use throttle method to reduce notify function calls'],
                  },
               ],
            },
            {
               version: '2.0',
               date: '1596366564',
               details: '☕ Switched to HOOKS!',
               features: [
                  {
                     type: {
                        text: 'improved',
                        id: 2,
                     },
                     list: [
                        'Use react hooks to improve app performance wherever it was possible to do!',
                        'Sort version history list',
                     ],
                  },
               ],
            },
            {
               version: '2.1',
               date: '1596562930',
               details: 'Add and update some components',
               features: [
                  {
                     type: {
                        text: 'improved',
                        id: 2,
                     },
                     list: ['Add Sort component', 'Update hover component by custom hooks'],
                  },
               ],
            },
         ],
      },
      themeContext: {
         theme: 'light',
         switchTheme: () => {
            this.setState(({ themeContext }) => ({
               themeContext: {
                  ...themeContext,
                  theme: themeContext.theme === 'light' ? 'dark' : 'light',
               },
            }));
         },
      },
   };

   render() {
      return (
         <div className={'wrapper'}>
            <Router>
               <ThemeProvider value={this.state.themeContext}>
                  <TodoProvider value={this.state.todoContext}>
                     <VhProvider value={this.state.vhContext}>
                        <div>
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
                        </div>
                     </VhProvider>
                  </TodoProvider>
               </ThemeProvider>
            </Router>
         </div>
      );
   }
}

ReactDOM.render(<App />, document.getElementById('root'));
