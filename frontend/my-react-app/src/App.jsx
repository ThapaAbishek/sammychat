  import React from 'react'
  import Navbar from './components/Navbar.jsx'
  import {Routes , Route, Navigate} from "react-router-dom";
  import HomePage from './pages/HomePage.jsx';
  import SignupPage from './pages/SignupPage.jsx';
  import SettingPage from './pages/SettingPage.jsx';
  import ProfilePage from './pages/ProfilePage.jsx';
  import LoginPage from './pages/LoginPage.jsx';
  import { useAuthStore } from './store/useAuthStore.js';
  import { useEffect } from 'react';
  import {Loader} from "lucide-react";
  import { Toaster } from 'react-hot-toast';
  const App = () => {
    const{authUser, checkAuth,isCheckingAuth}=useAuthStore();
    useEffect(()=>{
      checkAuth();
    },[checkAuth])
    console.log({authUser});

    if(isCheckingAuth && !authUser) return(
  <div className="flex items-center justify-center h-screen">
    <Loader className="size-10 animate-spin text-white" />
  </div>
    )

    return (
  <>
   <Navbar />
     <main className="pt-16">
        <Routes>
          <Route path="/home" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/home" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/home" />} />
          <Route path="/setting" element={authUser ? <SettingPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
        <Toaster />
      </main>
  </>

      
    )
  }

  export default App
