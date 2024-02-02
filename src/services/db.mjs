import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let db = false;

export const getDb = () => {
    if(!db){
        const firebaseConfig = {
            apiKey: "AIzaSyAISZzwZ3u78zz6qURJadMrH2ztY-vVAGk",
            authDomain: "james-2dbee.firebaseapp.com",
            databaseURL: "https://james-2dbee-default-rtdb.firebaseio.com",
            projectId: "james-2dbee",
            storageBucket: "james-2dbee.appspot.com",
            messagingSenderId: "869085628626",
            appId: "1:869085628626:web:bf36677e17ddca98b2050b",
            measurementId: "G-GR8Z59EEJT"
        }

        const app = initializeApp(firebaseConfig)

        db = getFirestore(app)
    }

    return db
}

export {db};