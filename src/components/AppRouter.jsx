import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "../routes/Root";
import ErrorPage from "../routes/ErrorPage";
import HomeView from "../routes/HomeView";

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
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
