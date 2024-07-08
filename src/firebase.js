import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, orderBy, query, getDocs, writeBatch, doc } from "firebase/firestore";

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
// add()
// docRef.id тут айди каждого элемента
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












// export async function deleteTodos(itemIds) {
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