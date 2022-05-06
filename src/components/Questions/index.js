import React, { useState } from 'react';

const Questions = (props) => {
    const [validate, setValidate] = useState(false);
    const [userAnswer, setUserAnswer] = useState(null);

    const optionValidation = (selectedOption) => {
        setUserAnswer(selectedOption);
        setValidate(true);
    };

    const displayOptions = props.options.map((option, index) => {
        return (
            <p
                key={index}
                className={`answerOptions ${userAnswer === option ? 'selected' : null}`}
                onClick={() => optionValidation(option)}
            >
                {option}
            </p>
        );
    });

    const buttonValidation =
        validate === true ? (
            <button className='btnSubmit'>Suivant</button>
        ) : (
            <button className='btnSubmit' disabled>
                Suivant
            </button>
        );

    return (
        <>
            <h2>{props.question}</h2>
            {displayOptions}
            {buttonValidation}
        </>
    );
};

export default Questions;
