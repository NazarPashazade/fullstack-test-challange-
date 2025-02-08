import React, { FC, useCallback, useState } from "react";
import { Drawer, DrawerOverlay } from "@chakra-ui/react";

import { IOverlay } from "./interfaces";
import { ConfirmModal, useModalContext } from "../ModalProvider";

type OverlayContextType = {
  onOpenOverlay: (overlay: IOverlay) => void;
  onCloseOverlay: (isLeaveConfirm?: boolean) => void;
  onCloseAllOverlays: () => void;
} | null;

export const OverlayContext = React.createContext<OverlayContextType>(null);

interface OverlayProviderProps {
  children: React.ReactNode;
}

const OverlayProvider: FC<OverlayProviderProps> = ({ children }) => {
  const [overlays, setOverlays] = useState<IOverlay[]>([]);

  const { onOpenModal, onCloseModal } = useModalContext();

  const onOpenOverlay = useCallback((overlay: IOverlay) => {
    setOverlays((prevOverlays) => [...prevOverlays, overlay]);
  }, []);

  const onCloseAllOverlays = useCallback(() => {
    setOverlays([]);
  }, []);

  const onCloseOverlay = useCallback(
    (isLeaveConfirm?: boolean) => {
      const handleCloseOverlay = () => setOverlays((prevOverlays) => prevOverlays.slice(0, -1));

      if (isLeaveConfirm) {
        onOpenModal({
          body: (
            <ConfirmModal
              heading="Unsaved changes"
              content="You have unsaved changes on this page. Are you sure you want to leave?"
              cancelBtnText="Stay"
              successBtnText="Leave without changes"
              onClose={onCloseModal}
              onSuccess={() => {
                onCloseModal();
                handleCloseOverlay();
              }}
            />
          ),
        });

        return;
      }

      handleCloseOverlay();
    },
    [onOpenModal, onCloseModal],
  );

  return (
    <OverlayContext.Provider value={{ onOpenOverlay, onCloseOverlay, onCloseAllOverlays }}>
      <>{children}</>
      {overlays.map((m, i) => (
        <Drawer key={i} placement="right" {...m.config} onClose={onCloseOverlay} isOpen>
          {i === 0 ? <DrawerOverlay /> : null}
          {m.body}
        </Drawer>
      ))}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
