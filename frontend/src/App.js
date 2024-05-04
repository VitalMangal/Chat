import Login from './components/Login';
import Registration from './components/Registration';
import MainPage from './components/MainPage';
import PageNotFound from './components/PageNotFound';
import AuthButton from './components/AuthButton';

import AuthProvider from './context/AuthProvider.js';
import authContext from './context/AuthContext.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Link,
} from 'react-router-dom';
import React, { useContext } from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';


const PrivateRoute = ({ children }) => {
  const auth = useContext(authContext);
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};
// проблема с расположением бренда, кнопки Log In, и положением формы для авторизации(из-за body)
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar bg="white" expand="lg" className="shadow-sm navbar-light bg-white">
          <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
          <AuthButton />
        </Navbar>
        <Routes>
          <Route 
            path="/"
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<Login/>} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
