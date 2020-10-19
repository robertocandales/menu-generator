import firebase from './firebase-app'

export const saveUser = async (fields, token) => {
    const db = firebase.firestore()
    const auth = firebase.auth()

    const { user } = await auth.createUserWithEmailAndPassword(fields.email, fields.password)
    const userRef = db.doc(`users/${user.uid}`)
    await userRef.set({
        ...fields,
        stripeToken: JSON.stringify(token)
    })

}

export const authenticateUser = async ({email, password}) => {
    const db = firebase.firestore()
    const auth = firebase.auth()

    try {
        console.log('here')
        const user = (await auth.signInWithEmailAndPassword(email, password)).user
        
        console.log(user.uid)
        localStorage.setItem('user', JSON.stringify(user))

        return true
    } catch {
        return false
    }
}