import React, { useState } from 'react';
import { AlertTriangle, Phone, MapPin, Navigation, Clock, User, Heart, Shield, Thermometer, Ban as Bandage, Zap, Eye, Droplet, Wind, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface FirstAidGuide {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  steps: string[];
  warning?: string;
}

const EmergencyPage: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<FirstAidGuide | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const { user, isAuthenticated } = useAuth();

  const emergencyNumbers = [
    { service: 'Emergency Services', number: '112', description: 'All emergency services' },
    { service: 'Ambulance', number: '108', description: 'Medical emergency' },
    { service: 'Fire Department', number: '101', description: 'Fire emergency' },
    { service: 'Police', number: '100', description: 'Police emergency' },
    { service: 'Disaster Management', number: '1078', description: 'Natural disasters' }
  ];

  const firstAidGuides: FirstAidGuide[] = [
    {
      id: 'cpr',
      title: 'CPR (Cardiopulmonary Resuscitation)',
      icon: Heart,
      color: 'text-red-600',
      steps: [
        'Check for responsiveness - tap shoulders and shout "Are you OK?"',
        'Call emergency services (112/108) immediately',
        'Position person on firm surface, tilt head back, lift chin',
        'Place heel of one hand on center of chest, other hand on top',
        'Push hard and fast at least 2 inches deep, 100-120 compressions per minute',
        'Give 30 chest compressions, then 2 rescue breaths',
        'Continue cycles until emergency services arrive'
      ],
      warning: 'Only perform CPR if person is unconscious and not breathing normally'
    },
    {
      id: 'choking',
      title: 'Choking',
      icon: Wind,
      color: 'text-orange-600',
      steps: [
        'Ask "Are you choking?" If they can speak/cough, encourage coughing',
        'If they cannot speak/breathe, call emergency services',
        'Stand behind person, wrap arms around waist',
        'Make fist with one hand, place above navel below ribcage',
        'Grasp fist with other hand, give quick upward thrusts',
        'Continue until object is expelled or person becomes unconscious',
        'If unconscious, begin CPR'
      ],
      warning: 'Do not hit person on back as it may push object deeper'
    },
    {
      id: 'bleeding',
      title: 'Severe Bleeding',
      icon: Droplet,
      color: 'text-red-500',
      steps: [
        'Apply direct pressure to wound with clean cloth or bandage',
        'If bleeding soaks through, add more bandages on top',
        'Elevate injured area above heart level if possible',
        'Call emergency services if bleeding is severe',
        'Do not remove embedded objects',
        'Watch for signs of shock - pale skin, rapid pulse, weakness',
        'Keep person warm and lying down'
      ],
      warning: 'Never remove bandages once applied, even if soaked with blood'
    },
    {
      id: 'burns',
      title: 'Burns',
      icon: Thermometer,
      color: 'text-yellow-600',
      steps: [
        'Remove person from heat source if safe to do so',
        'Remove jewelry/clothing from burned area before swelling',
        'Cool burn with cool (not cold) running water for 10-20 minutes',
        'Cover burn with sterile, non-stick bandage',
        'Do not use ice, butter, or ointments',
        'Give over-the-counter pain medication if needed',
        'Seek medical attention for severe burns'
      ],
      warning: 'For electrical burns, ensure power source is turned off before touching person'
    },
    {
      id: 'fracture',
      title: 'Fractures',
      icon: Bandage,
      color: 'text-blue-600',
      steps: [
        'Do not move person unless absolutely necessary',
        'Immobilize injured area using splint or sling',
        'Apply ice wrapped in cloth to reduce swelling',
        'Check circulation below injury site',
        'Monitor for signs of shock',
        'Call emergency services for severe fractures',
        'Do not try to realign broken bones'
      ],
      warning: 'Suspect spinal injury if head/neck trauma - do not move person'
    },
    {
      id: 'seizure',
      title: 'Seizures',
      icon: Zap,
      color: 'text-purple-600',
      steps: [
        'Stay calm and stay with the person',
        'Clear area of dangerous objects',
        'Place person on side in recovery position',
        'Put something soft under head',
        'Loosen tight clothing around neck',
        'Time the seizure - call emergency if over 5 minutes',
        'Do not put anything in mouth or restrain person'
      ],
      warning: 'Call 112 if seizure lasts >5 minutes or person has difficulty breathing'
    },
    {
      id: 'stroke',
      title: 'Stroke (FAST)',
      icon: Activity,
      color: 'text-red-700',
      steps: [
        'F - Face: Ask person to smile, check if face droops',
        'A - Arms: Ask to raise both arms, check if one arm drifts down',
        'S - Speech: Ask to repeat simple phrase, check for slurred speech',
        'T - Time: Note time of symptom onset, call emergency immediately',
        'Keep person comfortable and monitor breathing',
        'Do not give food, water, or medication',
        'Note all symptoms and time they started'
      ],
      warning: 'Time is critical - call 112 immediately if any FAST signs present'
    },
    {
      id: 'allergic',
      title: 'Allergic Reactions',
      icon: Eye,
      color: 'text-green-600',
      steps: [
        'Remove or avoid allergen if known',
        'For mild reactions: antihistamine, cool compress',
        'For severe reactions (anaphylaxis): call emergency immediately',
        'Use epinephrine auto-injector if available',
        'Keep person lying down with legs elevated',
        'Loosen tight clothing',
        'Monitor breathing and pulse'
      ],
      warning: 'Anaphylaxis is life-threatening - call 112 for severe reactions'
    }
  ];

  const findNearbyHospitals = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          // Open Google Maps with nearby hospitals
          const url = `https://www.google.com/maps/search/hospitals+near+me/@${latitude},${longitude},15z`;
          window.open(url, '_blank');
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to general hospital search
          window.open('https://www.google.com/maps/search/hospitals+near+me', '_blank');
        }
      );
    } else {
      // Browser doesn't support geolocation
      window.open('https://www.google.com/maps/search/hospitals+near+me', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Emergency Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Emergency Support</h1>
              <p className="text-red-100">Immediate help when you need it most</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Emergency Call */}
          <div className="bg-red-600 text-white rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Phone className="h-6 w-6 mr-2" />
              Emergency Numbers
            </h2>
            <div className="space-y-3">
              {emergencyNumbers.map((emergency, index) => (
                <div key={index} className="flex items-center justify-between bg-red-500 bg-opacity-50 rounded-lg p-3">
                  <div>
                    <div className="font-semibold">{emergency.service}</div>
                    <div className="text-sm text-red-100">{emergency.description}</div>
                  </div>
                  <a
                    href={`tel:${emergency.number}`}
                    className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors"
                  >
                    {emergency.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Hospital Locator */}
          <div className="bg-blue-600 text-white rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <MapPin className="h-6 w-6 mr-2" />
              Find Nearby Hospitals
            </h2>
            <p className="text-blue-100 mb-6">
              Locate the nearest hospitals and get directions immediately
            </p>
            <button
              onClick={findNearbyHospitals}
              className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Navigation className="h-5 w-5" />
              <span>Find & Navigate to Hospitals</span>
            </button>
          </div>
        </div>

        {/* User Medical Information (Only if authenticated) */}
        {isAuthenticated && user && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <User className="h-6 w-6 mr-2" />
              Your Medical Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Name</div>
                <div className="font-semibold">{user.name}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Age</div>
                <div className="font-semibold">{user.age} years</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Blood Group</div>
                <div className="font-semibold">{user.bloodGroup}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Emergency Contact</div>
                <div className="font-semibold">{user.emergencyContact.name}</div>
                <div className="text-sm text-gray-600">{user.emergencyContact.phone}</div>
              </div>
            </div>
            {user.medicalHistory.length > 0 && (
              <div className="mt-4">
                <div className="text-sm text-gray-600 mb-2">Medical History</div>
                <div className="flex flex-wrap gap-2">
                  {user.medicalHistory.map((condition, index) => (
                    <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* First Aid Guide */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="h-6 w-6 mr-2" />
            First Aid Quick Reference
          </h2>

          {!selectedGuide ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {firstAidGuides.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuide(guide)}
                  className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <guide.icon className={`h-8 w-8 ${guide.color} mb-3`} />
                  <h3 className="font-semibold text-gray-900">{guide.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Click for step-by-step guide</p>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <selectedGuide.icon className={`h-8 w-8 ${selectedGuide.color}`} />
                  <h3 className="text-2xl font-bold text-gray-900">{selectedGuide.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg"
                >
                  ← Back to All Guides
                </button>
              </div>

              {selectedGuide.warning && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> {selectedGuide.warning}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {selectedGuide.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-800 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Remember:</strong> These are basic first aid guidelines. Always call emergency services (112/108) 
                  for serious injuries or if you're unsure about the severity of the situation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
