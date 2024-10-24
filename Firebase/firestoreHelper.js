import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    await addDoc(collection(database, collectionName), data);
    console.log("Document successfully written!");
  }
  catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function deleteFromDB(dataId, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, dataId));
    console.log("Document successfully deleted!");
  }
  catch (e) {
    console.error("Error removing document: ", e);
  }
}

export async function deleteAll(collectionName) {
  try {
    const querySnapShot = await getDocs(collection(database, collectionName));
    querySnapShot.forEach((doc) => {
      deleteFromDB(doc.id, collectionName);
    });
  } catch {
    console.error("Error deleting all documents");
  }
}

export async function readAll(collectionName) {
  try {
    const querySnapShot = await getDocs(collection(database, collectionName));
    const allDocs = []
    querySnapShot.forEach((doc) => {
      allDocs.push(doc.data());
    });
    return allDocs;
  } catch {
    console.error("Error deleting all documents");
  }
}

export const updateWarning = async (dataId, collectionName) => {
  try {
    const goalRef = doc(database, collectionName, dataId);
    await updateDoc(goalRef, {
      warning: true,
    });
    console.log("Warning flag added successfully.");
  } catch (error) {
    console.error("Error updating warning: ", error);
  }
};