import firebaseApp from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Button from 'react-bootstrap/Button';

const auth = getAuth(firebaseApp);

function LoginScreen() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    try {
      signInWithPopup(auth, provider);
    } catch (error) {
      //TODO: Handle error
      console.log(error);
    }
  }

  return (
    <div className='login-container'>
      <h1 className='login-title'>Sheng's Chat</h1>
      <Button variant='primary' onClick={signInWithGoogle}>Sign in with Google</Button>
    </div>
  )
}

export default LoginScreen;