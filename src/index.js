import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from './appstore/store';
import Loginpage from './feactures/lmsproject/Loginpage';
import Admindashbord from './feactures/lmsproject/Admindashbord';
import Manegerdashbord from './feactures/lmsproject/manegerdashbord';
import Loanform from './feactures/lmsproject/Loanform';
import Signpage from './feactures/lmsproject/sign';
import Userdashbord from './feactures/lmsproject/userdashbord';
import Home from './feactures/lmsproject/Home';
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from './App';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public routes
      {
        path: "login",
        element: <Loginpage />
      },
      {
        path: "sign",
        element: <Signpage />
      },
      
      // Protected routes
      {
        path: "/",
        element: <ProtectedRoute><Home /></ProtectedRoute>
      },
      {
        path: "manegerdashbord",
        element: <ProtectedRoute>
          <Admindashbord />
        </ProtectedRoute>
      },
      {
        path: "agentdashbord",
        element: <ProtectedRoute>
          <Manegerdashbord />
        </ProtectedRoute>
      },
      {
        path: "Loanform",
        element: <ProtectedRoute>
          <Loanform />
        </ProtectedRoute>
      },
      {
        path: "userdashbord",
        element: <ProtectedRoute>
          <Userdashbord />
        </ProtectedRoute>
      },
      
      // Catch all route for 404
      {
        path: "*",
        element: <Navigate to="/" replace />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
