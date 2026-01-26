import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  ChevronDown, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Eye, 
  Edit, 
  Trash2, 
  GripVertical,
  CheckCircle
} from 'lucide-react';
import Card from '../components/Card';
import { cn } from '../lib/utils';
import { studentAssignments, completedAssignments as mockCompletedAssignments } from '../data/mock';
import type { Assignment } from '../data/types';

const Assignments = () => {
  const [currentAssignments, setCurrentAssignments] = useState<Assignment[]>(studentAssignments);
  const [completedAssignments, setCompletedAssignments] = useState<Assignment[]>(mockCompletedAssignments);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDelete = (id: number, isCompleted: boolean) => {
    if (isCompleted) {
      setCompletedAssignments(prev => prev.filter(a => a.id !== id));
    } else {
      setCurrentAssignments(prev => prev.filter(a => a.id !== id));
    }
    showToast('Task deleted successfully!');
  };

  const AssignmentRow = ({ item, isCompleted }: { item: Assignment; isCompleted: boolean }) => (
    <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <GripVertical className="text-gray-400 dark:text-gray-500 cursor-grab" size={24} />
      <span className="font-medium text-green-600 dark:text-green-500">{item.title}</span>
      <div>
        <p className="font-semibold text-gray-700 dark:text-gray-300">{item.subject}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{item.lesson}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/50 px-3 py-1 rounded-full w-fit">
        <Calendar size={16} />
        {item.date}
      </div>
      <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
        <button className="hover:text-gray-700 dark:hover:text-gray-200"><Eye size={20} /></button>
        <button onClick={() => showToast('Task edited successfully!')} className="hover:text-blue-600 dark:hover:text-blue-400"><Edit size={20} /></button>
        <button onClick={() => handleDelete(item.id, isCompleted)} className="hover:text-red-600 dark:hover:text-red-400"><Trash2 size={20} /></button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      <div className={cn(
        "fixed top-24 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-50 flex items-center gap-2",
        toastMessage ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <CheckCircle size={20} />
        <span>{toastMessage}</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-500">My Assignments</h1>
      </div>

      <Card className="border-0 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-1 h-8 bg-green-600 mr-3"></div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Assignments</h2>
          </div>
          <Link to="/quiz" className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-600 hover:text-white transition-colors">
            <Plus size={20} />
            Quiz
          </Link>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <ChevronDown className="text-gray-600 dark:text-gray-400" />
            <h3 className="font-semibold text-gray-800 dark:text-white">Current Assignments ({currentAssignments.length})</h3>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-700">
            {currentAssignments.length > 0 ? (
              currentAssignments.map(item => (
                <AssignmentRow key={item.id} item={item} isCompleted={false} />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No current assignments
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="border-0 shadow-sm">
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-4">
            <ChevronDown className="text-gray-600 dark:text-gray-400" />
            <h3 className="font-semibold text-gray-800 dark:text-white">Completed Assignments ({completedAssignments.length})</h3>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-gray-700">
            {completedAssignments.length > 0 ? (
              completedAssignments.map(item => (
                <AssignmentRow key={item.id} item={item} isCompleted={true} />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No completed assignments
              </div>
            )}
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center mt-8">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-zinc-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors">
          <ArrowLeft size={20} />
          Back
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-zinc-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors">
          Next
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Assignments;
