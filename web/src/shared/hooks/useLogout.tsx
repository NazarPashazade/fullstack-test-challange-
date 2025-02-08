import { useCallback } from "react";

import { useAuthContext, ConfirmModal, useModalContext } from "@shared/providers";

function useLogout() {
  const { onOpenModal, onCloseModal } = useModalContext();
  const { onLogout } = useAuthContext();

  return useCallback(() => {
    onOpenModal({
      body: (
        <ConfirmModal
          heading="Log Out"
          content="Are you sure you want to log out?"
          cancelBtnText="Cancel"
          successBtnText="Logout"
          onClose={onCloseModal}
          onSuccess={onLogout}
        />
      ),
    });
  }, [onCloseModal, onOpenModal, onLogout]);
}

export default useLogout;
