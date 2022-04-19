import React, { useState, useEffect } from 'react';

const Logout = () => {

  const [checked, setChecked] = useState(false);
  console.log(checked)

  useEffect (() => {
    if (checked) {
      console.log('déconnexion')
    }
  }, [checked]);

  const handleChange = (e) => {
    setChecked(e.target.checked)
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