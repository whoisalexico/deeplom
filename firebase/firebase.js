import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyAp1_4x5CPs3j0te1lftU8EXxjcKDMPOaI",
    authDomain: "deeplom-project.firebaseapp.com",
    projectId: "deeplom-project",
    storageBucket: "deeplom-project.appspot.com",
    messagingSenderId: "588006456613",
    appId: "1:588006456613:web:c2076f3954490d83cdaecc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

if (typeof window !== 'undefined') {
    window.addEventListener('unload', function (event) {
        auth.signOut();
    });
}