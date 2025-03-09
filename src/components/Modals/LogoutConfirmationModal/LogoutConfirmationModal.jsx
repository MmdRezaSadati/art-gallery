import React from 'react';
import Modal from '../Modal';
import './LogoutConfirmationModal.css';

// This modal confirms if the user really wants to log out.
const LogoutConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <Modal title="Logout Confirmation" onConfirm={onConfirm} onCancel={onCancel}>
      <p>Are you sure you want to log out?</p>
    </Modal>
  );
};

export default LogoutConfirmationModal;
