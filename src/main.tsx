import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createConnectTransport } from "@connectrpc/connect-web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransportProvider } from "@connectrpc/connect-query";

import "./index.css";

import App from "./App.tsx";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </TransportProvider>
  </StrictMode>
);
