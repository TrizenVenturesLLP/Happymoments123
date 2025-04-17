// services/firestoreService.js
import { doc, getDoc, addDoc, collection, getFirestore, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig.js";
import Vendor, { PricingCategory } from "../models/vendor"; // Adjust the import path as necessary
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const getVendorDetails = async (vendorId:string): Promise<Vendor | null> => {
  try {
    console.log("db", db);
    const docRef = doc(db, "vendors", vendorId);
    const docSnap = await getDoc(docRef);
    console.log("docSnap", docSnap);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data() as Vendor;
    } else {
      console.warn("No such vendor document found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching vendor:", error);
    return null;
  }
 
};

export const addVendor = async (vendorData: Vendor) => {
  try {
    const docRef = await addDoc(collection(db, "vendors"), vendorData);
    console.log("Vendor added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding vendor: ", error);
    throw error;
  }
};


export const checkPhoneUnique = async (phone) => {
  const db = getFirestore();
  const q = query(collection(db, "vendors"), where("phone", "==", phone));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty; // true if no vendor has this phone
};