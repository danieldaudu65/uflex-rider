import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../components/Home";
import Dashboard from "../pages/Dashboard";
;
import Profile from "../pages/Profile";
import Bookings from "../pages/Bookings";
import BookingPage from "../pages/Booking";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "dashboard",
        element: <Home />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'bookings',
                element: <Bookings />
            },
            {
                path: 'bookings/books',
                element: <BookingPage />
            },
            {
                path: 'profile',
                element: <Profile />
            },
           
        ]
    }
])


const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
