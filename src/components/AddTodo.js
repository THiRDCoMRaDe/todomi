import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends React.Component {
   addTodo = this.props.addTodo;
   state = {
      newDescription: '',
      error: null,
      inputFocused: false,
   };
   handleNewDescriptionChange = (e) => {
      const newDescription = e.target.value;
      const error = newDescription === '' ? "Field can't be empty" : null;
      this.setState({
         newDescription,
         error,
      });
   };
   handleFormSubmit = (e) => {
      e.preventDefault();
      this.addTodo(this.state.newDescription);
      this.setState({
         newDescription: '',
      });
   };
   inputFocusHandler = (state) => {
      this.setState({
         inputFocused: state,
      });
   };
   render() {
      const { newDescription, error, inputFocused } = this.state;
      return (
         <Template
            value={newDescription}
            error={error}
            focused={inputFocused}
            handleFormSubmit={this.handleFormSubmit}
            handleChange={this.handleNewDescriptionChange}
            inputFocusHandler={this.inputFocusHandler}
         />
      );
   }
}
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
