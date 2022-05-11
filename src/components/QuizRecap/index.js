import React, { useEffect, useState } from 'react';

const QuizRecap = React.forwardRef((props, ref) => {
    const { levelNames, actualLevel, score, percent, minQuestions, loadLevelQuestions } = props;
    // console.log(ref);
    //* RECUPERATION DU REF ET CHARGEMENT DU STATE
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        setQuiz(ref.current);
        // console.log(ref.current)
    }, [ref]);
    //* RECUPERATION DU REF ET CHARGEMENT DU STATE

    const mediumScore = minQuestions / 2;

    const displayQuiz =
        score >= mediumScore ? (
            /* SI LA MOYENNE EST ATTEINTE */
            <>
             <div className='stepsBtnContainer'>
                {actualLevel < levelNames.length ? (
                            <>
                                {/* S'IL RESTE DES QUIZ A CHARGER */}
                                <p className='successMsg'>
                                    Passez au niveau suivant !
                                </p>
                                <button className='btnResult success' onClick={loadLevelQuestions}>
                                    Niveau suivant
                                </button>
                            </>
                        ) : (
                            <>
                                {/* SI ON EST DEJA AU LEVEL EXPERT */}
                                <p className='successMsg'>
                                    Bravo, vous êtes un expert !
                                </p>
                                <button className='btnResult gameOver' onClick={loadLevelQuestions}>
                                    Accueil
                                </button>
                            </>
                        )}
                        {/* AFFICHAGE SANS CONDITION DU % ET SCORE */}
                        <div className='percentage'>
                            <div className='progressPercent'>
                                Réussite: {percent}%
                            </div>
                            <div className='progressPercent'>
                                Note: {score}/{minQuestions}
                            </div>
                        </div>
             </div>
            </>
        ) : (
            /* SI LA MOYENNE N'EST PAS ATTEINTE */
            <>
                <div className='stepsBtnContainer'>
                    <p className='failureMsg'>
                        Retentez ce Quiz avant de passer à la suite !
                    </p>
                </div>
                <div className='percentage'>
                    <div className='progressPercent'>Réussite: {percent}%</div>
                    <div className='progressPercent'>
                        Note: {score}/{minQuestions}
                    </div>
                </div>
                <div>
                <button className='btnResult gameOver'onClick={loadLevelQuestions}>
                                    Accueil
                                </button>
                </div>
            </>
        );

    // TODO DISPATCH DES DONNEES DU QUIZ
    const quizTable = quiz.map((question) => {
        return (
            <tr key={question.id}>
                <td>{question.question}</td>
                <td>{question.answer}</td>
                <td>
                    <button className='btnInfo'>Infos</button>
                </td>
            </tr>
        );
    });
    // TODO DISPATCH DES DONNEES DU QUIZ

    return (
        <>
            {displayQuiz}
            <hr />
            {score >= mediumScore ? (
                <>
                 <p className='quizRecapPara'>Les réponses aux questions posées :</p>
                    <div className='answerContainer'>
                        <table className='answers'>
                            <thead>
                                <tr>
                                    <th>QUESTIONS</th>
                                    <th>REPONSES</th>
                                    <th>INFOS</th>
                                </tr>
                            </thead>
                            <tbody>{quizTable}</tbody>
                        </table>
                    </div>
                </>
            ) : (
                null
            )}
        </>
    );
});

export default React.memo(QuizRecap);
