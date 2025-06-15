import React, { useState } from 'react';
import { Pill, Plus, Clock, Calendar, Award, Flame, Target, CheckCircle, AlertTriangle, Bell } from 'lucide-react';


interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  instructions: string;
  taken: boolean[];
  streak: number;
}

const MedicationsPage: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      times: ['9:00 AM'],
      startDate: '2024-01-01',
      endDate: '2024-03-01',
      instructions: 'Take with breakfast',
      taken: [true, true, false, true, true, true, true],
      streak: 5
    },
    {
      id: '2',
      name: 'Calcium Carbonate',
      dosage: '500mg',
      frequency: 'Twice daily',
      times: ['9:00 AM', '9:00 PM'],
      startDate: '2024-01-01',
      instructions: 'Take with meals',
      taken: [true, false, true, true, true, true, false],
      streak: 3
    },
    {
      id: '3',
      name: 'Omega-3',
      dosage: '1000mg',
      frequency: 'Once daily',
      times: ['8:00 PM'],
      startDate: '2024-01-01',
      instructions: 'Take with dinner',
      taken: [true, true, true, true, true, true, true],
      streak: 7
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    times: [''],
    startDate: '',
    endDate: '',
    instructions: ''
  });

  const totalMedications = medications.length;
  const takenToday = medications.filter(med => med.taken[med.taken.length - 1]).length;
  const adherenceRate = Math.round((takenToday / totalMedications) * 100);
  const longestStreak = Math.max(...medications.map(med => med.streak));

  const markAsTaken = (medicationId: string) => {
    setMedications(prev => prev.map(med => {
      if (med.id === medicationId) {
        const newTaken = [...med.taken];
        newTaken[newTaken.length - 1] = true;
        return {
          ...med,
          taken: newTaken,
          streak: med.streak + 1
        };
      }
      return med;
    }));
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 7) return 'text-green-600';
    if (streak >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStreakBadge = (streak: number) => {
    if (streak >= 30) return { icon: Award, text: 'Champion', color: 'bg-purple-100 text-purple-800' };
    if (streak >= 14) return { icon: Flame, text: 'On Fire', color: 'bg-orange-100 text-orange-800' };
    if (streak >= 7) return { icon: Target, text: 'Consistent', color: 'bg-green-100 text-green-800' };
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Medication Tracker</h1>
            <p className="text-gray-600">Stay on track with your medications and build healthy habits</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Medication</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Pill className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">{totalMedications}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Medications</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{takenToday}/{totalMedications}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Taken Today</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">{adherenceRate}%</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Adherence Rate</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-orange-600">{longestStreak}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Longest Streak</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Medications List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Medications</h2>
              
              <div className="space-y-4">
                {medications.map((medication) => {
                  const badge = getStreakBadge(medication.streak);
                  const isTakenToday = medication.taken[medication.taken.length - 1];
                  
                  return (
                    <div
                      key={medication.id}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        isTakenToday 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-white hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{medication.name}</h3>
                            {badge && (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color} flex items-center space-x-1`}>
                                <badge.icon className="h-3 w-3" />
                                <span>{badge.text}</span>
                              </span>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                            <div>
                              <span className="font-medium">Dosage:</span> {medication.dosage}
                            </div>
                            <div>
                              <span className="font-medium">Frequency:</span> {medication.frequency}
                            </div>
                            <div>
                              <span className="font-medium">Times:</span> {medication.times.join(', ')}
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="font-medium">Streak:</span>
                              <span className={`font-bold ${getStreakColor(medication.streak)}`}>
                                {medication.streak} days
                              </span>
                              <Flame className={`h-4 w-4 ${getStreakColor(medication.streak)}`} />
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-4">{medication.instructions}</p>
                          
                          {/* Weekly Progress */}
                          <div className="flex items-center space-x-2 mb-4">
                            <span className="text-sm font-medium text-gray-700">This week:</span>
                            {medication.taken.map((taken, index) => (
                              <div
                                key={index}
                                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  taken ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                              >
                                {taken && <CheckCircle className="h-4 w-4 text-white" />}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="ml-4">
                          {!isTakenToday ? (
                            <button
                              onClick={() => markAsTaken(medication.id)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Mark Taken</span>
                            </button>
                          ) : (
                            <div className="flex items-center space-x-2 text-green-600">
                              <CheckCircle className="h-5 w-5" />
                              <span className="font-medium">Completed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Achievements</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-900">7-Day Streak</p>
                    <p className="text-sm text-purple-700">Unlocked!</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <Flame className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-900">Perfect Week</p>
                    <p className="text-sm text-orange-700">100% adherence for 7 days</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg opacity-60">
                  <Target className="h-6 w-6 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">30-Day Champion</p>
                    <p className="text-sm text-gray-700">23 days to go</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Reminders */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Reminders</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Bell className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-900">Calcium Carbonate</p>
                    <p className="text-sm text-yellow-700">Due at 9:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Omega-3</p>
                    <p className="text-sm text-blue-700">Due at 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">This Month</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Days with 100% adherence</span>
                  <span className="font-bold text-green-600">23/30</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Missed doses</span>
                  <span className="font-bold text-red-600">3</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average adherence</span>
                  <span className="font-bold text-blue-600">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Medication Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Medication</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medication Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter medication name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 500mg, 1 tablet"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Once daily</option>
                    <option>Twice daily</option>
                    <option>Three times daily</option>
                    <option>As needed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Special instructions..."
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Medication
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationsPage;
