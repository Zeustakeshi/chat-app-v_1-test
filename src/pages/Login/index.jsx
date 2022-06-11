import { auth, ggProvider, signIn } from "../../firebase/config";

import { db, doc, setDoc } from "../../firebase/services";

const Login = () => {
    const handleClick = async () => {
        const data = await signIn(auth, ggProvider);
        const isNewUser = data._tokenResponse.isNewUser;
        const user = data.user;

        if (isNewUser) {
            const id = user.uid.slice(4, 14);
            const docData = {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                friends: [],
                id: id,
                providerId: data._tokenResponse.providerId,
            };
            await setDoc(doc(db, "user", user.uid), docData);
        }
    };
    return (
        <div className='form-login'>
            <button className='loin-gg' onClick={handleClick}>
                login with google
            </button>
        </div>
    );
};

export default Login;
