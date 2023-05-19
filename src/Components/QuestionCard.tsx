import React, { FC } from 'react';
import { answerObject } from '../App';
import styled from './QuestionCard.module.css';
type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: answerObject | undefined;
    questionNr: number;
    totalQuestions: number;
};

const QuestionCard: FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions,
}) => {
    console.log(userAnswer);
    return (
        <div className={styled.wrapper}>
            <p className={styled.paragraph}>
                Question: {questionNr} / {totalQuestions}
            </p>
            <p
                className={styled.paragraph}
                dangerouslySetInnerHTML={{ __html: question }}
            />
            <div>
                {answers.map((answer) => (
                    <div key={answer}>
                        <button
                            style={{
                                backgroundColor:
                                    answer === userAnswer?.correctAnswer
                                        ? '#08c434'
                                        : userAnswer?.answer === answer
                                        ? '#e64727'
                                        : '',
                            }}
                            className={styled.button}
                            disabled={!!userAnswer}
                            value={answer}
                            onClick={callback}
                        >
                            <span
                                dangerouslySetInnerHTML={{ __html: answer }}
                            ></span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;
