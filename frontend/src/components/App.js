import Login from './Login/Login.jsx';
import SignUp from './SignUp/SignUp.jsx';
import MainPage from './MainPage/MainPage.jsx';
import PageNotFound from './PageNotFound.jsx';
import AuthButton from './AuthButton.js';

import authContext from '../context/AuthContext.js';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Link,
} from 'react-router-dom';
import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useContext(authContext);

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};
function App() {
  const { t } = useTranslation();
  return (
    <>
      <div className="d-flex flex-column h-100">
        <BrowserRouter>
          <Navbar bg="white" expand="lg" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className='container'>
              <Navbar.Brand as={Link} to="/">{t('app.label')}</Navbar.Brand>
              <AuthButton />
            </div>
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
            <Route path="/signup" element={<SignUp/>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
