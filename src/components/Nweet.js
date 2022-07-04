import React from 'react';
import {useEffect, useState} from 'react'
import {dbService} from '../fbase'
import {doc,deleteDoc,updateDoc} from 'firebase/firestore'

export default function Nweet ({nweetObj,isOwner}) {
  const [editing, setEditing]=useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick= async ()=> {
    const ok=window.confirm("are you sure you want to delete this nweet?")
    console.log(ok)
    if (ok){
      const NweetTextRef=doc(dbService,'nweets',`${nweetObj.id}`)
      await deleteDoc(NweetTextRef);
    }
  }
  const toggleEditing = ()=>{setEditing((prev)=>!prev)}

  return (
    <div>
      {editing?
      (
        <>
        <form>
          <input type="text" placeholder="Edit your nweet" value={newNweet} required/>
        </form>
        <button onClick={toggleEditing}>Cancel</button>
        </>
      )
      :(
        <>
        <h4>{nweetObj.text}</h4>
        {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button onClick={toggleEditing}>Edit nweet</button>
        </>
        )}        
        </>
      )}      
    </div>
  );
}
