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
const CreateBusiness = React.lazy(() => import("./pages/CreateBusiness"))
const ResourceArticle = React.lazy(() => import("./pages/ResourceArticle"))
const ResourceArticlePage = React.lazy(() => import("./pages/ResourceArticlePage"))
const CommunityChat = React.lazy(() => import("./pages/ComunityChat"))
const PostArticle = React.lazy(() => import("./pages/PostArticle"))
const Events = React.lazy(() => import('./pages/Events'));
const HostEvent = React.lazy(() => import("./pages/HostEvent"))
const JobList = React.lazy(() => import("./pages/Jobs"))
const JobDetails = React.lazy(() => import('./pages/JobDetail'))
const YourBusinesses = React.lazy(() => import('./pages/YourBusinesses'))
const YourEvent = React.lazy(() => import('./pages/YourEvent'))
const YourJobs = React.lazy(() => import('./pages/YourJobs'))

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProfileSetup from './pages/ProfileSetup';
import Profile from './pages/Profile';
import YourResource from './pages/YourResource';
import CreateJob from './pages/CreateJob';
import GetLocation from './components/GetLocation';

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
    <div className=' bg-gradient-to-t from-white via-white to-blue-100'>
      <Navbar />
      <Suspense fallback={<>Component loading....</>}>
        <Routes>
          <Route path="/loc" element={<GetLocation />} />
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/auth/register" element={<AuthRoute><Register /></AuthRoute>} />
          <Route path="/auth/verify-email" element={<VerifyEmail/>} />
          <Route path="/auth/profile-setup" element={<ProfileSetup/>} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/chat-community' element={<PrivateRoute><CommunityChat/></PrivateRoute> }/>
          <Route path='/your-businesses' element={<PrivateRoute><YourBusinesses/></PrivateRoute> }/>
          <Route path='/your-events' element={<PrivateRoute><YourEvent/></PrivateRoute> }/>
          <Route path='/your-resources' element={<PrivateRoute><YourResource/></PrivateRoute> }/>
          <Route path='/your-jobs' element={<PrivateRoute><YourJobs/></PrivateRoute> }/>

          <Route path="/business/all-business" element={<Business />} />
          <Route path="/business/post-business" element={<PrivateRoute><CreateBusiness /></PrivateRoute> } />

          <Route path='/job' element={<JobList/>} />
          <Route path='/job/create' element={<CreateJob/>} />
          <Route path='/job/:id' element={<JobDetails/>} />

          <Route path='/resource/articles' element={<ResourceArticle/>}/>
          <Route path='/resource/articles/:id' element={<ResourceArticlePage/>}/>
          <Route path='/resource/post-articles' element={<PrivateRoute><PostArticle/></PrivateRoute> }/>

          <Route path='/events/all-events' element={<Events/>}/>
          <Route path='/events/host-event' element={<PrivateRoute><HostEvent/></PrivateRoute>}/>
          <Route path='*' element={<>404 NOT FOUND</>}/>
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
