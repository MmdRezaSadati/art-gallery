import React from 'react';
import './Modal.css';

// It accepts a title, children, and onConfirm/onCancel callbacks.
const Modal = ({ title, children, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-content">{children}</div>
        <div className="modal-buttons">
          {onCancel && (
            <button className="modal-button cancel-button" onClick={onCancel}>
              Cancel
            </button>
          )}
          {onConfirm && (
            <button className="modal-button confirm-button" onClick={onConfirm}>
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
