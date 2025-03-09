import React from 'react';
import './DeleteConfirmationModal.css';
import Modal from '../Modal';

// This modal is used for confirming deletion actions.
const DeleteConfirmationModal = ({ itemName, onConfirm, onCancel }) => {
  return (
    <Modal title="Confirm Deletion" onConfirm={onConfirm} onCancel={onCancel}>
      <p>Are you sure you want to delete "{itemName}"?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
