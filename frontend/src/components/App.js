import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Link,
} from 'react-router-dom';
import React from 'react';
import { Navbar } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Login from './Login/Login.jsx';
import SignUp from './SignUp/SignUp.jsx';
import MainPage from './MainPage/MainPage.jsx';
import PageNotFound from './PageNotFound.jsx';
import AuthButton from './AuthButton.jsx';

import { useAuth } from '../hooks';
import pages from '../utils/pages.js';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  return (
    auth.loggedIn
      ? children
      : <Navigate to={pages.login} state={{ from: location }} />
  );
};

const LoggedRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Navigate to={pages.main} state={{ from: location }} />
      : children
  );
};

const App = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="d-flex flex-column h-100">
        <BrowserRouter>
          <Navbar bg="white" expand="lg" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <Navbar.Brand as={Link} to={pages.main}>{t('app.label')}</Navbar.Brand>
              <AuthButton />
            </div>
          </Navbar>
          <Routes>
            <Route
              path={pages.main}
              element={(
                <PrivateRoute>
                  <MainPage />
                </PrivateRoute>
              )}
            />
            <Route
              path={pages.login}
              element={(
                <LoggedRoute>
                  <Login />
                </LoggedRoute>
            )}
            />
            <Route
              path={pages.signUp}
              element={(
                <LoggedRoute>
                  <SignUp />
                </LoggedRoute>
            )}
            />
            <Route path={pages.notFound} element={<PageNotFound />} />
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
};

export default App;
