import './App.css';
import React, { useState } from 'react';
import { Difficulty, fetchQuizQuestions, QuestionState } from './API';
import QuestionCard from './Components/QuestionCard';
const TOTAL_QUESTIONS = 10;

export type answerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
};

const App = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<answerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);
        setScore(0);
        const newQuestions = await fetchQuizQuestions(
            TOTAL_QUESTIONS,
            Difficulty.EASY
        );
        setQuestions(newQuestions);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    };
    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            const answer = e.currentTarget.value;
            //correct
            const correct = questions[number].correct_answer === answer;
            //score
            if (correct) {
                setScore((prev) => prev + 1);
            }
            //save answer
            const answerObject: answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            };
            setUserAnswers((prev) => [...prev, answerObject]);
        }
    };
    const nextQuestion = () => {
        const nextQuestion = number + 1;
        if (nextQuestion === TOTAL_QUESTIONS) {
            setGameOver(true);
        } else {
            setNumber(nextQuestion);
        }
    };
    return (
        <div className="wrapper">
            <h1>REACT QUIZ</h1>
            {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
                <button className="start" onClick={startTrivia}>
                    Start
                </button>
            )}
            {!gameOver && <p className="score">Score: {score}</p>}
            {loading && <p>Loading...</p>}
            {!loading && !gameOver && (
                <QuestionCard
                    questionNr={number + 1}
                    totalQuestions={TOTAL_QUESTIONS}
                    question={questions[number].question}
                    answers={questions[number].answers}
                    userAnswer={userAnswers ? userAnswers[number] : undefined}
                    callback={checkAnswer}
                />
            )}
            {!gameOver &&
            !loading &&
            userAnswers.length === number + 1 &&
            number !== TOTAL_QUESTIONS - 1 ? (
                <button className="next" onClick={nextQuestion}>
                    Next Question
                </button>
            ) : null}
        </div>
    );
};

export default App;
