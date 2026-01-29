import { useState } from 'react';
import { Camera, Mail, User, Phone, MapPin, Save } from 'lucide-react';
import Card from '../components/Card';
import { currentStudent, getFullName } from '../data/mock';

const Profile = () => {
  // Get user data from mock
  const user = currentStudent;
  
  // Local state for form (initialized from mock data)
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || '',
    location: user.location || '',
  });

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    // In a real app, this would save to API
    console.log('Saving profile:', formData);
    alert('Profile saved successfully!');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Avatar */}
        <div className="lg:col-span-1">
          <Card className="flex flex-col items-center text-center">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden border-4 border-white dark:border-zinc-800 shadow-lg">
                <img 
                  src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`}
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={24} />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{getFullName(user)}</h2>
            <p className="text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
          </Card>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Personal Information</h3>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={handleChange('firstName')}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={handleChange('lastName')}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange('email')}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={handleChange('phone')}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={handleChange('location')}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md"
                >
                  <Save size={20} />
                  Save Changes
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
