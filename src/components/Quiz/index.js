import React, { Component } from 'react';
import Levels from '../Levels/index';
import ProgressBar from '../ProgressBar/index';
import QuizRecap from '../QuizRecap/index';
import { QuizMarvel } from '../quizMarvel/index';
import { ToastContainer, toast } from 'react-toastify';
import { FaChevronRight } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.min.css';

// States entrainant une modification de rendu
const initialState = {
    actualLevel: 0,
    minQuestions: 10,
    newArray: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    selected: null,
    score: 0,
    answer: null,
    showWelcomeMsg: false,
    quizEnd: false,
    percent: 0,
};

// Anciens states qui n'entrainent pas de modification de rendu
const levelNames = ['debutant', 'confirme', 'expert'];

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    //*** TOASTIFY ***
    // Fonction qui prend en param le pseudo de l'utilisateur et retourne le toast configuré sur https://fkhadra.github.io/react-toastify/introduction/
    showWelcomeMessage = (pseudo) => {
        const { showWelcomeMsg } = this.state;

        if (!showWelcomeMsg) {
            this.setState({ showWelcomeMsg: true });
            toast.warn(`Welcome ${pseudo}`, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    //*** TOASTIFY ***

    componentDidMount() {
        const { actualLevel } = this.state;

        this.loadQuestions(levelNames[actualLevel]);
    }

    // Je récupère le tableau initial incluant la réponse à la question (pas récupérable autrement)
    // Les Refs permettent d'uenregister de la données
    //todo *** VALIDATION REPONSE ***
    initialArray = React.createRef();
    //todo *** VALIDATION REPONSE ***

    loadQuestions = (actualLevel) => {
        const { minQuestions } = this.state;

        // Récupération du questionnaire dans une variable
        const selectedQuizLevel = QuizMarvel[0].quizz[actualLevel];
        // console.log(selectedQuizLevel);

        if (selectedQuizLevel.length === minQuestions) {
            //todo *** VALIDATION REPONSE ***
            this.initialArray.current = selectedQuizLevel;
            //todo *** VALIDATION REPONSE ***
            // Ici un nouveau tableau exempt des réponses pour la non visibilité dans React DevTools
            const newQuizWithoutAnswer = selectedQuizLevel.map(
                ({ answer, ...keepRest }) => keepRest
            );
            // J'alimente mon state avec le nouveau tableau de données
            this.setState({ newArray: newQuizWithoutAnswer });
        }
    };

    nextQuestion = () => {
        const { minQuestions, idQuestion, userAnswer } = this.state;

        if (idQuestion === minQuestions - 1) {
            // Si mon quiz est terminé, je stoppe le quiz
            // this.gameOver()
            this.setState({ quizEnd: true });
        } else {
            // S'il n'est pas terminé, je passe à la question suivante
            this.setState((prevState) => ({
                idQuestion: prevState.idQuestion + 1,
            }));
        }
        //todo *** VALIDATION REPONSE ***

        const goodAnswer = this.initialArray.current[idQuestion].answer;
        // console.log(goodAnswer);

        if (userAnswer === goodAnswer) {
            this.setState((prevState) => ({
                score: prevState.score + 1,
            }));
            //*** TOASTIFY ***
            toast.success('Bravo !', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Faux !', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            //*** TOASTIFY ***
        }
        //todo *** VALIDATION REPONSE ***
    };

    componentDidUpdate(prevProps, prevState) {
        const { minQuestions, newArray, idQuestion, score, quizEnd } =
            this.state;

        // Si le newArray n'est plus vide (càd remplie avec le quiz)
        if (newArray !== prevState.newArray) {
            // Je modifie le state avec ma première question et les options de réponses correspondantes
            this.setState({
                // Je change à nouveau le state et récupère la question et les options de newArray[0] (1ere question)
                question: newArray[idQuestion].question,
                options: newArray[idQuestion].options,
            });
        }
        // Je récupère ici la question suivante et les options de réponses associées
        if (idQuestion !== prevState.idQuestion) {
            this.setState({
                // Je change à nouveau le state et récupère la question et les options de newArray[0] (1ere question)
                question: newArray[idQuestion].question,
                options: newArray[idQuestion].options,
                userAnswer: null,
                btnDisabled: true,
            });
        }

        if (quizEnd !== prevState.quizEnd) {
            // On vérifie le bon changement du score
            // console.log(this.state.score)
            const recapPercentage = this.getPercentage(minQuestions, score);
            this.gameOver(recapPercentage);
        }

        //*** TOASTIFY ***
        // Si un pseudo est bien retourné, j'invoque la fonction showWelcomeMessage(pseudo retourné)
        if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
            this.showWelcomeMessage(this.props.userData.pseudo);
        }
        //*** TOASTIFY ***
    }

    // Selection de l'option par l'utilisateur et activation du bouton de validation
    optionValidation = (selectedOption) => {
        this.setState({
            userAnswer: selectedOption,
            btnDisabled: false,
        });
    };

    getPercentage = (totalQuestions, scoreUtilisateur) =>
        (scoreUtilisateur * 100) / totalQuestions;

    gameOver = (percent) => {
        const { actualLevel } = this.state;

        if (percent >= 50) {
            this.setState({
                actualLevel: actualLevel + 1,
                percent,
            });
        } else {
            this.setState({
                percent,
            });
        }
    };

    loadLevelQuestions = (param) => {
        // Mise à jour du initialState dont seul la propriété actualLevel est modifiée
        this.setState({ ...initialState, actualLevel: param });
        // Mise à jour de la fonction loadQuestions
        this.loadQuestions(levelNames[param]);
    };

    render() {
        const {
            actualLevel,
            minQuestions,
            question,
            options,
            idQuestion,
            btnDisabled,
            userAnswer,
            score,
            quizEnd,
            percent,
        } = this.state;

        // Itération et affichage des options de réponses
        const displayOptions = options.map((option, index) => {
            return (
                <p
                    key={index}
                    // L'option de réponse cliquée par l'utilisateur est bien cette option itérée ?
                    // J'isole l'option cliquée avec le CSS 'selected'
                    className={`answerOptions ${
                        userAnswer === option ? 'selected' : null
                    }`}
                    onClick={() => this.optionValidation(option)}
                >
                    <FaChevronRight /> {option}
                </p>
            );
        });

        // Ternaire
        return quizEnd ? (
            // this.initialArray.current fonctionne de même
            <QuizRecap
                ref={this.initialArray}
                levelNames={levelNames}
                percent={percent}
                score={score}
                minQuestions={minQuestions}
                actualLevel={actualLevel}
                loadLevelQuestions={this.loadLevelQuestions}
            />
        ) : (
            <>
                <ToastContainer />
                <h2>Pseudo: {this.props.userData.pseudo}</h2>
                <Levels levelNames={levelNames} actualLevel={actualLevel} />
                <ProgressBar
                    idQuestion={idQuestion}
                    minQuestions={minQuestions}
                />
                <h2>Question: {question}</h2>
                {displayOptions}
                <button
                    disabled={btnDisabled}
                    className='btnSubmit'
                    onClick={this.nextQuestion}
                >
                    {idQuestion < minQuestions - 1 ? 'Suivant' : 'Terminer'}
                </button>
            </>
        );
    }
}

export default Quiz;
