import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { courseCatalog } from '../data/mock';

const AllCourses = () => {
  const navigate = useNavigate();

  const handleCourseClick = (courseId: string) => {
    // Navigate to the course lectures page
    navigate(`/lectures`);
    console.log(`Clicked course: ${courseId}`);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Courses for all speakers</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courseCatalog.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            imageSrc={course.imageSrc}
            onClick={() => handleCourseClick(course.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
