import React from 'react';
import {useEffect, useState} from 'react'
import {dbService} from '../fbase'
import {addDoc,collection, doc, getDocs,query,onSnapshot,orderBy} from 'firebase/firestore'
import Nweet from '../components/Nweet'

export default function Home ({userObj}) {
  const [nweet,setNweet]=useState("")
  const [nweets,setNweets]=useState([])

  const getNweeks=async ()=>{
    const q=query(collection(dbService,"nweets"))
    const querySnapshot=await getDocs(q);
    querySnapshot.forEach((doc)=>{
      const nweetObj={
        ...doc.data(),
        id:doc.id,
      }
      setNweets((prev)=>[nweetObj,...prev])
    })
    
  }


  useEffect(()=>{
    const q = query(collection(dbService, "nweets"),orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
      setNweets(nweetArr);
      });
  },[])
  
  console.log(userObj.displayName)
  const onSubmit= async (event)=>{
    event.preventDefault();
    try{
      const docRef=await addDoc(collection(dbService,'nweets'),{text:nweet,createdAt:Date.now(),creatorId:userObj.uid})
    } catch(error){
      console.log("error adding document:",error)
    }
    setNweet("")
  }
  const onChange= (event)=>{
    const {target:{value}}=event;
    setNweet(value)
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder='whats on your mind?' maxLength={120}/>
        <input type="submit" value="Nweet"  />
      </form>
      <div>
        {nweets.map((nweet)=>
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userObj.uid}></Nweet>
        )}
      </div>
    </div>
  );
}
