import {useState, useEffect} from "react";
import { db } from '../firebase/config';
import {  collection, doc, getDoc } from 'firebase/firestore';  

export const useFetchDocument = (docCollection, uid) => {
  
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {

    async function loadDoc() {
      if (cancelled) {
        return;
      }
      setLoading(true);
      try {
        const docRef = await doc(db, docCollection, uid);
        const docSnapshot = await getDoc(docRef);
        setDocument(docSnapshot.data());
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }

    }
    loadDoc();
  }, [docCollection, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, [])

  return { document, loading, error };
}