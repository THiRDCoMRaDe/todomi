import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AiFillCheckSquare, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import { ConfirmModal } from './Modal';

class TodoItem extends React.Component {
   id = this.props.id;
   description = this.props.description;
   state = {
      description: this.description,
      editable: false,
      modalOpen: false,
   };
   handleToggleStatus = () => {
      this.props.toggleStatus(this.id);
   };
   handleDelete = () => {
      this.props.removeTodo(this.id);
   };
   handleToggleEdit = () => {
      this.setState(({ editable }) => ({
         editable: !editable,
      }));
   };
   handleTodoChange = (event) => {
      this.setState({
         description: event.target.value,
      });
   };
   handleUpdateTodo = (update) => {
      this.props.updateTodo(update);
      this.handleToggleEdit();
   };
   handleModalOpen = (state) => {
      this.setState({ modalOpen: state });
   };
   render() {
      const { status, id } = this.props;
      const { description, editable, modalOpen } = this.state;
      return (
         <Template
            id={id}
            description={description}
            status={status}
            handleToggleStatus={this.handleToggleStatus}
            handleDelete={this.handleDelete}
            handleToggleEdit={this.handleToggleEdit}
            handleTodoChange={this.handleTodoChange}
            handleUpdateTodo={this.handleUpdateTodo}
            editable={editable}
            modalOpen={modalOpen}
            handleModalOpen={this.handleModalOpen}
         />
      );
   }
}
TodoItem.propTypes = {
   id: PropTypes.string.isRequired,
   description: PropTypes.string.isRequired,
   status: PropTypes.number.isRequired,
   removeTodo: PropTypes.func.isRequired,
   toggleStatus: PropTypes.func.isRequired,
   updateTodo: PropTypes.func.isRequired,
};

const Template = (props) => {
   const {
      id,
      description,
      status,
      handleToggleStatus,
      handleDelete,
      handleToggleEdit,
      handleTodoChange,
      handleUpdateTodo,
      handleModalOpen,
      editable,
      modalOpen,
   } = props;
   return (
      <>
         <span className={'item__icon'}>
            {status ? (
               <AiFillCheckSquare size={25} onClick={handleToggleStatus} className={'item__icon--check-on'} />
            ) : (
               <AiFillCheckSquare size={25} onClick={handleToggleStatus} className={'item__icon--check-off'} />
            )}
         </span>
         <input
            className={'item__input'}
            type="text"
            readOnly={!editable}
            value={description}
            onDoubleClick={() => handleToggleEdit()}
            onChange={handleTodoChange}
            onKeyUp={(e) => {
               e.keyCode === 13 && handleUpdateTodo({ id, description });
            }}
         />
         <span className={'item__icon'}>
            {editable ? (
               <AiTwotoneEdit
                  size={15}
                  onClick={() => {
                     handleUpdateTodo({ id, description });
                  }}
                  className={'item__icon--edit-on'}
               />
            ) : (
               <AiTwotoneEdit size={15} onClick={handleToggleEdit} className={'item__icon--edit-off'} />
            )}
         </span>
         <span className={'item__icon'}>
            <AiFillDelete size={15} onClick={() => handleModalOpen(true)} className={'item__icon--delete'} />
         </span>
         <ConfirmModal isOpen={modalOpen} handleConfirm={handleDelete} handleCancel={() => handleModalOpen(false)}>
            {{
               text: `Do you really want to delete "${description}" item?`,
               confirmText: 'yes',
               confirmBtnStyle: 'danger',
               cancelText: 'no',
               cancelBtnStyle: 'secondary',
            }}
         </ConfirmModal>
      </>
   );
};
Template.propTypes = {
   id: PropTypes.string.isRequired,
   description: PropTypes.string.isRequired,
   status: PropTypes.number.isRequired,
   editable: PropTypes.bool.isRequired,
   handleToggleStatus: PropTypes.func.isRequired,
   handleDelete: PropTypes.func.isRequired,
   handleToggleEdit: PropTypes.func.isRequired,
   handleTodoChange: PropTypes.func.isRequired,
   handleUpdateTodo: PropTypes.func.isRequired,
};
export default TodoItem;
