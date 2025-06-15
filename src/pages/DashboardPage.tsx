import React, { useState } from 'react';
import { Calendar, Activity, Heart, Pill, AlertTriangle, TrendingUp, Clock, User, Phone, Mail, Edit, Save, X, Scale, Ruler, Thermometer, Droplets } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const DashboardPage: React.FC = () => {
  const { user, updateHealthMetrics, updateUser } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [healthData, setHealthData] = useState({
    weight: user?.healthMetrics?.weight || '',
    height: user?.healthMetrics?.height || '',
    systolicBP: user?.healthMetrics?.systolicBP || '',
    diastolicBP: user?.healthMetrics?.diastolicBP || '',
    heartRate: user?.healthMetrics?.heartRate || '',
    temperature: user?.healthMetrics?.temperature || '',
    oxygenSaturation: user?.healthMetrics?.oxygenSaturation || ''
  });

  const calculateBMI = (weight: number, height: number): number => {
    if (!weight || !height) return 0;
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
  };

  const getBMIStatus = (bmi: number): { status: string; color: string } => {
    if (bmi < 18.5) return { status: t('underweight'), color: 'text-blue-600' };
    if (bmi < 25) return { status: t('normal_weight'), color: 'text-green-600' };
    if (bmi < 30) return { status: t('overweight'), color: 'text-yellow-600' };
    return { status: t('obese'), color: 'text-red-600' };
  };

  const getBloodPressureStatus = (systolic: number, diastolic: number): { status: string; color: string } => {
    if (systolic < 120 && diastolic < 80) return { status: t('normal'), color: 'text-green-600' };
    if (systolic < 140 && diastolic < 90) return { status: 'Pre-hypertension', color: 'text-yellow-600' };
    return { status: t('high'), color: 'text-red-600' };
  };

  const getHeartRateStatus = (hr: number): { status: string; color: string } => {
    if (hr >= 60 && hr <= 100) return { status: t('normal'), color: 'text-green-600' };
    if (hr < 60) return { status: t('low'), color: 'text-blue-600' };
    return { status: t('high'), color: 'text-red-600' };
  };

  const handleSaveHealthData = () => {
    const metrics = {
      weight: Number(healthData.weight) || undefined,
      height: Number(healthData.height) || undefined,
      systolicBP: Number(healthData.systolicBP) || undefined,
      diastolicBP: Number(healthData.diastolicBP) || undefined,
      heartRate: Number(healthData.heartRate) || undefined,
      temperature: Number(healthData.temperature) || undefined,
      oxygenSaturation: Number(healthData.oxygenSaturation) || undefined
    };

    updateHealthMetrics(metrics);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setHealthData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('access_denied')}</h2>
          <p className="text-gray-600">{t('login_required')}</p>
        </div>
      </div>
    );
  }

  // Show welcome form for new users
  if (!user.isProfileComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('welcome_new_user')}</h1>
              <p className="text-gray-600">{t('complete_profile')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('weight_kg')}</label>
                <input
                  type="number"
                  value={healthData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="70"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('height_cm')}</label>
                <input
                  type="number"
                  value={healthData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="170"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('systolic_bp')}</label>
                <input
                  type="number"
                  value={healthData.systolicBP}
                  onChange={(e) => handleInputChange('systolicBP', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('diastolic_bp')}</label>
                <input
                  type="number"
                  value={healthData.diastolicBP}
                  onChange={(e) => handleInputChange('diastolicBP', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('heart_rate_bpm')}</label>
                <input
                  type="number"
                  value={healthData.heartRate}
                  onChange={(e) => handleInputChange('heartRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="72"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('temperature_f')}</label>
                <input
                  type="number"
                  step="0.1"
                  value={healthData.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="98.6"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('oxygen_percent')}</label>
                <input
                  type="number"
                  value={healthData.oxygenSaturation}
                  onChange={(e) => handleInputChange('oxygenSaturation', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="98"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleSaveHealthData}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {t('save_changes')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const bmi = calculateBMI(user.healthMetrics?.weight || 0, user.healthMetrics?.height || 0);
  const bmiStatus = getBMIStatus(bmi);
  const bpStatus = getBloodPressureStatus(user.healthMetrics?.systolicBP || 0, user.healthMetrics?.diastolicBP || 0);
  const hrStatus = getHeartRateStatus(user.healthMetrics?.heartRate || 0);

  const healthMetrics = [
    { 
      id: 'bmi', 
      name: t('bmi'), 
      value: bmi > 0 ? bmi.toString() : '--', 
      status: bmi > 0 ? bmiStatus.status : '--', 
      icon: Scale, 
      color: bmi > 0 ? bmiStatus.color : 'text-gray-600', 
      bgColor: 'bg-blue-50' 
    },
    { 
      id: 'weight', 
      name: t('weight'), 
      value: user.healthMetrics?.weight ? `${user.healthMetrics.weight} ${t('kg')}` : '--', 
      status: user.healthMetrics?.weight ? t('normal') : '--', 
      icon: Scale, 
      color: 'text-green-600', 
      bgColor: 'bg-green-50' 
    },
    { 
      id: 'bloodPressure', 
      name: t('blood_pressure'), 
      value: user.healthMetrics?.systolicBP && user.healthMetrics?.diastolicBP 
        ? `${user.healthMetrics.systolicBP}/${user.healthMetrics.diastolicBP} ${t('mmhg')}` 
        : '--', 
      status: user.healthMetrics?.systolicBP && user.healthMetrics?.diastolicBP ? bpStatus.status : '--', 
      icon: Heart, 
      color: user.healthMetrics?.systolicBP && user.healthMetrics?.diastolicBP ? bpStatus.color : 'text-gray-600', 
      bgColor: 'bg-red-50' 
    },
    { 
      id: 'heartRate', 
      name: t('heart_rate'), 
      value: user.healthMetrics?.heartRate ? `${user.healthMetrics.heartRate} ${t('bpm')}` : '--', 
      status: user.healthMetrics?.heartRate ? hrStatus.status : '--', 
      icon: Activity, 
      color: user.healthMetrics?.heartRate ? hrStatus.color : 'text-gray-600', 
      bgColor: 'bg-purple-50' 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('welcome_back')}, {user.name}!</h1>
          <p className="text-gray-600">{t('health_overview')}</p>
        </div>

        {/* Health Metrics */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('health_metrics')}</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>{t('edit_profile')}</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>{t('cancel')}</span>
                </button>
                <button
                  onClick={handleSaveHealthData}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>{t('save')}</span>
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('weight_kg')}</label>
                <input
                  type="number"
                  value={healthData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('height_cm')}</label>
                <input
                  type="number"
                  value={healthData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('systolic_bp')}</label>
                <input
                  type="number"
                  value={healthData.systolicBP}
                  onChange={(e) => handleInputChange('systolicBP', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('diastolic_bp')}</label>
                <input
                  type="number"
                  value={healthData.diastolicBP}
                  onChange={(e) => handleInputChange('diastolicBP', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('heart_rate_bpm')}</label>
                <input
                  type="number"
                  value={healthData.heartRate}
                  onChange={(e) => handleInputChange('heartRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('temperature_f')}</label>
                <input
                  type="number"
                  step="0.1"
                  value={healthData.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthMetrics.map((metric) => (
                <div key={metric.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${metric.bgColor} rounded-full`}>
                      <metric.icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.name}</h3>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-sm mt-1 ${metric.color}`}>{metric.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Health Insights */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t('health_trends')}</h2>
              <div className="space-y-4">
                {bmi > 0 && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">{t('bmi')} Analysis</h3>
                    <p className="text-sm text-blue-800">
                      Your BMI is {bmi}, which is classified as {bmiStatus.status.toLowerCase()}. 
                      {bmi < 18.5 && " Consider consulting a nutritionist for healthy weight gain strategies."}
                      {bmi >= 18.5 && bmi < 25 && " Great job maintaining a healthy weight!"}
                      {bmi >= 25 && bmi < 30 && " Consider incorporating more physical activity and a balanced diet."}
                      {bmi >= 30 && " We recommend consulting with a healthcare provider for a personalized weight management plan."}
                    </p>
                  </div>
                )}
                
                {user.healthMetrics?.systolicBP && user.healthMetrics?.diastolicBP && (
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h3 className="font-medium text-red-900 mb-2">{t('blood_pressure')} Analysis</h3>
                    <p className="text-sm text-red-800">
                      Your blood pressure is {user.healthMetrics.systolicBP}/{user.healthMetrics.diastolicBP} mmHg, 
                      which is {bpStatus.status.toLowerCase()}.
                      {bpStatus.status === t('normal') && " Keep up the good work with your healthy lifestyle!"}
                      {bpStatus.status !== t('normal') && " Consider monitoring your blood pressure regularly and consult with a healthcare provider."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t('recent_activities')}</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Activity className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">Health metrics updated</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {user.healthMetrics?.lastUpdated ? new Date(user.healthMetrics.lastUpdated).toLocaleDateString() : 'Today'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t('profile_summary')}</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">{t('full_name')}</p>
                    <p className="font-medium text-gray-900">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">{t('age')}</p>
                    <p className="font-medium text-gray-900">{user.age} {t('years')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Droplets className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">{t('blood_group')}</p>
                    <p className="font-medium text-gray-900">{user.bloodGroup}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">{t('phone_number')}</p>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">{t('email_address')}</p>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t('quick_actions')}</h2>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Pill className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Log Medication</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-900">Record Vitals</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-900">{t('book_appointment')}</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Report Symptoms</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
