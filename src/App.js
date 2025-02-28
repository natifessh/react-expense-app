import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation,Navigate } from "react-router-dom";
import Login from './components/login';
import Register from './components/Register';
import DashBoard from './pages/DashBoard';
import styleClasses from "./styles/style.module.css";
import UpdateExpense from './components/UpdateExpense';
import { useEffect, useState } from 'react';

import WhoIsSpenDingMore from './components/WhoIsSpenDingMore';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true"; 
  });

  const [isRegistered, setIsRegistered] = useState(() =>
    JSON.parse(localStorage.getItem("isRegistered")) || false
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("isRegistered", JSON.stringify(isRegistered));
  }, [isRegistered]);

  return (
    <Router>
      <div className={styleClasses.mainContainer}>
        <Navigation isLoggedIn={isLoggedIn} isRegistered={isRegistered} setIsLoggedIn={setIsLoggedIn} setIsRegistered={setIsRegistered} />
        <Routes>
          <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/Register" element={<Register setIsRegistered={setIsRegistered} />} />
          <Route 
            path="/DashBoard" 
            element={isLoggedIn ? <DashBoard /> : <Navigate to="/Login" />} 
          />
          <Route path='/WhoIsSpendingMore'  element={isLoggedIn?<WhoIsSpenDingMore/>:<p className={styleClasses.error}>Login or sign up to see who is spending more</p>}></Route>
          <Route path="/DashBoard/update/:id" element={isLoggedIn? <UpdateExpense/>: <Navigate to={"Login"}/>} />

        </Routes>
      </div>
     
    </Router>
  );
}

function Navigation({ isLoggedIn, isRegistered, setIsLoggedIn, setIsRegistered }) {
  const location = useLocation();

  
  const isHomePageOrElse = location.pathname === '/' && location.pathname!=='/DashBoard';

  return (
    <ul className={styleClasses.navList}>
      {isHomePageOrElse && (
        <>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Register">Sign up</Link>
          </li>
        </>
      )}
      {!isHomePageOrElse && (
        <>
          <li>
            {!isLoggedIn ? (
              <Link to="/Login">Login</Link>
            ) : (
              <Link to="/" onClick={() => {
                setIsLoggedIn(false);
                localStorage.removeItem("isLoggedIn");
              }}>
                Logout
              </Link>
            )}
          </li>
          <li>
            {!isRegistered && !isLoggedIn ? (
              <Link to="/Register">Register</Link>
            ) : (
              <Link to="/WhoIsSpendingMore" onClick={() => {
                
              }}>
               Who is Spending More?
              </Link>
            )}
          </li>
        </>
      )}
    </ul>
  );
}

export default App;
