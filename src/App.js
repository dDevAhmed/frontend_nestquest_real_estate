import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile'

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
      }
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;