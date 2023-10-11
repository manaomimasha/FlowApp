import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDuVBEekEomer32JTarSJiBenMjZvjzjB8",
  authDomain: "unart-f38f9.firebaseapp.com",
  databaseURL: "https://unart-f38f9-default-rtdb.firebaseio.com",
  projectId: "unart-f38f9",
  storageBucket: "unart-f38f9.appspot.com",
  messagingSenderId: "258526916022",
  appId: "1:258526916022:web:f9fccca21e61df8a4c6517"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {

  
const [articuloFirestore, setArticuloFirestore] = useState(null);
useEffect(() => {
  const articuloRef = doc(db, 'producto', 'pizza');

  getDoc(articuloRef)
    .then((doc) => {
      if (doc.exists()) {
        setArticuloFirestore(doc.data());
      } else {
        console.log('El artículo de Firestore no existe.');
      }
    })
    .catch((error) => {
      console.error('Error al recuperar el artículo de Firestore:', error);
    });
}, []);
  return (
    <div>
      <h1>Hello Mundo!</h1>
      <p>Aqui traeremos el artículo:</p>
      {articuloFirestore ? (
        <div>
          <h2>Firestore:</h2>
          <h3>{articuloFirestore?.nombre}</h3>
          <p>{articuloFirestore?.desc}</p>
          <p>{articuloFirestore?.precio}</p>
        </div>
      ) : (
        <p>Cargando el artículo...</p>
      )}
    </div>
  );
}
