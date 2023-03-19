import firebaseApp from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
        <div>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}

export default LoginScreen;