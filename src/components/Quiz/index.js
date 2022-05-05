import React, { Component } from 'react';
import Levels from '../Levels/index';
import ProgressBar from '../ProgressBar/index';
import Questions from '../Questions/index.js';
import { QuizMarvel } from '../quizMarvel/index';

class Quiz extends Component {
  // State qui prend en compte les types et les niveaux de questionnaires
  state={
    levelNames: ["debutant", "confirme", "expert"],
    actualLevel: 0,
    minQuestions: 10,
    newArray: [],
    question: null,
    options: [],
    idQuestion: 0
  }

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.actualLevel])
  }

  loadQuestions = actualLevel => {
    // console.log(actualLevel);
    const selectedQuizLevel = QuizMarvel[0].quizz[actualLevel];
    // console.log(selectedQuizLevel);
    if(selectedQuizLevel.length === this.state.minQuestions) {
      // Je renvoie un nouveau tableau exempt des réponses
      const newQuizWithoutAnswer = selectedQuizLevel.map(({answer, ...keepRest}) => keepRest);
      // J'alimente mon state avec le nouveau tableau de données
      this.setState({
        newArray: newQuizWithoutAnswer
      })
    } else {
      console.log('Pas assez de questions')
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // Si le newArray n'est pas vide (càd remplie avec le quiz)
    if(this.state.newArray !== prevState.newArray) {
      // Je modifie le state avec ma première question et les options de réponses correspondantes
      this.setState({
        question: this.state.newArray[this.state.idQuestion].question,
        options: this.state.newArray[this.state.idQuestion].options
      })
    }
  }

  render () {
    return (
      <div>
        <h2>Pseudo: {this.props.userData.pseudo}</h2>
        <Levels /> 
        <ProgressBar />
        <Questions question={this.state.question} options={this.state.options}/>
      </div>
    )
  }
}

export default Quiz;