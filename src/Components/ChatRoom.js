import firebaseApp from "../firebase";
import { useState, useEffect, useRef } from 'react';
import { collection, getFirestore, query, orderBy, onSnapshot, addDoc, serverTimestamp  } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import ChatMessage from "./ChatMessage";

function ChatRoom(props) {
    const messagesEndRef = useRef(null);
    const [message, setMessage] = useState([]);
    const [formValue, setFormValue] = useState('');

    const db = getFirestore(firebaseApp);
    const messageRef = collection(db, 'messages');
    const q = query(messageRef, orderBy('createdAt', 'asc'));

    useEffect(()=>{
      const unsub = onSnapshot(q, (snapshot)=> {
        setMessage(snapshot.docs.map((doc)=> doc.data()))
      });

      return unsub;
    },[])

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [message]);

    const sendMessage = async(e) => {
      e.preventDefault();

      const { uid, photoURL } = props.user;
      const payload = { text: formValue, photoURL, uid, createdAt: serverTimestamp()};
      addDoc(messageRef, payload);
      setFormValue('');
    };

    return (
      <>
        <main>
          {message && message.map((msg, index) => <ChatMessage key={index} message={msg} user={props.user} />)}
          <div ref={messagesEndRef} />
        </main>
        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e)=> setFormValue(e.target.value)}></input>
          <Button variant="primary" type="submit">Send Message</Button>
        </form>
      </>
    )
}

export default ChatRoom;