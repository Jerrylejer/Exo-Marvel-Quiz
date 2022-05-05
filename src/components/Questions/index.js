import React from 'react'

const Questions = (props) => {

  const displayOptions = props.options.map((option, index) => {
      return(
        <p key={index} className="answerOptions">{option}</p>
      )
  })

  return (
    <>
    <h2>{props.question}</h2>
    { displayOptions }
    <button className="btnSubmit">Suivant</button>
    </>
  )
}

export default Questions;