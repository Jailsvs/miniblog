import {useState, useEffect} from "react";
import { db } from '../firebase/config';
import {  collection, 
          query, 
          orderBy,
          onSnapshot, 
          where } from 'firebase/firestore';  

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {

    async function loadData() {
      if (cancelled) {
        return;
      }
      setLoading(true);
      const collectionRef = await collection(db, docCollection)
      
      try {
        let searchExpression = null;
        if (search) 
          searchExpression = where("tags", "array-contains", search);
        else if (uid) 
          searchExpression = where("uid", "==", uid);

        let q = await query(collectionRef, 
                                 (searchExpression ? searchExpression : null), 
                                 orderBy("createdAt", "desc"));                            
        
        await onSnapshot(q, (querySnapshot) => {
          setDocuments(querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
          )
        });
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    }
    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, [])

  return { documents, loading, error };
}