import React, { useState, useMemo } from 'react';
import { getQuestionRenderer } from '../../exercises/renderers';
import { getValidator } from '../../exercises/validators';
import { parseEmbeddedQuestion } from '../../exercises/embeddedQuestion';

export default function LessonEmbeddedQuestion({ rawJson }) {
  const embedded = useMemo(() => parseEmbeddedQuestion(rawJson), [rawJson]);
  const Renderer = getQuestionRenderer(embedded.questionType);
  const [value, setValue] = useState({});
  const [feedback, setFeedback] = useState(null);

  const handleCheck = () => {
    const validate = getValidator(embedded.answerValidationType);
    try {
      setFeedback(validate(value ?? {}, embedded.expectedAnswer ?? {}));
    } catch (e) {
      setFeedback({ correct: false, feedback: e?.message ?? 'Invalid answer shape' });
    }
  };

  const feedbackCls = feedback?.correct
    ? 'border border-emerald-200 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/25 dark:border-emerald-800 dark:text-emerald-100'
    : feedback
      ? 'border border-rose-200 bg-rose-50 text-rose-900 dark:bg-rose-900/25 dark:border-rose-800 dark:text-rose-100'
      : '';

  return (
    <div className="mb-10 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 sm:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {embedded.questionHead || 'Question'}
      </h3>
      <div className="w-full text-gray-800 dark:text-gray-200">
        {Renderer ? (
          <Renderer
            questionType={embedded.questionType}
            interactionMode={embedded.questionBody.interactionMode}
            questionBody={embedded.questionBody}
            value={value}
            onChange={(next) => {
              setValue((prev) => ({ ...prev, ...next }));
              setFeedback(null);
            }}
            disabled={false}
          />
        ) : (
          <p className="text-rose-600 dark:text-rose-400 text-sm">
            Cannot display question type “{embedded.questionType}”.
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCheck}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 transition-colors shadow-sm"
        >
          Check answer
        </button>
        <button
          type="button"
          onClick={() => {
            setValue({});
            setFeedback(null);
          }}
          className="rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Reset attempt
        </button>
      </div>
      {feedback && (
        <div role="status" className={`mt-4 rounded-xl px-4 py-3 text-sm ${feedbackCls}`}>
          {feedback.feedback ?? (feedback.correct ? 'Correct!' : 'Not quite — try again.')}
        </div>
      )}
    </div>
  );
}
