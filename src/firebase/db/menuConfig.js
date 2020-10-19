import firebase from './firebase-app'
import { getUserCollection } from './utils'

export const fetchMenuConfig = async () => {
    const db = firebase.firestore()

    return db.collection(getUserCollection(('menuConfig'))).get()
}

export const updateMenuConfig = async (item) => {
    const db = firebase.firestore()

    const docRef = db.collection(getUserCollection(('menuConfig'))).doc(item.id);

    // Not awaiting intentionally
    const updateTimestamp = docRef.update({
        ...item,
        lastUpdatedTimestamp: new Date()
    });
}