// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import {
  sinInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up form/sign-up-form.component";

const SignIn = () => {
  const logGooleUser = async () => {
    const { user } = await sinInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWIthGoogleRedirect();
  //   const userDocRef = await createUserDocumentFromAuth(user);
  // };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGooleUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
