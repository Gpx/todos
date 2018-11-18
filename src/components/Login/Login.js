import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

function Login() {
  async function handleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  }

  return <button onClick={handleLogin}>Login</button>;
}

export default Login;
