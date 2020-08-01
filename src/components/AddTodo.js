import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
const AddTodo = ({ addTodo }) => {
   const [description, setDescription] = React.useState('');
   const [error, setError] = React.useState(null);
   const [inputFocused, setInputFocused] = React.useState(false);
   const handleNewDescriptionChange = (e) => {
      const Description = e.target.value;
      const error = Description === '' ? "Field can't be empty" : null;
      setDescription(Description);
      setError(error);
   };
   const handleFormSubmit = (e) => {
      e.preventDefault();
      addTodo(description);
      setDescription('');
   };
   const inputFocusHandler = (state) => {
      setInputFocused(state);
   };
   return (
      <Template
         value={description}
         error={error}
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
};
export default AddTodo;
