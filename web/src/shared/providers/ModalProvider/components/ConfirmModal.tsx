import React, { FC } from "react";
import { Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";

interface ConfirmModalProps {
  onClose: () => void;
  onSuccess: () => void;
  heading: string;
  content: string;
  cancelBtnText?: string;
  successBtnText?: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  heading,
  content,
  onClose,
  onSuccess,
  cancelBtnText,
  successBtnText,
}) => {
  return (
    <ModalContent>
      <ModalCloseButton />
      <ModalHeader>{heading}</ModalHeader>
      <ModalBody fontSize="14px" fontWeight="500">
        {content}
      </ModalBody>
      <ModalFooter>
        <Button variant="secondaryOutlined" onClick={onClose} mr={3}>
          {cancelBtnText}
        </Button>
        <Button variant="primary" onClick={onSuccess}>
          {successBtnText}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default ConfirmModal;
