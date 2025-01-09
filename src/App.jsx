
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";





const Layout = () => (
  
  <div >
    <Navbar />
    <Outlet />
  </div>
);

// Define the routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      
    ],
    errorElement:<Error/>
  },
]);

const App = () => {
  
  return <RouterProvider router={router} />;
};

export default App;
