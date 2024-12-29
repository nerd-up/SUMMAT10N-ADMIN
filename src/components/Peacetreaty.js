// src/components/PeaceTreaty.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const PeaceTreaty = () => {
  const [signatures, setSignatures] = useState([]);

  useEffect(() => {
    const fetchSignatures = async () => {
      const snapshot = await db.collection("peaceTreaty").get();
      setSignatures(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchSignatures();
  }, []);

  const deleteSignature = async (id) => {
    await db.collection("peaceTreaty").doc(id).delete();
    setSignatures(signatures.filter(signature => signature.id !== id));
  };

  return (
    <div>
      <h3>Peace Treaty Signatures</h3>
      <ul>
        {signatures.map(sig => (
          <li key={sig.id}>
            <p>{sig.name}</p>
            <button onClick={() => deleteSignature(sig.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PeaceTreaty;
