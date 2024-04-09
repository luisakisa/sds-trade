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
import store, { persistor } from "store";
import { PersistGate } from "redux-persist/integration/react";
import Lots from "screens/Lots";
import LotInfo from "screens/LotInfo";

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
    {
      path: "/lots",
      element: <Lots />,
    },
    {
      path: "/lot/:id",
      element: <LotInfo />,
    },
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
