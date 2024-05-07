import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "../routes/Root";
import ErrorPage from "../routes/ErrorPage";
import SinglePostPage from "../routes/SinglePostPage";
import EditPage from "../routes/EditPage";
import DefaultPosts from "../routes/DefaultPosts";
import SearchedPosts from "../routes/SearchedPosts";
import Login from "../routes/Login";
import Profile from "../routes/Profile";
import SignUp from "../routes/SignUp";
import Settings from "../routes/Settings";
import Library from "../routes/Library";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DefaultPosts />,
      },
      {
        path: "/:id",
        element: <SinglePostPage />,
      },
      {
        path: "/:id/comments",
        element: <SinglePostPage />,
      },
      {
        path: "/:id/edit",
        element: <EditPage />,
      },
      {
        path: "/search",
        element: <SearchedPosts />,
      },
      {
        path: "/edit",
        element: <EditPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/settings",
        element: <Settings />,
      },
      {
        path: "/library",
        element: <Library />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
