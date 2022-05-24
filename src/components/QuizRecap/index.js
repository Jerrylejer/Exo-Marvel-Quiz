import React, { useEffect, useState } from 'react';
import Loader from '../Loader/index';
import Modal from '../Modal';
import axios from 'axios';
import { GiChampions } from 'react-icons/gi';

const QuizRecap = React.forwardRef((props, ref) => {
    const {
        levelNames,
        actualLevel,
        score,
        percent,
        minQuestions,
        loadLevelQuestions,
    } = props;
    // console.log(ref);
    //TODO RECUPERATION DU REF ET CHARGEMENT DU STATE
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        setQuiz(ref.current);
        // console.log(ref.current)
    }, [ref]);
    //TODO RECUPERATION DU REF ET CHARGEMENT DU STATE

    //TODO DONNEES API
    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
    const hash = '886e2657306be079bbbfa1e5e50d3a78';
    console.log(API_PUBLIC_KEY);
    //TODO DONNEES API

    //TODO MODAL API
    const [openModal, setOpenModal] = useState(false);
    const [displayCharacterInfo, setDisplayCharacterInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const showModal = (id) => {
        setOpenModal(true);
        axios
            .get(
                `https://gateway.marvel.com/v1/public/characters/${id}?ts-1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
            )
            .then((response) => {
                // On charge le state avec les données de l'api
                setDisplayCharacterInfo(response.data);
                // On arrête le loader
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const closeModal = () => {
        setOpenModal(false);
        setLoading(true);
        setDisplayCharacterInfo([]);
    };
    //TODO MODAL API

    const mediumScore = minQuestions / 2;

    // Retour au Quiz en cours si score < mediumScore
    if (score < mediumScore) {
        setTimeout(() => {
            loadLevelQuestions(actualLevel);
        }, 3000);
    }

    const displayRecapMsg =
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
                            <button
                                className='btnResult success'
                                onClick={() => loadLevelQuestions(actualLevel)}
                            >
                                Niveau suivant
                            </button>
                        </>
                    ) : (
                        <>
                            {/* SI ON EST DEJA AU LEVEL EXPERT */}
                            <p className='successMsg'>
                                <GiChampions size='1.5em' /> Bravo, vous êtes un
                                expert !
                            </p>
                            <button
                                className='btnResult gameOver'
                                onClick={() => loadLevelQuestions(0)}
                            >
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
                    <button
                        className='btnResult gameOver'
                        onClick={loadLevelQuestions}
                    >
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
                    <button
                        className='btnInfo'
                        onClick={() => showModal(question.heroId)}
                    >
                        Infos
                    </button>
                </td>
            </tr>
        );
    });
    // TODO DISPATCH DES DONNEES DU QUIZ

    const displayResultsInModal = !loading ? (
        <>
            <div className='modalHeader'>
                <h2>{displayCharacterInfo.data.results[0].name}</h2>
            </div>
            <div className='modalBody'>
                <h3>Titre 2</h3>
            </div>
            <div className='modalFooter'>
                <button className='modalBtn'>Fermer</button>
            </div>
        </>
    ) : (
        <>
            <div className='modalHeader'>
                <h2>Réponse de Marvel en réception ...</h2>
            </div>
            <div className='modalBody'>
                <Loader />
            </div>
        </>
    );

    return (
        <>
            {displayRecapMsg}
            <hr />
            {score >= mediumScore ? (
                <>
                    <p className='quizRecapPara'>
                        Les réponses aux questions posées :
                    </p>
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
                <Loader />
            )}
            <Modal showModal={openModal} closeModal={closeModal}>
                {displayResultsInModal}
            </Modal>
        </>
    );
});

export default React.memo(QuizRecap);
