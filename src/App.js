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
          <header>
            <h1>Hello, {user.displayName}!</h1>
            <button className='signOut-btn' onClick={signOut}>Sign out</button>
          </header>
          <section>
            <ChatRoom user={user}/>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
