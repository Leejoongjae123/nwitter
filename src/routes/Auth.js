import React from 'react';
import {useEffect, useState} from 'react';
import {authService} from '../fbase';
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,GithubAuthProvider} from 'firebase/auth'

export default function Auth () {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [newAccount,setNewAccount]=useState(true)
  const [error,setError]=useState("")
  const onChange=(event)=>{
    const {target:{name,value}}=event;
    if(name==="email"){
      setEmail(value);
    } else if(name==="password"){
      setPassword(value);
    }
  }
  const auth=getAuth();
  const onSubmit=async(event)=>{
    event.preventDefault()
    try{
      let data
      if (newAccount){
        data = await createUserWithEmailAndPassword(authService,email,password)//create account
      } else {
        data = await signInWithEmailAndPassword(authService,email,password)
      }
      console.log(data)
    } catch(error){
      console.log(error.message)
      setError(error.message)
    }
  }  
  const toggleAccount=()=>setNewAccount(prev=>!prev)
  const onSocialClick=async(event)=>{
    const {target:{name}}=event;
    let provider;
    if(name==='google'){
      provider=new GoogleAuthProvider();
    } else if(name==='github'){
      provider=new GithubAuthProvider();
      console.log('complete provider')
    } 
    const data = await signInWithPopup(authService,provider);
    console.log(data)
    console.log(provider)
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder='Email' required value={email} onChange={onChange}/>
        <input name="password" type="password" placeholder='password' required value={password} onChange={onChange} autoComplete="off"/>
        <input type="submit" value={newAccount?"Create Account":"Log In"}/>
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Login":"Create Account"}</span>
      <div>{error}</div>
      <div>
        <button onClick={onSocialClick}name="google">Continue with Google</button>
        <button onClick={onSocialClick}name="github">Continue with Github</button>
      </div>
    </div>
  );
}

