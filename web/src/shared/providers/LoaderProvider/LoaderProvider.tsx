import { createContext, FC, PropsWithChildren } from "react";
import { useDisclosure } from "@chakra-ui/react";

interface LoaderContextType {
  isLoaderShown: boolean;
  onShowLoader: () => void;
  onHideLoader: () => void;
  onToggleLoader: () => void;
}

export const LoaderContext = createContext<LoaderContextType | null>(null);
const LoaderProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    isOpen: isLoaderShown,
    onOpen: onShowLoader,
    onClose: onHideLoader,
    onToggle: onToggleLoader,
  } = useDisclosure();

  return (
    <>
      <LoaderContext.Provider value={{ isLoaderShown, onShowLoader, onHideLoader, onToggleLoader }}>
        {isLoaderShown && <div>Loading...</div>}
        {children}
      </LoaderContext.Provider>
    </>
  );
};

export default LoaderProvider;
