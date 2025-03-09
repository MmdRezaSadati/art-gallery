import React, { useState } from 'react';
import Modal from './Modal';
import './CheckoutModal.css';

// It includes a delivery address input field with basic validation.
const CheckoutModal = ({ onClose, onConfirm }) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  // Validate input and trigger onConfirm callback if valid
  const handleConfirm = () => {
    if (!address.trim()) {
      setError('Please enter a delivery address.');
      return;
    }
    onConfirm(address);
  };

  return (
    <Modal title="Confirm Order" onConfirm={handleConfirm} onCancel={onClose}>
      <input 
        type="text" 
        placeholder="Delivery Address" 
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          setError('');
        }}
        className="checkout-input"
      />
      {error && <span className="error">{error}</span>}
    </Modal>
  );
};

export default CheckoutModal;
