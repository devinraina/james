import { getDocs, collection, runTransaction, doc } from "firebase/firestore"; 
import { getDb, db } from "./db.mjs"
import { getDatabase, ref, set } from 'firebase/database'

const collection_name = "status"

export const findAll = async () => {
    const doc_refs = await getDocs(collection(getDb(), collection_name))

    const res = []
    console.log(res)

    doc_refs.forEach(todo => {
        res.push({
            id: todo.id, 
            ...todo.data()
        })
    })

    return res
}

export const update= async ()=>{
  let res=await findAll()
  let Id=(res[0].id);
    try {
        const docRef = doc(db, "status", Id);
        await runTransaction(db, async (transaction) => {
          const todoDoc = await transaction.get(docRef);
          if (!todoDoc.exists()) {
            throw "Document does not exist!";
          }
          const newValue = !todoDoc.data().isCompleted;
          transaction.update(docRef, { isCompleted: newValue });
        });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }
}

export async function writeUserData() {
  const db = getDatabase();
  let res=await findAll()
  let userId=(res[0].id);
  set(ref(db, 'status/' + userId), {
    "bWash": false
  });
}