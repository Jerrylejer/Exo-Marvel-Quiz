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
        // Vérification de la date de validité des infos précédemment chargées
        if (localStorage.getItem('marvelStorageDate')) {
            // On appelle une fonction qui se charge de la vérification
            const date = localStorage.getItem('marvelStorageDate');
            checkDataExpiration(date);
        }
    }, [ref]);

    const checkDataExpiration = (date) => {
        // Encpsulation de la date d'aujourd'hui pour comparaison
        const today = Date.now();
        // Différence entre les deux
        const timeDifference = today - date;
        // Convertion du time en days
        const dayDifference = timeDifference / (1000 * 3600 * 24);
        // condition
        if (dayDifference >= 15) {
            // On supprime toutes les données
            localStorage.clear();
            // Mise en place de la nouvelle date
            localStorage.setItem('marvelStorageDate', Date.now());
        }
    };

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

        if (localStorage.getItem(id)) {
            // Si les données sont déjà chargées => On charge depuis le LS
            setDisplayCharacterInfo(JSON.parse(localStorage.getItem(id)));
            // On arrête le loader
            setLoading(false);
        } else {
            // Si les données n'existent pas => On charge depuis la requête Api
            axios
                .get(
                    `https://gateway.marvel.com/v1/public/characters/${id}?ts-1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
                )
                .then((response) => {
                    // On charge le state avec les données de l'api
                    setDisplayCharacterInfo(response.data);
                    console.log(response);
                    // On arrête le loader
                    setLoading(false);
                    // On initialise le second stockage de cette réponse dans le LS Key-Value
                    localStorage.setItem(id, JSON.stringify(response.data));
                    // Setup de la date si pas d'info déjà chargée
                    if (!localStorage.getItem('marvelStorageDate')) {
                        localStorage.setItem('marvelStorageDate', Date.now());
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const closeModal = () => {
        setOpenModal(false);
        setLoading(true);
        setDisplayCharacterInfo([]);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                <div className='comicImage'>
                    <img
                        src={
                            displayCharacterInfo.data.results[0].thumbnail
                                .path +
                            '.' +
                            displayCharacterInfo.data.results[0].thumbnail
                                .extension
                        }
                        alt={displayCharacterInfo.data.results[0].name}
                    />
                    <p>{displayCharacterInfo.attributionText}</p>
                </div>
                <div className='comicDetails'>
                    <h3>Description</h3>
                    {displayCharacterInfo.data.results[0].description ? (
                        <p>
                            {displayCharacterInfo.data.results[0].description}
                        </p>
                    ) : (
                        <p>Description indisponible pour le moment</p>
                    )}
                    <h3>Plus d'infos</h3>
                    {displayCharacterInfo.data.results[0].urls &&
                        displayCharacterInfo.data.results[0].urls.map(
                            (url, index) => {
                                return (
                                    <a
                                        key={index}
                                        href={url.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        {capitalizeFirstLetter(url.type)}
                                    </a>
                                );
                            }
                        )}
                </div>
            </div>
            <div className='modalFooter'>
                <button className='modalBtn' onClick={closeModal}>
                    Fermer
                </button>
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
