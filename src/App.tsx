import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import UserPage from "./pages/user";
import LayoutAdmin from "./layout";
import LoginPage from "./pages/auth";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutAdmin />,
      children: [
        {
          path: "/",
          element: <DashboardPage />,
        },
        {
          path: "user",
          element: <UserPage />,
        },
      ],
    },
    {
      path:"/login",
      element:<LoginPage />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
