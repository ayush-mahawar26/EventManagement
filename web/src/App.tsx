import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { SigninPage } from "./pages/auth/SigninUser";
import { RecoilRoot } from "recoil";
import { LandingPage } from "./pages/Landing";
import { SignUpPage } from "./pages/auth/SignupUser";
import { UserDashBoard } from "./pages/dashboard/user/UserDashboard";
import { AdminDashBoard } from "./pages/dashboard/admin/AdminDashboard";
import { AddEvent } from "./pages/dashboard/admin/AddEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/user/signin",
    element: <SigninPage />,
  },
  {
    path: "/user/signup",
    element: <SignUpPage />,
  },
  {
    path: "/user/dashboard",
    element: <UserDashBoard />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashBoard />,
  },
  {
    path: "/admin/add/event",
    element: <AddEvent />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
