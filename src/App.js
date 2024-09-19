import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <div>No Such Route Exists!!!</div>,
    children: [
      {
        index: true,
        element: <Explore />,
      },
      {
        path: 'offers',
        element: <Offers />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'signin',
        element: <SignIn />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />
      }
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;