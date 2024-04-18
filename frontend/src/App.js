import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './components/MainPage';
import PageNotFound from './components/PageNotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
