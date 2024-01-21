import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import '../style.css';

const questions = [
  "Question 1",
  "Question 2",
  "Question 3",
  // ... other questions
];

const Questionnaire = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const nextCardStyles = useSpring({
    opacity: activeQuestionIndex < questions.length - 1 ? 1 : 0,
    transform: `translate3d(${activeQuestionIndex < questions.length - 1 ? 0 : -100}%, 0, 0)`,
  });

  const prevCardStyles = useSpring({
    opacity: activeQuestionIndex > 0 ? 1 : 0,
    transform: `translate3d(${activeQuestionIndex > 0 ? 0 : 100}%, 0, 0)`,
  });

  const handleClickNext = () => {
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleClickPrev = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="questionnaire">
      {activeQuestionIndex > 0 && (
        <animated.div style={prevCardStyles} className="prev-card">
          {questions[activeQuestionIndex - 1]}
        </animated.div>
      )}
      <animated.div className="active-card">
        {questions[activeQuestionIndex]}
      </animated.div>
      {activeQuestionIndex < questions.length - 1 && (
        <animated.div style={nextCardStyles} className="next-card">
          {questions[activeQuestionIndex + 1]}
        </animated.div>
      )}
      <button onClick={handleClickPrev} disabled={activeQuestionIndex === 0}>
        Previous
      </button>
      <button onClick={handleClickNext} disabled={activeQuestionIndex === questions.length - 1}>
        Next
      </button>
    </div>
  );
};

export default Questionnaire;
