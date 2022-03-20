import React, { createContext, useContext, useState } from 'react';

const Modal = createContext();

const ModalContext = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // console.log({modalopen})

  const modalHandleClose = () => setModalOpen(false);

  const modalHandleOpen = () => setModalOpen(true);

  return <Modal.Provider value={{ modalHandleClose, modalHandleOpen, modalOpen }}>{children}</Modal.Provider>;
};

export default ModalContext;

export const ModalState = () => {
  return useContext(Modal);
};
