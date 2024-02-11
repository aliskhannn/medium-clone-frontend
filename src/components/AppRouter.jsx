import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "../routes/Root";
import ErrorPage from "../routes/ErrorPage";
import SinglePostPage from "../routes/SinglePostPage";
import EditPage from "../routes/EditPage";
import DefaultPosts from "../routes/DefaultPosts";
import SearchedPosts from "../routes/SearchedPosts";

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
        path: "/search",
        element: <SearchedPosts />,
      },
      {
        path: "/edit",
        element: <EditPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
