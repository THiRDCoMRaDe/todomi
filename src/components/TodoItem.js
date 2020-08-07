import React from 'react';
import PropTypes from 'prop-types';
import { AiFillCheckSquare, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import { ConfirmModal } from './Modal';

const Template = ({
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
}) => {
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
   handleModalOpen: PropTypes.func.isRequired,
   modalOpen: PropTypes.bool.isRequired,
};

const TodoItem = ({ status, id, description: propDescription, toggleStatus, removeTodo, updateTodo }) => {
   const [description, setDescription] = React.useState(propDescription);
   const [editable, setEditable] = React.useState(false);
   const [modalOpen, setModalOpen] = React.useState(false);
   const handleToggleStatus = () => {
      toggleStatus(id);
   };
   const handleDelete = () => {
      removeTodo(id);
   };
   const handleToggleEdit = () => {
      setEditable((prev) => {
         return !prev;
      });
   };
   const handleTodoChange = (event) => {
      setDescription(event.target.value);
   };
   const handleUpdateTodo = (update) => {
      updateTodo(update);
      handleToggleEdit();
   };
   const handleModalOpen = (state) => {
      setModalOpen(state);
   };
   return (
      <Template
         id={id}
         description={description}
         status={status}
         handleToggleStatus={handleToggleStatus}
         handleDelete={handleDelete}
         handleToggleEdit={handleToggleEdit}
         handleTodoChange={handleTodoChange}
         handleUpdateTodo={handleUpdateTodo}
         editable={editable}
         modalOpen={modalOpen}
         handleModalOpen={handleModalOpen}
      />
   );
};
TodoItem.propTypes = {
   id: PropTypes.string.isRequired,
   description: PropTypes.string.isRequired,
   status: PropTypes.number.isRequired,
   removeTodo: PropTypes.func.isRequired,
   toggleStatus: PropTypes.func.isRequired,
   updateTodo: PropTypes.func.isRequired,
};

export default TodoItem;
