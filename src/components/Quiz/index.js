import React, { Component } from 'react';
import Levels from '../Levels/index';
import ProgressBar from '../ProgressBar/index';
import QuizRecap from '../QuizRecap/index';
import { QuizMarvel } from '../quizMarvel/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Quiz extends Component {
    // State qui prend en compte les types et les niveaux de questionnaires
    state = {
        levelNames: ['debutant', 'confirme', 'expert'],
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
    };

    //*** TOASTIFY ***
    // Fonction qui prend en param le pseudo de l'utilisateur et retourne le toast configuré sur https://fkhadra.github.io/react-toastify/introduction/
    showWelcomeMessage = (pseudo) => {
        if (!this.state.showWelcomeMsg) {
            this.setState({
                showWelcomeMsg: true,
            });
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
        this.loadQuestions(this.state.levelNames[this.state.actualLevel]);
    }

    // Je récupère le tableau initial incluant la réponse à la question (pas récupérable autrement)
    // Les Refs permettent d'uenregister de la données
    //todo *** VALIDATION REPONSE ***
    initialArray = React.createRef();
    //todo *** VALIDATION REPONSE ***

    loadQuestions = (actualLevel) => {
        // Récupération du questionnaire dans une variable
        const selectedQuizLevel = QuizMarvel[0].quizz[actualLevel];
        // console.log(selectedQuizLevel);

        if (selectedQuizLevel.length === this.state.minQuestions) {
            //todo *** VALIDATION REPONSE ***
            this.initialArray.current = selectedQuizLevel;
            //todo *** VALIDATION REPONSE ***

            // Ici un nouveau tableau exempt des réponses pour la non visibilité dans React DevTools
            const newQuizWithoutAnswer = selectedQuizLevel.map(
                ({ answer, ...keepRest }) => keepRest
            );
            // J'alimente mon state avec le nouveau tableau de données
            this.setState({
                newArray: newQuizWithoutAnswer,
            });
        } else {
            console.log('Pas assez de questions');
        }
    };

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.minQuestions - 1) {
            // Si mon quiz est terminé, je stoppe le quiz
            this.gameOver();
        } else {
            // S'il n'est pas terminé, je passe à la question suivante
            this.setState((prevState) => ({
                idQuestion: prevState.idQuestion + 1,
            }));
        }
        //todo *** VALIDATION REPONSE ***

        const goodAnswer =
            this.initialArray.current[this.state.idQuestion].answer;
        console.log(goodAnswer);

        if (this.state.userAnswer === goodAnswer) {
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
        // Si le newArray n'est plus vide (càd remplie avec le quiz)
        if (this.state.newArray !== prevState.newArray) {
            // Je modifie le state avec ma première question et les options de réponses correspondantes
            this.setState({
                // Je change à nouveau le state et récupère la question et les options de newArray[0] (1ere question)
                question: this.state.newArray[this.state.idQuestion].question,
                options: this.state.newArray[this.state.idQuestion].options,
            });
        }
        // Je récupère ici la question suivante et les options de réponses associées
        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                // Je change à nouveau le state et récupère la question et les options de newArray[0] (1ere question)
                question: this.state.newArray[this.state.idQuestion].question,
                options: this.state.newArray[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true,
            });
        }
        //*** TOASTIFY ***
        // Si un pseudo est bien retourné, j'invoque la fonction showWelcomeMessage(pseudo retourné)
        if (this.props.userData.pseudo) {
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

    gameOver = () => {
        this.setState({
            quizEnd: true,
        });
    };

    render() {
        // Itération et affichage des options de réponses
        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p
                    key={index}
                    // L'option de réponse cliquée par l'utilisateur est bien cette option itérée ?
                    // J'isole l'option cliquée avec le CSS 'selected'
                    className={`answerOptions ${
                        this.state.userAnswer === option ? 'selected' : null
                    }`}
                    onClick={() => this.optionValidation(option)}
                >
                    {option}
                </p>
            );
        });

        // Ternaire
        return this.state.quizEnd ? (
            // this.initialArray.current fonctionne de même
            <QuizRecap ref={this.initialArray} />
        ) : (
            <>
                <ToastContainer style={{ width: '10em', fontSize: '0.5em' }} />
                <h2>Pseudo: {this.props.userData.pseudo}</h2>
                <Levels />
                <ProgressBar idQuestion={this.state.idQuestion} minQuestions={this.state.minQuestions} />
                <h2>Question: {this.state.question}</h2>
                {displayOptions}
                <button
                    disabled={this.state.btnDisabled}
                    className='btnSubmit'
                    onClick={this.nextQuestion}
                >
                    {this.state.idQuestion < this.state.minQuestions-1 ? "Suivant" : "Terminer" }
                </button>
            </>
        );
    }
}

export default Quiz;
