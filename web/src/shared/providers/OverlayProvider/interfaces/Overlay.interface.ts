import { DrawerProps } from "@chakra-ui/react";

export interface IOverlay {
  body: React.ReactNode;
  config?: Partial<Omit<DrawerProps, "isOpen">>;
}
