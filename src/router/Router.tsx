
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {Home, SignIn, SignUp,ToDo, ErrorBoundary} from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:  <ErrorBoundary />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/todo",
        element: <ToDo />,
      },
    ],
  },
]);

export default router;