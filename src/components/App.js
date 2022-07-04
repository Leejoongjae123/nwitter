import React from 'react'
import AppRouter from './AppRouter';
import {useState,useEffect} from 'react'
import {authService} from '../fbase'
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
  const [init,setInit]=useState(false)
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [userObj, setUserObj]=useState(null)
  useEffect(() => {  
    onAuthStateChanged(authService,(user)=>{
      if(user){
        setIsLoggedIn(true)
        setUserObj(user)
        const uid=user.uid
      } else{
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, []);
  return (
    <>
    <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>
    <footer>&copy;{new Date().getFullYear()}Nwitter</footer>
    </>
  );
}

export default App;
