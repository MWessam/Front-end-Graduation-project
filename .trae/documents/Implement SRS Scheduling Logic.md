# Implement SRS Scheduling with Restricted Navigation

I will implement the Spaced Repetition System (SRS) logic with specific navigation constraints for the review and exercise sessions. The session will prioritize due reviews, followed by new items, and will restrict users to focusing on one question at a time.

## **Data Structure & Logic**
1. **Submission State**: Add `UserQuestionSubmission` to [types.js](file:///c:/Users/Medow/Downloads/Front-end-Graduation-project/Front-end-Graduation-project/Eureka/src/exercises/types.js) and implement `MOCK_SUBMISSIONS` in [mockQuestions.js](file:///c:/Users/Medow/Downloads/Front-end-Graduation-project/Front-end-Graduation-project/Eureka/src/exercises/api/mockQuestions.js).
2. **Scheduling Formula**:
    - **New Question**: Correct -> 24h, Incorrect -> 30s.
    - **Review Item**: Correct -> `interval * 4`, Incorrect -> `interval / 4` (min 30s).
3. **Queue Construction**:
    - The queue will consist of **Due Reviews** (where `nextReviewTime <= now`, sorted by EDF) followed by **New Questions** (no submission).
    - If no due reviews and no new questions are available (i.e., everything is scheduled for the future), the session will transition to a completion state.

## **UI & Navigation Constraints**
1. **Single Question Focus**: In [Exercises.jsx](file:///c:/Users/Medow/Downloads/Front-end-Graduation-project/Front-end-Graduation-project/Eureka/src/pages/Exercises.jsx):
    - Remove/Hide the **Previous** and **Next** navigation buttons.
    - Hide the **Step Dots** from the header.
    - The user can only interact with the current question.
2. **Flow Control**:
    - After clicking **Check** and receiving feedback, a **Continue** button will appear to move to the next question in the scheduled queue.
    - Once the queue is exhausted, show a "Congratulations! You've reached the end of your reviews" message.
3. **Next Review Display**: Show "Next review in X [time unit]" in the feedback section after an answer is submitted.

## **Implementation Steps**
- Update `mockQuestions.js` to handle the new scheduling logic and filter the returned lists.
- Update `Exercises.jsx` to handle the restricted navigation UI and the new "Congratulations" end state.
- Implement a `formatInterval` utility to show human-readable "Next review in..." strings.

Would you like me to proceed with this updated plan?
