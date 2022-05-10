import React from 'react';

const ProgressBar = ( {idQuestion, minQuestions} ) => {

    const questionIncrement = idQuestion + 1;

    const progress = (totalQuestions, actualQuestion) => {
        return (100/totalQuestions) * actualQuestion;
    };

    const percentage = progress(minQuestions, questionIncrement);

    // console.log(percentage);

    return (
        <>
            <div className='percentage'>
                <div className='progressPercent'>{`Question: ${idQuestion+1}/${minQuestions}`}</div>
                <div className='progressPercent'>{`Progression: ${percentage}%`}</div>
            </div>
            <div className="progressBar">
                <div className="progressBarChange" style={{width: `${percentage}%`}}></div>
            </div>
        </>
    );
};

export default React.memo(ProgressBar);
