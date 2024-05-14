import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-bzIbP_45KdJNUJ61y8vL9ttztff4nJY",
  authDomain: "movies-6dbc7.firebaseapp.com",
  databaseURL: "https://movies-6dbc7-default-rtdb.firebaseio.com",
  projectId: "movies-6dbc7",
  storageBucket: "movies-6dbc7.appspot.com",
  messagingSenderId: "1829894124",
  appId: "1:1829894124:web:3a38a9135122d8fb1372c9"
};
// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);