import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
   GoogleAuthProvider,
  signInWithEmailAndPassword,
   signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();
const API_URL = 'http://localhost:3000';

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Firebase user with backend MongoDB and get JWT token
  const syncUserWithBackend = async (firebaseUser) => {
    if (!firebaseUser) {
      setUser(null);
       localStorage.removeItem('jwt_token');
      return;
    }

    try {
      // user exists in backend
      const userResponse = await axios.get(`${API_URL}/users`);
       const existingUser = userResponse.data.find(u => u.email === firebaseUser.email);

      let backendUser;
      if (existingUser) {
        backendUser = existingUser;
      } else {
        // New user, create in backend
        const defaultAvatar = "https://i.ibb.co/hRNkzFqh/smiling-redhaired-boy-illustrati.png";
        const newUser = {
            email: firebaseUser.email,
          name: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || defaultAvatar,
          role: 'user', 
          bio: ''
        };
        // Ensure photoURL is never empty
        if (!newUser.photoURL || newUser.photoURL.trim() === '') {
          newUser.photoURL = defaultAvatar;
        }
          const createResponse = await axios.post(`${API_URL}/users`, newUser);
        backendUser = createResponse.data;
      }

      // Get JWT token from backend
      try {
        const tokenResponse = await axios.post(`${API_URL}/auth/jwt`, {
          email: firebaseUser.email
          });
        const { token } = tokenResponse.data;
          localStorage.setItem('jwt_token', token);
      } catch (tokenError) {
        console.error('Error getting JWT token:', tokenError);
      }

      //Firebase and backend data
      setUser({ ...firebaseUser, ...backendUser });
    } catch (error) {
        console.error('Error syncing user:', error);
      // Fallback to Firebase user only
      setUser(firebaseUser);
    }
  };

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('jwt_token');
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    if (!auth.currentUser) return Promise.reject('No user is logged in');
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await syncUserWithBackend(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        registerUser,
        signInUser,
         signInGoogle,
        logOut,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
