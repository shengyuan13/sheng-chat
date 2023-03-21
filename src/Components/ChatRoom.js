import firebaseApp from "../firebase";
import { useState, useEffect } from 'react';
import { collection, getFirestore, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp  } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';

function ChatRoom(props) {
    const [message, setMessage] = useState([]);
    const [formValue, setFormValue] = useState('');

    const db = getFirestore(firebaseApp);
    const messageRef = collection(db, 'messages');
    const q = query(messageRef, orderBy('createdAt', 'asc'), limit(15));

    useEffect(()=>{
      const unsub = onSnapshot(q, (snapshot)=> {
        setMessage(snapshot.docs.map((doc)=> doc.data()))
      });

      return unsub;
    },[])

    const sendMessage = async(e) => {
      e.preventDefault();

      const { uid, photoURL } = props.user;
      const payload = { text: formValue, photoURL, uid, createdAt: serverTimestamp()};
      addDoc(messageRef, payload);
      setFormValue('');
    };

    return (
        <>
          <div>Welcome to the ChatRoom {props.user.displayName}</div>
          {
            message.map((msg, index)=> (
              <div key={index}>{msg.text}</div>
            ))
          }
          <form onSubmit={sendMessage}>
            <input value={formValue} onChange={(e)=> setFormValue(e.target.value)}></input>
            <Button variant="primary" type="submit">Send Message</Button>
          </form>
        </>
    )
}

export default ChatRoom;