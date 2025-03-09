import React, { useState } from "react";
import DeleteConfirmationModal from "../../../components/Modals/DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import { useAddress } from "../../../contexts/AddressProvider.js";
import { useAuth } from "../../../contexts/AuthProvider.js";
import { useUserData } from "../../../contexts/UserDataProvider.js";
import { removeAddressService } from "../../../services/address-services/removeAddressService";
import {AddressModal} from "../../Checkout/components/AddressModal/AddressModal";
import "./Addresses.css";

export const Addresses = () => {
  const { auth } = useAuth();
  const { userDataState, dispatch } = useUserData();
  const {
    setIsEdit,
    setAddressForm,
    isAddressModalOpen,
    setIsAddressModalOpen,
  } = useAddress();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const confirmDeleteAddress = async () => {
    try {
      const response = await removeAddressService(selectedAddress, auth.token);
      if (response.status === 200) {
        dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleDeleteClick = (address) => {
    setSelectedAddress(address);
    setShowDeleteModal(true);
  };
  return (
    <div className="address-section-container">
      <div className="add-address-btn-container">
        <button onClick={() => setIsAddressModalOpen(true)}>New Address</button>
      </div>
      <div className="profile-address-container">
        {userDataState.addressList.length ? (
          userDataState.addressList.map((address) => {
            const { name, street, city, state, country, pincode, phone, _id } =
              address;
            return (
              <div className="address-card" key={_id}>
                <p className="name">{name}</p>
                <p className="address">
                  {street}, {city}, {state}, {country} - {pincode}
                </p>
                <p className="phone">{phone}</p>
                <div className="address-btn-container">
                  <button
                    onClick={() => {
                      setIsAddressModalOpen(true);
                      setAddressForm(address);
                      setIsEdit(true);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(address)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No Address To Display</p>
        )}
      </div>

      {isAddressModalOpen && <AddressModal />}
      {showDeleteModal && (
        <DeleteConfirmationModal
          itemName={selectedAddress?.name}
          onConfirm={confirmDeleteAddress}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};
