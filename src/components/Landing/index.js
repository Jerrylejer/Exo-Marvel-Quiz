import React, { useRef, useLayoutEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    //todo Effets départs sur Wolverine & apparitions boutons (validée avant visio tuto)
    // Ciblage de l'élément principal de la page avec le useRef
    const refWolverine = useRef(null);
    // useState pour les buttons
    const [buttons, setButtons] = useState(false);
    // useLayoutEffect à effet unique [] qui s'éxécute après le montage du composant
    useLayoutEffect(() => {
        setTimeout(() => {
            // Apparition des griffes à 3 secondes
            refWolverine.current.classList.add('startingImg');
        }, 1000);
        // Disparition de la class à 6
        setTimeout(() => {
            refWolverine.current.classList.remove('startingImg');
            // Les buttons apparaissent
            setButtons(true);
        }, 2000);
    }, []);

    //todo Effets griffes // boutons (validée avant viso tuto)
    const handleMouseOverLeft = () => {
        refWolverine.current.classList.add('leftImg');
    };
    const handleMouseOutLeft = () => {
        refWolverine.current.classList.remove('leftImg');
    };
    const handleMouseOverRight = () => {
        refWolverine.current.classList.add('rightImg');
    };
    const handleMouseOutRight = () => {
        refWolverine.current.classList.remove('rightImg');
    };

    // condition ternaire reliée au state
    const buttonsAppear = buttons ? (
        <>
            <div className='leftBox'>
              <Link to="login">
              <button
                    className='btn-welcome'
                    onMouseOver={handleMouseOverLeft}
                    onMouseOut={handleMouseOutLeft}
                >
                    Connexion
                </button>
              </Link>
               
            </div>
            <div className='rightBox'>
              <Link to="signUp">
              <button
                    className='btn-welcome'
                    onMouseOver={handleMouseOverRight}
                    onMouseOut={handleMouseOutRight}
                >
                    Inscription
                </button>
              </Link>
            </div>
        </>
    ) : (
        false
    );

    return (
        <main ref={refWolverine} className='welcomePage'>
            {buttonsAppear}
        </main>
    );
};

export default Landing;
