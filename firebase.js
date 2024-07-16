import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, orderBy, query, getDocs, doc, getDoc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCdDmPzb5Y6WMgmL8shrdF1PzREfS6kX-E",
  authDomain: "store-98b44.firebaseapp.com",
  projectId: "store-98b44",
  storageBucket: "store-98b44.appspot.com",
  messagingSenderId: "170065911944",
  appId: "1:170065911944:web:4b3f26709fc42ef0e0bf3d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const items = [
    { cost: 529.99, name: 'Apple Watch', image: 'applewatch.png', description: 'Series 5 SE' },
    { cost: 39.99, name: 'Apple AirPods Max', image: 'airpods.png', description: 'Light Grey' },
    { cost: 619.99, name: 'Iphone 11', image: '11black.png', description: 'Serious Black' },
    { cost: 619.99, name: 'Iphone 11', image: '11blue', description: 'Subway Blue' },
    { cost: 1029.99, name: 'Iphone 13 Pro', image: '13problue.png', description: 'Silly Silver' },
    { cost: 1099.99, name: 'Iphone 13 Pro', image: '13problack.png', description: 'Grey' },
    { cost: 999.99, name: 'Samsung Galaxy Note 21', image: 'samsungblack.png', description: '2 - Options' },
    { cost: 849.99, name: 'Samsung Galaxy S21+', image: 'samsungpurple.png', description: 'Lilac Purple' }
];

export async function add() {
    try {
      for (const item of items) {
        const docRef = await addDoc(collection(db, "items"), {
          ...item,
          createdAt: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
};
// add();
export async function get() {
    const ref = collection(db, "items");
    const q = query(ref, orderBy('createdAt'));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
    });
    return items;
};

export async function moveDocument(sourceCollection, sourceDocId, targetCollection, targetDocId) {
    try {
      const sourceDocRef = doc(db, sourceCollection, sourceDocId);
      const sourceDoc = await getDoc(sourceDocRef);
  
      if (!sourceDoc.exists()) {
        console.log('Документ не найден в исходной коллекции');
        return;
      }
  
      const targetDocRef = doc(db, targetCollection, targetDocId);
      await setDoc(targetDocRef, sourceDoc.data());
  
    //   await deleteDoc(sourceDocRef);
  
      console.log('Документ успешно перемещен');
    } catch (error) {
      console.error('Ошибка при перемещении документа:', error);
    }
}








// export async function deleteItems(itemIds) {
//     const batch = writeBatch(db);

//     itemIds.forEach((id) => {
//         const ref = doc(db, "items", id);
//         batch.delete(ref);
//     });

//     console.log("Committing batch delete for IDs:", itemIds);
//     await batch.commit();
//     console.log("Batch delete committed successfully");
// };


// async function main() {
//     const items = await get();
//     const itemIds = items.map(item => item.id);
//     console.log("Item IDs to delete:", itemIds);
//     await deleteTodos(itemIds);
// }
// main().catch(console.error);


// --------------------

export async function getItemCart() {
    const ref = collection(db, "cart");
    const q = query(ref, orderBy('createdAt'));
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
    });
    return items;
};
// export async function deleteAllCart(itemIds) {
//     const batch = writeBatch(db);

//     itemIds.forEach((id) => {
//         const ref = doc(db, "cart", id);
//         batch.delete(ref);
//     });

//     console.log("Committing batch delete for IDs:", itemIds);
//     await batch.commit();
//     console.log("Batch delete committed successfully");
// };

export async function deleteAllCart(itemIds) {
    const batch = writeBatch(db);

    itemIds.forEach((id) => {
        const ref = doc(db, "cart", id);
        batch.delete(ref);
    });
    await batch.commit();
};
export async function getAllCartItemIds() {
    const items = await getItemCart();
    return items.map(item => item.id);
};


// async function main() {
//     const items = await getItemCart();
//     const itemIds = items.map(item => item.id);
//     console.log("Item IDs to delete:", itemIds);
//     await deleteAllCart(itemIds);
// }
// main().catch(console.error);