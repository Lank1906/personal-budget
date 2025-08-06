import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from './firebase';
import './App.css';

function App() {
  const [data, setData] = useState<any[]>([]); // nếu bạn biết cấu trúc object, nên khai rõ type

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Lank'), (snapshot) => {
      const fetchedData = snapshot.docs.map((doc) => doc.data());
      setData(fetchedData); // cập nhật state -> trigger re-render
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
