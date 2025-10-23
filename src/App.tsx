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
import { useAppDispatch } from "./hook/hooks";
import { useEffect } from "react";
import { fetchAccount } from "./redux/user/userSlice";
import PermissionPage from "./pages/permission";
import TestPage from "./pages/test";
import WritingPage from "./pages/writing";
import VocabularyPage from "./pages/vocabulary";
import SpeakingPage from "./pages/speaking";
import GrammarPage from "./pages/grammar";
import PartOnePage from "./pages/part1";
import PartTwoPage from "./pages/part2";
import PartThreePage from "./pages/part3";

function App() {

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      window.location.pathname === 'auth/login'
    )
      return;
    dispatch(fetchAccount())
  }, [])

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
        },
        {
          path: "permission",
          element: <PermissionPage />,
        },
        {
          path: "test",
          element: <TestPage />
        },
        {
          path: "writing",
          element: <WritingPage />
        },
        {
          path: "vocabulary",
          element: <VocabularyPage />
        },
        {
          path: "speaking",
          element: <SpeakingPage />
        },
        {
          path: "grammar",
          element: <GrammarPage />
        },
        {
          path: "part1",
          element: <PartOnePage />
        },
        {
          path: "part2",
          element: <PartTwoPage />
        },
        {
          path: "part3",
          element: <PartThreePage />
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
