import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDeSx6tyib760X0o7h-i-d0Wn1-8xYgUU0",
  authDomain: "d-clothing-3a44d.firebaseapp.com",
  databaseURL: "https://d-clothing-3a44d.firebaseio.com",
  projectId: "d-clothing-3a44d",
  storageBucket: "d-clothing-3a44d.appspot.com",
  messagingSenderId: "616258884512",
  appId: "1:616258884512:web:0e993f698bb9e315458ac5",
  measurementId: "G-TDVS7BL0T1"
};
  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData ) => {
      if(!userAuth) return;

      const userRef=firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get();
//if there is not snapShot data, then create it in (userRef.set({})) function:
      if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt= new Date();

        try{
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          });
        }catch (error) {
          console.log('error creating user', error.message);

        }
      }
      // always we want to return userRef so we may want to do other things with it:
      return userRef;

  };

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach( obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    })
    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
    const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
      const { title, items } =docSnapshot.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: docSnapshot.id,
        title,
        items
      };
    });

    return transformedCollection.reduce((accumulator, collection) =>{
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {})
  };

  export const auth= firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle=() => auth.signInWithPopup(provider);

  export default firebase;