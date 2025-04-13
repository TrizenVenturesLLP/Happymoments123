// services/firestoreService.js
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig.js";
import Vendor, { PricingCategory } from "../models/vendor"; // Adjust the import path as necessary

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
