interface CourseCardProps {
  title: string;
  description: string;
  imageSrc: string;
  color?: string;
  onClick?: () => void;
}

const CourseCard = ({ title, description, imageSrc, onClick }: CourseCardProps) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm border border-gray-200 dark:border-zinc-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <img 
        alt={`${title} course icon`} 
        className="w-24 h-24 mb-4 object-contain" 
        src={imageSrc} 
      />
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed">{description}</p>
      <button 
        onClick={onClick}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-colors"
      >
        Start Learning
      </button>
    </div>
  );
};

export default CourseCard;

