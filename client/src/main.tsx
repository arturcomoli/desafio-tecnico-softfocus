import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import Providers from "./providers";
import theme from "./styles/theme";

import "antd/dist/antd.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers>
        <ChakraProvider theme={theme}>
          <Toaster />
          <App />
        </ChakraProvider>
      </Providers>
    </BrowserRouter>
  </React.StrictMode>
);
