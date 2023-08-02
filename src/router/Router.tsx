
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorBoundary from '../pages/error/ErrorBoundary';
import Home from '../pages/home/Home';
import SignUp from '../pages/sign-up/SignUp';
import SignIn from '../pages/sign-in/SignIn';
import ToDo from '../pages/todo/ToDo';

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