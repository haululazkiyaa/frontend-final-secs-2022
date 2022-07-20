import './App.css';
import React, { Component, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Loading from './components/Loading';

const Signup = React.lazy(() => import('./pages/Signup'));
const Login = React.lazy(() => import('./pages/Login')); 
const Dashboard = React.lazy(() => import('./pages/Dashboard')); 
const Jadwal = React.lazy(() => import('./pages/Jadwal')); 
const Nilai = React.lazy(() => import('./pages/Nilai'));  
const NotFound = React.lazy(() => import('./pages/NotFound')); 

class App extends Component {
  render() {
    return (
      <AuthContextProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path='/' element={<Navigate to='/signup' />} />
              <Route path='/signup' exact element={<Signup />} />
              <Route path='/login' exact element={<Login />} />
              <Route path='/dashboard' exact element={<Dashboard />} />
              <Route path='/jadwal' exact element={<Jadwal />} />
              <Route path='/nilai' exact element={<Nilai />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthContextProvider>
    );
  }
}

export default App;
