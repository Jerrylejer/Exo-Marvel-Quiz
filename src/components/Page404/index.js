import React from 'react';
import batman from '../../images/batman.png';

const Page404 = () => {
    // Exemple de inline-styles
    const h2Render = {
        textAlign: 'center',
    };

    const image = {
        width: '40rem',
        margin: '40px auto',
    };

    return (
        <div className='quiz-bg'>
            <div className='container'>
                <h2 style={h2Render}>Une erreur est survenue !</h2>
                <img style={image} src={batman} alt='batman-logo' />
            </div>
        </div>
    );
};

export default Page404;
