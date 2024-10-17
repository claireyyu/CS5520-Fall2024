import { collection, addDoc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    console.log("Data name: ", data);
  }
  catch (e) {
    console.error("Error adding document: ", e);
  }
}
