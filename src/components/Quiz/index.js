import React from 'react'

const Quiz = ( {userData} ) => {

  const { pseudo } = userData;

  return (
    <div>
      <h2>Pseudo: { pseudo }</h2>
    </div>
  )
}

export default Quiz;