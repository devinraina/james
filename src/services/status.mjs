import { getDocs, collection, runTransaction, doc,} from "firebase/firestore"; 
import { getDb, db } from "./db.mjs"

const collection_name = "status"

//

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

export const updateT = async () => {
  const id = "zzzzzzzzzzzzzzzzzzzy";
  try {
    await runTransaction(db, async (transaction) => {
      const todoDoc = await transaction.get(doc(db, collection_name, id));
      if (!todoDoc.exists) {
        throw new Error("Document does not exist!");
      }
      transaction.update(todoDoc.ref, { tWash: 'true' });
    });
    console.log("Transaction successfully committed! Document updated:", id);
  } catch (error) {
    console.log("Transaction failed:", error);
  }
};

export const updateF = async () => {
  const id = "zzzzzzzzzzzzzzzzzzzy";
  try {
    await runTransaction(db, async (transaction) => {
      const todoDoc = await transaction.get(doc(db, collection_name, id));
      if (!todoDoc.exists) {
        throw new Error("Document does not exist!");
      }
      transaction.update(todoDoc.ref, { tWash: 'false' });
    });
    console.log("Transaction successfully committed! Document updated:", id);
  } catch (error) {
    console.log("Transaction failed:", error);
  }
};
