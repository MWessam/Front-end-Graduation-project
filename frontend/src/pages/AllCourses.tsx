import React from 'react';
import CourseCard from '../components/CourseCard';

const AllCourses = () => {
  const courses = [
    {
      title: 'Programming',
      description: 'Learn coding languages and software development',
      imageSrc: '/images/software 1.png',
    },
    {
      title: 'English',
      description: 'Master the English language and communication',
      imageSrc: '/images/softwakre 1.png',
    },
    {
      title: 'Math',
      description: 'Explore mathematics and problem solving',
      imageSrc: '/images/softwdare 1.png',
    },
    {
      title: 'Arabic',
      description: 'Learn Arabic language and literature',
      imageSrc: '/images/v2.png',
    },
    {
      title: 'Science',
      description: 'Discover scientific principles and experiments',
      imageSrc: '/images/science1.png',
    },
    {
      title: 'Physics',
      description: 'Understand the laws of the physical world',
      imageSrc: '/images/physics1.png',
    },
    {
      title: 'French',
      description: 'Learn French language and culture',
      imageSrc: '/images/french1.png',
    },
    {
      title: 'Spanish',
      description: 'Master Spanish speaking and writing',
      imageSrc: '/images/physics1.png', // Reusing physics icon as placeholder or matching source
    },
    {
      title: 'Italian',
      description: 'Explore Italian language and heritage',
      imageSrc: '/images/spain1.png',
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Courses for all speakers</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard
            key={course.title}
            title={course.title}
            description={course.description}
            imageSrc={course.imageSrc}
            onClick={() => console.log(`Clicked ${course.title}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCourses;

