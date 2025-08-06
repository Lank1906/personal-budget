import React from 'react';
import db from './firebase';
import './App.css';
import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

function App() {
  useEffect(() => {
    onSnapshot(collection(db, 'Lank'), (snapshot) => {
      snapshot.docs.map((doc) => doc.data());
    });
  }, []);
  return <a href="https://chatgpt.com/c/688f1c1a-f824-8328-acbd-8a9bbdb45aed">Hello snapshot</a>;
}

export default App;
