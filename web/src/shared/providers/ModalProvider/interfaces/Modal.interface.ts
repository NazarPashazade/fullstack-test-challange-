import { ModalProps } from "@chakra-ui/react";

export interface IModal {
  body: React.ReactNode;
  config?: Partial<Omit<ModalProps, "isOpen">>;
}
