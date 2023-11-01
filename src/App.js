import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home.jsx";
import { QueryClientProvider, QueryClient } from "react-query";

const router = createBrowserRouter([{ path: "*", Component: Home }]);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
