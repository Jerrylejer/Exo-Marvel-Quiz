import { initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

const FirebaseConfig = {
        apiKey: "AIzaSyBVqRKOI2We73lechMuww1dXd5YOiBDFko",
        authDomain: "marvel-quiz-34f3c.firebaseapp.com",
        projectId: "marvel-quiz-34f3c",
        storageBucket: "marvel-quiz-34f3c.appspot.com",
        messagingSenderId: "42555013387",
        appId: "1:42555013387:web:ca5b748b9ed11ee9eaca0e"
      };

const app = initializeApp(FirebaseConfig);
export const auth = getAuth(app);