import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "../routes/Root";
import ErrorPage from "../routes/ErrorPage";
import HomeView from "../routes/HomeView";
import SinglePostPage from "../routes/SinglePostPage";
import EditPage from "../routes/EditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "posts/:id",
        element: <SinglePostPage />,
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
