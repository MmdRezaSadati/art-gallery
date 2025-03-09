import React from 'react';
import Modal from '../Modal';
import './InfoModal.css';

// This modal displays generic information.
const InfoModal = ({ title, message, onClose }) => {
  return (
    <Modal title={title} onConfirm={onClose}>
      <p>{message}</p>
    </Modal>
  );
};

export default InfoModal;
