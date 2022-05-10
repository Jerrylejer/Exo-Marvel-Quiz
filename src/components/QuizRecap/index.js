import React, { useEffect, useState } from 'react';

const QuizRecap = React.forwardRef((props, ref) => {
    // console.log(ref);
    //* RECUPERATION DU REF ET CHARGEMENT DU STATE
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        setQuiz(ref.current);
        // console.log(ref.current)
    }, [ref]);
    //* RECUPERATION DU REF ET CHARGEMENT DU STATE

    // TODO DISPATCH DES DONNEES DU QUIZ 
    const quizTable = quiz.map((question) => {
        return (
            <tr key={question.id}>
                <td>{question.question}</td>
                <td>{question.answer}</td>
                <td><button className="btnInfo">Infos</button></td>
            </tr>
        );
    });
    // TODO DISPATCH DES DONNEES DU QUIZ

    return (
        <>
            <div className='stepsBtnContainer'>
                <p className='successMsg'>Bravo, vous êtes un expert !</p>
                <button className='btnResult success'>Niveau suivant</button>
            </div>
            <div className='percentage'>
                <div className='progressPercent'>Réussite: 10%</div>
                <div className='progressPercent'>Note: 10/10</div>
            </div>
            <hr />
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
    );
});

export default React.memo(QuizRecap);
