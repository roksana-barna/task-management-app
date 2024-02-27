import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext } from 'react';
import axios from 'axios';
import { app } from '../Firebase/firebase';

const auth = getAuth(app);
export const AuthContext =createContext(null);

const AuthProvider = ({children}) => {
    const [loading,setLoading]=useState(true);
    const [user,setUser]=useState(null)
    const googleProvider = new GoogleAuthProvider();

    const createUser =(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn =(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
   }
   const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
}

   const logOut =()=>{
    setLoading(true);
    return signOut(auth)
 }
 const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
    });
}

 
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        console.log('current user', currentUser);
        // for token use
        if(currentUser){
            axios.post('http://localhost:5173/jwt', {email: currentUser.email})
            .then(data =>{
                localStorage.setItem('access-token', data.data.token)
                setLoading(false);
            })
        }
        else {
            localStorage.removeItem('access-token')
        }
    });
    return () => {
        return unsubscribe();
    }
}, [])
   
    const authInfo={
        user,
        createUser,
        signIn,
        logOut,
        loading,
        googleSignIn,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
              {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;