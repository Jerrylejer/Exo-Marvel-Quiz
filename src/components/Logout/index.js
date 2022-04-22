import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/FirebaseConfig';

const Logout = () => {

  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);
  console.log(checked)

  useEffect (() => {
    if (checked) {
      // console.log('déconnexion')
      signOut(auth).then(() => {
        setTimeout(() => {
            navigate('/')
        }, 1000)
      }).catch((error) => {
        // console.log('Une erreur lors du logOut !')
      });
    }
  }, [checked, navigate]);

  const handleChange = (e) => {
    setChecked(e.target.checked)
    console.log(e.target.value)
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input onChange={handleChange} type="checkbox"
        checked={checked}/>
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default Logout;