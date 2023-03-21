import './App.css';
import firebaseApp from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import LoginScreen from './Components/LoginScreen';
import ChatRoom from './Components/ChatRoom';

const auth = getAuth(firebaseApp);

//const firestore = firebaseApp.firestore();

function App() {
  const [user, loading] = useAuthState(auth);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="App">
      { (!user && !loading) && <LoginScreen/> }
      { user && (
        <>
          <button onClick={signOut}>Sign out</button>
          <ChatRoom user={user}/>
        </>
      )}
    </div>
  );
}

export default App;
