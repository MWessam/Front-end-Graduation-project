import { useState } from 'react';

// Mock student data hook - will be replaced with API call
export const useStudentData = () => {
  const [studentData] = useState({
    name: 'Ahmed Emad',
    grade: 'Grade 10',
    xp: 2840,
    level: 5,
    streak: 7
  });

  return studentData;
};
