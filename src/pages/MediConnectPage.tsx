import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, MessageCircle, User, Stethoscope, Star, CheckCircle, AlertTriangle } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  languages: string[];
  availability: string[];
  consultationFee: number;
  image: string;
}

const MediConnectPage: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentData, setAppointmentData] = useState({
    patientName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    symptoms: '',
    medicalHistory: '',
    urgency: 'normal'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialty: 'General Medicine',
      experience: '12 years',
      rating: 4.8,
      reviews: 245,
      languages: ['English', 'Hindi', 'Gujarati'],
      availability: ['9:00 AM - 1:00 PM', '3:00 PM - 7:00 PM'],
      consultationFee: 500,
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiology',
      experience: '15 years',
      rating: 4.9,
      reviews: 189,
      languages: ['English', 'Hindi', 'Tamil'],
      availability: ['10:00 AM - 2:00 PM', '4:00 PM - 8:00 PM'],
      consultationFee: 800,
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      name: 'Dr. Anita Patel',
      specialty: 'Pediatrics',
      experience: '10 years',
      rating: 4.7,
      reviews: 156,
      languages: ['English', 'Hindi', 'Marathi'],
      availability: ['8:00 AM - 12:00 PM', '2:00 PM - 6:00 PM'],
      consultationFee: 600,
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      name: 'Dr. Vikram Singh',
      specialty: 'Orthopedics',
      experience: '18 years',
      rating: 4.8,
      reviews: 203,
      languages: ['English', 'Hindi', 'Punjabi'],
      availability: ['9:00 AM - 1:00 PM', '5:00 PM - 9:00 PM'],
      consultationFee: 700,
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      name: 'Dr. Sunita Joshi',
      specialty: 'Dermatology',
      experience: '8 years',
      rating: 4.6,
      reviews: 134,
      languages: ['English', 'Hindi', 'Bengali'],
      availability: ['10:00 AM - 2:00 PM', '4:00 PM - 8:00 PM'],
      consultationFee: 550,
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      name: 'Dr. Amit Reddy',
      specialty: 'Psychiatry',
      experience: '14 years',
      rating: 4.9,
      reviews: 178,
      languages: ['English', 'Hindi', 'Telugu'],
      availability: ['11:00 AM - 3:00 PM', '6:00 PM - 10:00 PM'],
      consultationFee: 750,
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const consultationTypes = [
    { id: 'video', name: 'Video Call', icon: Video, description: 'Face-to-face consultation via video call' },
    { id: 'voice', name: 'Voice Call', icon: Phone, description: 'Audio consultation over phone call' },
    { id: 'chat', name: 'Text Chat', icon: MessageCircle, description: 'Text-based consultation and guidance' }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setAppointmentData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setCurrentStep(4);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your consultation with {selectedDoctor?.name} has been scheduled successfully. You will receive a confirmation email with meeting details shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 space-y-2">
              <div><strong>Date:</strong> {appointmentData.preferredDate}</div>
              <div><strong>Time:</strong> {appointmentData.preferredTime}</div>
              <div><strong>Type:</strong> {consultationTypes.find(t => t.id === appointmentData.consultationType)?.name}</div>
              <div><strong>Fee:</strong> ₹{selectedDoctor?.consultationFee}</div>
            </div>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">MediConnect - Expert Consultations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified healthcare professionals for urgent consultations via video call, voice call, or text chat.
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-red-800">
                <strong>For Life-Threatening Emergencies:</strong> Call 112 or 108 immediately. This service is for non-emergency consultations and medical guidance.
              </p>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <div>
            {/* Doctor Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Healthcare Professional</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all ${
                      selectedDoctor?.id === doctor.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-xl'
                    }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div className="text-center mb-4">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                      />
                      <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Experience:</span>
                        <span className="font-medium">{doctor.experience}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-gray-500">({doctor.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <span className="text-gray-600">Languages:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {doctor.languages.map((lang, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <span className="text-gray-600">Available:</span>
                        <div className="mt-1">
                          {doctor.availability.map((time, index) => (
                            <div key={index} className="text-green-600 text-xs">{time}</div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 text-sm">Consultation Fee:</span>
                          <span className="text-xl font-bold text-green-600">₹{doctor.consultationFee}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedDoctor && (
              <div className="text-center">
                <button
                  onClick={nextStep}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Continue with {selectedDoctor.name}
                </button>
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && selectedDoctor && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Information</h2>
                <p className="text-gray-600">Please provide your details for the consultation</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      required
                      value={appointmentData.patientName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter patient name"
                    />
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      required
                      min="1"
                      max="120"
                      value={appointmentData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter age"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={appointmentData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={appointmentData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={appointmentData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Consultation Type *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {consultationTypes.map((type) => (
                      <label
                        key={type.id}
                        className={`cursor-pointer border-2 rounded-lg p-4 transition-colors ${
                          appointmentData.consultationType === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="consultationType"
                          value={type.id}
                          checked={appointmentData.consultationType === type.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <type.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <div className="font-medium text-gray-900">{type.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level *
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    required
                    value={appointmentData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="normal">Normal (within 24-48 hours)</option>
                    <option value="urgent">Urgent (within 2-4 hours)</option>
                    <option value="emergency">Very Urgent (within 1 hour)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Symptoms / Health Concerns *
                  </label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    required
                    rows={4}
                    value={appointmentData.symptoms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Please describe your symptoms, concerns, or reason for consultation..."
                  />
                </div>

                <div>
                  <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700 mb-2">
                    Relevant Medical History
                  </label>
                  <textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    rows={3}
                    value={appointmentData.medicalHistory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Any relevant medical history, current medications, allergies, etc."
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {currentStep === 3 && selectedDoctor && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Appointment</h2>
                <p className="text-gray-600">Choose your preferred date and time</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={appointmentData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      required
                      value={appointmentData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Appointment Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Appointment Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium">{selectedDoctor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Specialty:</span>
                      <span className="font-medium">{selectedDoctor.specialty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Patient:</span>
                      <span className="font-medium">{appointmentData.patientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consultation Type:</span>
                      <span className="font-medium">
                        {consultationTypes.find(t => t.id === appointmentData.consultationType)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Urgency:</span>
                      <span className={`font-medium ${
                        appointmentData.urgency === 'emergency' ? 'text-red-600' :
                        appointmentData.urgency === 'urgent' ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {appointmentData.urgency.charAt(0).toUpperCase() + appointmentData.urgency.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="text-gray-600">Consultation Fee:</span>
                      <span className="text-xl font-bold text-green-600">₹{selectedDoctor.consultationFee}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the terms and conditions and understand that this consultation fee is non-refundable. 
                    I also consent to the recording of this session for quality and training purposes.
                  </label>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Booking...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="h-5 w-5" />
                        <span>Confirm Appointment</span>
                      </>
                    )}
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

export default MediConnectPage;
