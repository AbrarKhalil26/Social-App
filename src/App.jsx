import { RouterProvider } from "react-router-dom";
import { router } from "./routing/AppRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
