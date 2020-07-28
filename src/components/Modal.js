import React from 'react';
import Modal from 'react-modal';
const customStyles = {
   content: {
      top: '50%',
      left: '50%',
   },
};
export const ConfirmModal = ({ isOpen, children, handleConfirm, handleCancel }) => {
   return (
      <Modal
         isOpen={isOpen}
         contentLabel="Selected Option"
         ariaHideApp={false}
         closeTimeoutMS={200}
         /*style={customStyles}*/
         className="modal"
      >
         <h3 className="modal__title">{children.text || 'Do you?'}</h3>
         <div className={'modal__button-wrapper'}>
            <button className={`btn btn--${children.confirmBtnStyle}`} onClick={handleConfirm}>
               {children.confirmText || 'Ok'}
            </button>
            <button className={`btn btn--${children.cancelBtnStyle}`} onClick={handleCancel}>
               {children.cancelText || 'Cancel'}
            </button>
         </div>
      </Modal>
   );
};
