import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/FirebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    // Initialisation de la redirection
    const navigate = useNavigate();
    // Mise en place d'un useState par champs de formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Mise en place d'un useState en cas d'erreur
    const [error, setError] = useState('');

    // Mise en place conditionnelle du btn de validation
    const btn =
        email !== '' && password.length > 5 ? (
            <button>Validez</button>
        ) : (
            <button disabled>Validez</button>
        );

    // Mise en place de l'identification avec Firebase
    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setEmail('');
                setPassword('');
                navigate('/member', { replace: true });
            })
            .catch((error) => {
                setError(error);
                setEmail('');
                setPassword('');
            });
    };

    const errorMsg = error !== '' && <span>{error.message}</span>;

    return (
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftLogin'></div>
                <div className='formBoxRight'>
                    {errorMsg}
                    <div className='formContent'>
                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='inputBox'>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type='email'
                                    autoComplete='off'
                                    required
                                />
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className='inputBox'>
                                <input
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    type='password'
                                    autoComplete='off'
                                    required
                                />
                                <label htmlFor='password'>Mot de passe</label>
                            </div>
                            <br />
                            {btn}
                        </form>
                        <div className='linkContainer'>
                            <div className='simpleLink'>
                            <Link to='/signUp'>
                                Pas encore inscrit ? Alors au préalable
                                inscris-toi !
                            </Link>
                            </div>
                            <div className='simpleLink'>
                            <Link to='/forgetpassword'>
                                Mot de passe oublié ? C'est par ici !
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
