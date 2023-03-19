import './App.css';
import firebaseApp from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import LoginScreen from './Components/LoginScreen';

const auth = getAuth(firebaseApp);

//const firestore = firebaseApp.firestore();

function App() {
  const [user, loading] = useAuthState(auth);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="App">
      { !user && <LoginScreen/> }
      { user && (
        <>
          <div>Hello {user.displayName}</div>
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </div>
  );
}

export default App;
