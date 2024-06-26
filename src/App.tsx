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
import Lots from "screens/supplySpecialist/Lots";
import LotInfo from "screens/supplySpecialist/LotInfo";
import LotDelete from "screens/admin/LotInfo";
import Feedback from "screens/Feedback";
import Requests from "screens/supplier/Requests";
import ManageUsers from "screens/admin/Manage";
import Users from "screens/admin/Users";
import User from "screens/admin/ChangeUser";
import CreateGroup from "screens/admin/CreateGroup";
import ChangeGroup from "screens/admin/ChangeGroup";
import Groups from "screens/admin/Groups";
import DeleteLots from "screens/admin/DeleteLots";
import LotsGroups from "screens/supplier/Groups";
import GroupLots from "screens/supplier/GroupLots";
import LotRequest from "screens/supplier/LotRequest";
import SupplierInfo from "screens/supplySpecialist/SupplierInfo";
import GroupsLots from "screens/admin/GroupsLots";

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
    {
      path: "/admin/lot/:id",
      element: <LotDelete />,
    },
    {
      path: "/feedback",
      element: <Feedback />,
    },
    {
      path: "/requests",
      element: <Requests />,
    },
    {
      path: "/manageusers",
      element: <ManageUsers />,
    },
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/user/:id",
      element: <User />,
    },
    {
      path: "/creategroup",
      element: <CreateGroup/>,
    },
    {
      path: "/changegroup/:id",
      element: <ChangeGroup/>,
    },
    {
      path: "/groups",
      element: <Groups/>,
    },
    {
      path: "/admin/deletelots/:name",
      element: <DeleteLots/>,
    },
    {
      path: "/supplier/lotsgroups",
      element: <LotsGroups/>,
    },
    {
      path: "/supplier/grouplots/:id",
      element: <GroupLots/>,
    },
    {
      path:"/supplier/lot/:id",
      element: <LotRequest/>,
    },
    {
      path: "/supplierInfo/:id",
      element: <SupplierInfo/>,
    },
    {
      path: "/admin/groupslots",
      element: <GroupsLots/>,
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
