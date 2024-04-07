import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "screens/About";
import Contacts from "screens/Contacts";
import Auth from "screens/Auth";
import SignUp from "screens/SignUp";
import Profile from "screens/Profile";
import CreateLot from "screens/CreateLot";
import { Provider } from "react-redux";
import store from "store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <About />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/contacts",
      element: <Contacts />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/createlot",
      element: <CreateLot />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
