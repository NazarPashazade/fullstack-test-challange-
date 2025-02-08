import React, { FC, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthProvider, LoaderProvider, ModalProvider, OverlayProvider } from "@shared/providers";
import { theme } from "@assets/theme/theme";

const queryClient = new QueryClient();

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <LoaderProvider>
          <ModalProvider>
            <AuthProvider>
              <OverlayProvider>
                <BrowserRouter>{children}</BrowserRouter>
              </OverlayProvider>
            </AuthProvider>
          </ModalProvider>
        </LoaderProvider>
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
