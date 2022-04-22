import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/FirebaseConfig';
import Logout from '../Logout';
import Quiz from '../Quiz';

const Member = () => {
    const [userSession, setUserSession] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const listener = onAuthStateChanged(auth, user => {
            user ? setUserSession(user) : navigate('/');
        })
        return listener();
    })

    return userSession === null ? (<>
    <div className="loader"></div>
    <p className="loaderText">Loading ...</p>
    </>) : (<div className='quiz-bg'>
            <Logout />
            <Quiz />
        </div>);
};

export default Member;
