import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc, setDoc, getDoc } from "firebase/firestore"; 
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
    // delete subcollection too
    const subCollection = collection(database, `${collectionName}/${dataId}/users`);
    const subCollectionSnapShot = await getDocs(subCollection);
    subCollectionSnapShot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

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

export async function updateDB(id, data, collectionName) {
  try {
    await setDoc(doc(database, collectionName, id), data, { merge: true });
  } catch (err) {
    console.log("update DB ", err);
  }
}

export async function readOneDoc(id, collectionName) {
  try {
    const docSnap = await getDoc(doc(database, collectionName, id));
    if (docSnap.exists()) {
      console.log("Read one doc:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.error("Error getting document:", err);
  }
}