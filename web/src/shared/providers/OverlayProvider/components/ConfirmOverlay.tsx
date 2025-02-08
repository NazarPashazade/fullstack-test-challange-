import React, { FC } from "react";
import { Button, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader } from "@chakra-ui/react";

interface ConfirmOverlayProps {
  onClose: () => void;
  onSuccess: () => void;
  heading: string;
  content: string;
  cancelBtnText: string;
  successBtnText: string;
}

const ConfirmOverlay: FC<ConfirmOverlayProps> = ({
  onClose,
  onSuccess,
  cancelBtnText,
  successBtnText,
  content,
  heading,
}) => {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>{heading}</DrawerHeader>

      <DrawerBody>{content}</DrawerBody>

      <DrawerFooter>
        <Button variant="outline" mr={3} onClick={onClose}>
          {cancelBtnText}
        </Button>
        <Button colorScheme="blue" onClick={onSuccess}>
          {successBtnText}
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default ConfirmOverlay;
