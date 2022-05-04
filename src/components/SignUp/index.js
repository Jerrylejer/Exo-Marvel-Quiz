import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, user } from '../Firebase/FirebaseConfig';
import { setDoc } from 'firebase/firestore';

const SignUp = () => {
    // Initialisation du Hooks useNavigate pour la redirection en fin de formulaire
    const navigate = useNavigate();

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    // Autre manière de faire => faire autant de states que d'inputs
    // Ici un state pour tous les inputs
    const [loginData, setLoginData] = useState({ data });
    console.log(loginData);

    // Fonction évènement pour la récolte des datas du formulaire
    const handleChange = (e) => {
        // conditions d'update de l'objet data + modification du state
        if (e.target.id !== '') {
            setLoginData({ ...loginData, [e.target.id]: e.target.value });
            // idem que setLoginData({ ...loginData, [data.pseudo] ou [data.email] ...: e.target.value });
        }
    };

    // Mise en place de l'apparition du bouton d'envoi du formulaire
    const { pseudo, email, password, confirmPassword } = loginData;
    const btn =
        pseudo === '' ||
        email === '' ||
        password === '' ||
        password !== confirmPassword ? (
            <button disabled>Inscription</button>
        ) : (
            <button>Inscription</button>
        );

    // Mise en place de l'interaction avec Firebase
    // L'erreur est gérée par Firebase et est de différentes natures => useState
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // On récupère l'@ et mdp entrés dans le formaulaire
        const { email, password } = loginData;
        // const auth = getAuth(); => Ici elle est importée depuis FirebaseConfig.js
        // Méthode qui instancie l'email & le mot de passe dans Firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(authUser => {
                return setDoc(user(authUser.user.uid), {
                    pseudo,
                    email
                })
            })
            .then((user) => {
                // réinitialisation du formulaire
                setLoginData({ ...data });
                // redirection vers le Link '/welcome'
                navigate('/member');
            })
            .catch((error) => {
                // On demande à Firebase de signaler l'erreur
                setError(error);
                // réinitialisation du formulaire
                setLoginData({ ...data });
            });
    };

    const errorMsg = error !== '' && <span>{error.message}</span>;

    return (
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftSignup'></div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        {errorMsg}
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='inputBox'>
                                <input
                                    onChange={handleChange}
                                    value={pseudo}
                                    type='text'
                                    id='pseudo'
                                    autoComplete='off'
                                    required
                                />
                                <label htmlFor='pseudo'>Pseudo</label>
                            </div>
                            <div className='inputBox'>
                                <input
                                    onChange={handleChange}
                                    value={email}
                                    type='email'
                                    id='email'
                                    autoComplete='off'
                                    required
                                />
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className='inputBox'>
                                <input
                                    onChange={handleChange}
                                    value={password}
                                    type='password'
                                    id='password'
                                    autoComplete='off'
                                    required
                                />
                                <label htmlFor='password'>Mot de passe</label>
                            </div>
                            <div className='inputBox'>
                                <input
                                    onChange={handleChange}
                                    value={confirmPassword}
                                    type='password'
                                    id='confirmPassword'
                                    autoComplete='off'
                                    required
                                />
                                <label htmlFor='confirmPassword'>
                                    Confirmer le mot de passe
                                </label>
                            </div>
                            <br />
                            {btn}
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to='/login'>
                                Déjà inscrit ? Connecte-toi !
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
