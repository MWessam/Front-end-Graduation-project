import React, { useState, useEffect } from 'react';
import { getQuestionRenderer } from '../exercises/renderers';
import { fetchQuestionsForLesson } from '../exercises/api/mockQuestions';
import { InteractionMode } from '../exercises/types';

// Simple cache to avoid re-fetching
const questionCache = {};

const ExerciseWrapper = ({ Renderer, question }) => {
  const [value, setValue] = useState(null);
  const interactionMode = question.questionBody?.interactionMode || InteractionMode.DISPLAY_SELECT;

  return (
    <Renderer
      questionType={question.questionType}
      interactionMode={interactionMode}
      questionBody={question.questionBody}
      value={value}
      onChange={setValue}
      disabled={false}
    />
  );
};

export const ExerciseBlockComponent = (props) => {
  // props.block is passed by BlockNote
  const { block } = props;
  const questionId = block.props.questionId;
  
  const [question, setQuestion] = useState(questionCache[questionId] || null);
  const [loading, setLoading] = useState(!question);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (question) return;

    const load = async () => {
      try {
        // Fetch from Lesson 1 as per requirement
        const questions = await fetchQuestionsForLesson('1');
        const q = questions.find(q => q.questionId === questionId);
        
        if (q) {
          questionCache[questionId] = q;
          setQuestion(q);
        } else {
            // Fallback: Check if we can find it in a global list or other lessons
            // For this demo, if not found in lesson 1, we error out
            setError(`Question ${questionId} not found in Lesson 1`);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [questionId, question]);

  if (loading) return <div className="p-4 border rounded bg-gray-50 text-sm text-gray-500">Loading exercise {questionId}...</div>;
  if (error) return <div className="p-4 border rounded bg-red-50 text-red-500 text-sm">Error: {error}</div>;
  if (!question) return null;

  const Renderer = getQuestionRenderer(question.questionType);

  return (
    <div className="my-6 p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow exercise-block-wrapper">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-primary">quiz</span>
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white m-0">{question.questionHead}</h3>
      </div>
      
      {question.questionBody?.context && (
        <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">{question.questionBody.context}</p>
      )}
      
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-100 dark:border-gray-800">
        {Renderer ? (
          <ExerciseWrapper Renderer={Renderer} question={question} />
        ) : (
          <div className="text-red-500">No renderer available for {question.questionType}</div>
        )}
      </div>
    </div>
  );
};

export default ExerciseBlockComponent;
