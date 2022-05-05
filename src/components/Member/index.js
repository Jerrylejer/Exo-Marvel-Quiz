import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, user } from '../Firebase/FirebaseConfig';
import { getDoc } from 'firebase/firestore';
import Logout from '../Logout';
import Quiz from '../Quiz';

const Member = () => {
    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (user) => {
            user ? setUserSession(user) : navigate('/');
        });
        // Si une session utilisateur existe
        if (!!userSession) {
            // J'isole mon user grâce à son ID dans une variable
            const colRef = user(userSession.uid);
            // Je récupère les documents associés
            getDoc(colRef)
                // Si les docs associés existent, je les isole dans une variable docData
                // qui me sert à modifier mon state userData
                .then((colRefData) => {
                    if (colRefData.exists()) {
                        const docData = colRefData.data();
                        console.log(docData);
                        console.log(colRefData.id);
                        setUserData(docData);
                    }
                })
                // En cas d'erreur je l'affiche en console
                .catch((error) => {
                    console.log(error);
                });
        }
        return listener();
    }, [userSession]);

    return userSession === null ? (
        <>
            <div className='loader'></div>
            <p className='loaderText'>Loading ...</p>
        </>
    ) : (
        <div className='quiz-bg'>
            <div className='container'>
                <Logout />
                <Quiz userData={userData} />
            </div>
        </div>
    );
};

export default Member;
