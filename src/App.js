import { Outlet, Navigate } from 'react-router-dom';

 export  const ProtectedRoute = ({ children }) => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return <Outlet />;
}
export default App;
