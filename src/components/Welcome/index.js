import React from 'react';
import Logout from '../Logout';
import Quiz from '../Quiz';

const Welcome = () => {
    return (
        <div className='quiz-bg'>
            <Logout />
            <Quiz />
        </div>
    );
};

export default Welcome;
