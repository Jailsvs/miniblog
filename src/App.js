import './App.css';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//pages
import Home from './pages/Home/Home'
import About from './pages/About/About'

//components
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'

// context
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
     <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/about" element={<About/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/posts/create" element={<CreatePost/>}></Route>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
            </Routes> 
          </div>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
