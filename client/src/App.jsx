import React, { useEffect, useState, startTransition , Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useStore } from './store';
import { toast } from 'react-toastify';
import { apiClient } from './lib/api-clinet';
import { GET_USER_INFO } from './utils/constants';

const Home = React.lazy(() => import('./pages/Home'));
const Business = React.lazy(() => import('./pages/Business'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import("./pages/Register"))
const VerifyEmail = React.lazy(() => import("./pages/VerifyEmail"))
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const AuthRoute = ({ children }) => {
  const { userInfo } = useStore();
  return !!userInfo ? <Navigate to="/" /> : children;
};

const PrivateRoute = ({ children }) => {
  const { userInfo } = useStore();
  return !!userInfo ? children : <Navigate to="/auth/login" />;
};



function App() {
  const { userInfo, setUserInfo } = useStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        if (response.statusText !== 'OK') {
          startTransition(() => setUserInfo(null));
          return;
        }
        toast.success(response.data.message);
        startTransition(() => setUserInfo(response.data.user));
      } catch (error) {
        startTransition(() => setUserInfo(null));
      } finally {
        setLoading(false);
      }
    };

    if (!userInfo) {
      getUserData();
    }
  }, [userInfo, setUserInfo]);

  return (
    <>
      <Navbar />
      <Suspense fallback={<>Component loading....</>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business/all-business" element={<Business />} />
          <Route path="/auth/verify-email" element={<VerifyEmail/>} />
          <Route path="/auth/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/auth/register" element={<AuthRoute><Register /></AuthRoute>} />

          <Route path='*' element={<>404 NOT FOUND</>}/>
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
