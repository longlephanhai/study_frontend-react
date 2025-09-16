import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import UserPage from "./pages/user";
import LayoutAdmin from "./layout";
import LoginPage from "./pages/auth";
import ErrorPage from "./pages/error";
import NotFoundPage from "./pages/notfound";
import RolePage from "./pages/role";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutAdmin />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <DashboardPage />,
        },
        {
          path: "user",
          element: <UserPage />,
        },
        {
          path: "role",
          element: <RolePage />,
        }
      ],
    },
    {
      path: "auth/login",
      element: <LoginPage />
    },
    {
      path: "*",
      element: <NotFoundPage />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
