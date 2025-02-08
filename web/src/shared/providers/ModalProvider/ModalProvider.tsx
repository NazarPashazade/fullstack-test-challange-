import React, { FC, PropsWithChildren, useCallback, useState } from "react";
import { Modal, ModalOverlay } from "@chakra-ui/react";

import { IModal } from "./interfaces";

type ModalContextType = {
  onOpenModal: (modal: IModal) => void;
  onCloseModal: () => void;
  onCloseAllModals: () => void;
} | null;

export const ModalContext = React.createContext<ModalContextType>(null);

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modals, setModals] = useState<IModal[]>([]);

  const onOpenModal = useCallback((modal: IModal) => {
    setModals((prevModals) => [...prevModals, modal]);
  }, []);

  const onCloseModal = useCallback(() => {
    setModals((prevModals) => prevModals.slice(0, -1));
  }, []);

  const onCloseAllModals = useCallback(() => {
    setModals([]);
  }, []);

  return (
    <ModalContext.Provider value={{ onOpenModal, onCloseModal, onCloseAllModals }}>
      <>{children}</>
      {modals.map((m, i) => (
        <Modal key={i} {...m.config} onClose={onCloseModal} isOpen>
          {i === 0 ? <ModalOverlay /> : null}
          {m.body}
        </Modal>
      ))}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
