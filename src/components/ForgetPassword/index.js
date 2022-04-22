import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgetPassword = () => {
    const [email, setEmail] = useState();
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('email envoyé');
                setError(null);
                setSuccess(<span style={{border: "1px solid green", background: "green", color: "#ffffff"}}>Un lien de réinitialisation vient d'être envoyé à l'adresse {email}</span>);
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            })
            .catch((error) => {
                console.log(error.message);
                setSuccess(null);
                setError(<span>L'email {email} n'est pas reconnu !</span>);
                setEmail('');
            });
    };

    const buttonAppear = email ? (
        <button>Récupérer</button>
    ) : (
        <button disabled>Récupérer</button>
    );

    return (
        <div className='signUpLoginBox'>
            <div className='slContainer'>
                <div className='formBoxLeftForget'></div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        {success}
                        {error}
                        <h2>Mot de passe oublié ?</h2>
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
                            <br />
                            {buttonAppear}
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

export default ForgetPassword;
