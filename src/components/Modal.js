import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
export const ConfirmModal = ({ isOpen, children, handleConfirm, handleCancel }) => {
   return (
      <Modal isOpen={isOpen} contentLabel="Selected Option" ariaHideApp={false} closeTimeoutMS={200} className="modal">
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
ConfirmModal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   children: PropTypes.object.isRequired,
   handleConfirm: PropTypes.func.isRequired,
   handleCancel: PropTypes.func.isRequired,
};
