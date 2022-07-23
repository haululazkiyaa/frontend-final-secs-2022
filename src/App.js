import './App.css';
import React, { Component, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';

const Beranda = React.lazy(() => import('./pages/Beranda')); 
const Pendaftaran = React.lazy(() => import('./pages/Pendaftaran'));
const Login = React.lazy(() => import('./pages/Login')); 
const Dashboard = React.lazy(() => import('./pages/Dashboard')); 
const Jadwal = React.lazy(() => import('./pages/Jadwal')); 
const Nilai = React.lazy(() => import('./pages/Nilai'));  
const About = React.lazy(() => import('./pages/About')); 
const Password = React.lazy(() => import('./pages/Password')); 
const NotFound = React.lazy(() => import('./pages/NotFound')); 

class App extends Component {
  render() {
    return (
      <AuthContextProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path='/' exact element={<Beranda />} />
              <Route path='/pendaftaran' exact element={<Pendaftaran />} />
              <Route path='/login' exact element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/jadwal' exact element={<Jadwal />} />
                <Route element={<ProtectedRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/jadwal' exact element={<Jadwal />} />
                <Route path='/nilai' exact element={<Nilai />} />
                <Route path='/about' exact element={<About />} />
                <Route path='/password' exact element={<Password />} />
                </Route>
                <Route path='/about' exact element={<About />} />
                <Route path='/password' exact element={<Password />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthContextProvider>
    );
  }
}

export default App;
