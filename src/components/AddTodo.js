import React from 'react';
import PropTypes from 'prop-types';

const Template = (props) => {
   const { value, handleFormSubmit, handleChange, inputFocusHandler, error, focused } = props;
   return (
      <form className={`add-todo ${focused && !!error ? 'add-todo--error' : ''}`} onSubmit={handleFormSubmit} id={'addForm'}>
         <div className={'add-todo__wrapper'}>
            <input
               className={'add-todo__input'}
               value={value}
               onChange={handleChange}
               type="text"
               placeholder={'Enter a task ...'}
               onBlur={() => {
                  inputFocusHandler(false);
               }}
               onFocus={() => {
                  inputFocusHandler(true);
               }}
            />
            <button className={'add-todo__button'} form={'addForm'} disabled={!value}>
               ADD
            </button>
         </div>
         {focused && !!error && <span className={'add-todo__error'}>{error}</span>}
      </form>
   );
};
Template.propTypes = {
   value: PropTypes.string.isRequired,
   error: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.oneOf([null]).isRequired]),
   handleFormSubmit: PropTypes.func.isRequired,
   handleChange: PropTypes.func.isRequired,
   focused: PropTypes.bool.isRequired,
   inputFocusHandler: PropTypes.func.isRequired,
};

const initialState = { description: '', error: null };
const reducer = (state, action) => {
   switch (action.type) {
      case 'update_description':
         return {
            description: action.description,
            error: action.error,
         };
      case 'submit_form':
         return {
            description: action.description,
            error: action.error,
         };
      default:
         throw new Error();
   }
};

const AddTodo = ({ addTodo }) => {
   const [state, dispatch] = React.useReducer(reducer, initialState);
   const [inputFocused, setInputFocused] = React.useState(false);
   const handleNewDescriptionChange = (e) => {
      const description = e.target.value;
      const error = description === '' ? "Field can't be empty" : null;
      dispatch({
         type: 'update_description',
         description,
         error,
      });
   };
   const handleFormSubmit = (e) => {
      e.preventDefault();
      addTodo(state.description);
      dispatch({
         type: 'submit_form',
         description: '',
         error: null,
      });
   };
   const inputFocusHandler = (state) => {
      setInputFocused(state);
   };
   return (
      <Template
         value={state.description}
         error={state.error}
         focused={inputFocused}
         handleFormSubmit={handleFormSubmit}
         handleChange={handleNewDescriptionChange}
         inputFocusHandler={inputFocusHandler}
      />
   );
};
AddTodo.propTypes = {
   addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
