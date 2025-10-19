import { 
    collection, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    query, 
    orderBy 
  } from 'firebase/firestore';
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { db, storage } from './config';
  
  // Categories Services
  export const getCategories = async () => {
    const q = query(collection(db, 'categories'), orderBy('order'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  
  export const addCategory = async (categoryData) => {
    return await addDoc(collection(db, 'categories'), {
      ...categoryData,
      createdAt: new Date().toISOString()
    });
  };
  
  export const updateCategory = async (id, categoryData) => {
    const categoryRef = doc(db, 'categories', id);
    return await updateDoc(categoryRef, {
      ...categoryData,
      updatedAt: new Date().toISOString()
    });
  };
  
  export const deleteCategory = async (id) => {
    const categoryRef = doc(db, 'categories', id);
    return await deleteDoc(categoryRef);
  };
  
  // Items Services
  export const getItems = async () => {
    const snapshot = await getDocs(collection(db, 'items'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  
  export const addItem = async (itemData) => {
    return await addDoc(collection(db, 'items'), {
      ...itemData,
      createdAt: new Date().toISOString()
    });
  };
  
  export const updateItem = async (id, itemData) => {
    const itemRef = doc(db, 'items', id);
    return await updateDoc(itemRef, {
      ...itemData,
      updatedAt: new Date().toISOString()
    });
  };
  
  export const deleteItem = async (id) => {
    const itemRef = doc(db, 'items', id);
    return await deleteDoc(itemRef);
  };
  
  // Image Upload Service
  export const uploadImage = async (file, folder) => {
    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };
  