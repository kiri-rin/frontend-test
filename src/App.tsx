import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppNavigation } from "./pages";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppNavigation />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
