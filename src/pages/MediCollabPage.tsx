import React, { useState } from 'react';
import { Users, Heart, Award, Building, UserCheck, Stethoscope, Send, CheckCircle } from 'lucide-react';

const MediCollabPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    category: '',
    location: '',
    message: '',
    experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const collaborationCategories = [
    {
      id: 'ngo',
      title: 'NGOs & Non-Profits',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Partner with us to organize health camps, blood donation drives, and community wellness programs.',
      opportunities: [
        'Blood donation camps in rural and urban areas',
        'Health awareness sessions and workshops',
        'Free health screenings for underserved communities',
        'Mental health support programs',
        'Vaccination drives and immunization campaigns',
        'Nutrition education programs'
      ],
      benefits: [
        'Access to our healthcare network',
        'Technical support and resources',
        'Joint marketing and promotion',
        'Data analytics and impact measurement',
        'Training for volunteers'
      ]
    },
    {
      id: 'individual',
      title: 'Individual Ambassadors',
      icon: UserCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Become a MediSense ambassador in your community and help spread health awareness.',
      opportunities: [
        'Community health education programs',
        'Social media advocacy and awareness',
        'Local health event organization',
        'Peer-to-peer health support',
        'Translation and localization support',
        'User feedback and testing'
      ],
      benefits: [
        'Official MediSense Ambassador certification',
        'Recognition on our platform and social media',
        'Access to exclusive health resources',
        'Networking opportunities with healthcare professionals',
        'Skill development workshops',
        'Performance-based incentives'
      ]
    },
    {
      id: 'hospital',
      title: 'Hospitals & Clinics',
      icon: Building,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Join our network to provide quality healthcare services and reach more patients.',
      opportunities: [
        'Telemedicine consultations through our platform',
        'Rural healthcare outreach programs',
        'Specialist consultation services',
        'Emergency response partnerships',
        'Health screening and diagnostic services',
        'Medical education and training programs'
      ],
      benefits: [
        'Increased patient reach and visibility',
        'Digital platform integration',
        'Marketing and promotional support',
        'Revenue sharing opportunities',
        'Professional development programs',
        'Quality certification and accreditation'
      ]
    },
    {
      id: 'doctor',
      title: 'Healthcare Professionals',
      icon: Stethoscope,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Collaborate with us to provide expert medical guidance and expand your practice.',
      opportunities: [
        'Online consultation services',
        'Medical content creation and review',
        'Health education webinars and workshops',
        'AI training data validation',
        'Research and clinical studies',
        'Mentorship programs for medical students'
      ],
      benefits: [
        'Flexible working arrangements',
        'Competitive compensation',
        'Professional recognition and branding',
        'Continuing medical education credits',
        'Access to latest medical technologies',
        'Research collaboration opportunities'
      ]
    },
    {
      id: 'corporate',
      title: 'Corporate Partners',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Partner with us for employee wellness programs and corporate social responsibility initiatives.',
      opportunities: [
        'Employee health and wellness programs',
        'Corporate health screenings',
        'Workplace mental health initiatives',
        'Health insurance integration',
        'Occupational health services',
        'CSR health projects'
      ],
      benefits: [
        'Improved employee health and productivity',
        'Reduced healthcare costs',
        'Enhanced corporate reputation',
        'Tax benefits for CSR activities',
        'Custom health solutions',
        'Regular health reports and analytics'
      ]
    },
    {
      id: 'academic',
      title: 'Academic Institutions',
      icon: Award,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Collaborate on research, education, and training programs to advance healthcare knowledge.',
      opportunities: [
        'Medical research collaborations',
        'Student internship and training programs',
        'Health technology development projects',
        'Public health studies and surveys',
        'Medical education curriculum development',
        'Innovation and startup incubation'
      ],
      benefits: [
        'Access to real-world healthcare data',
        'Funding opportunities for research',
        'Industry exposure for students',
        'Publication and conference opportunities',
        'Technology transfer possibilities',
        'Professional networking'
      ]
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        category: '',
        location: '',
        message: '',
        experience: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">MediCollab - Partner With Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our mission to make quality healthcare accessible to everyone. Together, we can create a healthier India through collaboration, innovation, and shared commitment to wellness.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Collaboration Mission</h2>
            <p className="text-xl text-blue-100 mb-6">
              MediSense believes in the power of partnerships to transform healthcare delivery. We're building an ecosystem where technology, expertise, and compassion come together to serve communities across India.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Community Impact</h3>
                <p className="text-sm text-blue-100">Reaching underserved communities with quality healthcare</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Shared Values</h3>
                <p className="text-sm text-blue-100">Commitment to accessible, affordable, and quality healthcare</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Mutual Growth</h3>
                <p className="text-sm text-blue-100">Creating value for all stakeholders in the healthcare ecosystem</p>
              </div>
            </div>
          </div>
        </div>

        {/* Collaboration Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Collaboration Opportunities</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {collaborationCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`${category.bgColor} p-6`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 bg-white rounded-full`}>
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                  </div>
                  <p className="text-gray-700">{category.description}</p>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Collaboration Opportunities:</h4>
                    <ul className="space-y-2">
                      {category.opportunities.map((opportunity, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{opportunity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Benefits & Recognition:</h4>
                    <ul className="space-y-2">
                      {category.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Award className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900">Rural Health Initiative</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Partnered with 15 NGOs to conduct health camps in 50+ villages, screening over 10,000 people and providing free medications.
              </p>
              <div className="text-center">
                <span className="text-2xl font-bold text-red-600">10,000+</span>
                <p className="text-sm text-gray-600">People Served</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">Ambassador Network</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Trained 200+ community ambassadors who have conducted health awareness sessions reaching 25,000+ individuals.
              </p>
              <div className="text-center">
                <span className="text-2xl font-bold text-blue-600">200+</span>
                <p className="text-sm text-gray-600">Active Ambassadors</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900">Hospital Network</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Connected 100+ hospitals and clinics to our platform, enabling 50,000+ telemedicine consultations.
              </p>
              <div className="text-center">
                <span className="text-2xl font-bold text-green-600">100+</span>
                <p className="text-sm text-gray-600">Partner Hospitals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Collaboration Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Collaborate?</h2>
            <p className="text-gray-600">
              Fill out the form below and our partnership team will get in touch with you within 48 hours.
            </p>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">Thank you for your interest! We'll contact you soon to discuss collaboration opportunities.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">Sorry, there was an error submitting your form. Please try again.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name / Organization Representative *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
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
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter organization name (if applicable)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Collaboration Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="ngo">NGO / Non-Profit</option>
                  <option value="individual">Individual Ambassador</option>
                  <option value="hospital">Hospital / Clinic</option>
                  <option value="doctor">Healthcare Professional</option>
                  <option value="corporate">Corporate Partner</option>
                  <option value="academic">Academic Institution</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location (City, State) *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your location"
                />
              </div>
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                Relevant Experience / Background
              </label>
              <textarea
                id="experience"
                name="experience"
                rows={3}
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Briefly describe your relevant experience or background..."
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                How would you like to collaborate with us? *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Please describe your collaboration ideas, goals, and how you can contribute to our mission..."
              />
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="consent"
                required
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                I agree to be contacted by MediSense regarding collaboration opportunities and understand that my information will be used in accordance with the privacy policy.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Submit Collaboration Request</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Have Questions?</h3>
          <p className="text-gray-600 mb-4">
            Our partnership team is here to help you explore collaboration opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:partnerships@medisense.com"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              partnerships@medisense.com
            </a>
            <a
              href="tel:+919876543210"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              +91 9876543210
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediCollabPage;
