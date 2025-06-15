import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Users, Shield, Activity, Star, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t('ai_diagnosis'),
      description: t('ai_diagnosis_desc'),
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: t('expert_care'),
      description: t('expert_care_desc'),
      color: 'text-green-600'
    },
    {
      icon: Activity,
      title: t('personal_tracking'),
      description: t('personal_tracking_desc'),
      color: 'text-purple-600'
    },
    {
      icon: Shield,
      title: t('emergency_support'),
      description: t('emergency_support_desc'),
      color: 'text-red-600'
    }
  ];

  const stats = [
    { number: '10,000+', label: t('happy_users') },
    { number: '50+', label: t('healthcare_partners') },
    { number: '24/7', label: t('support_available') },
    { number: '99.9%', label: t('uptime') }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: t('software_engineer'),
      content: t('testimonial_priya'),
      rating: 5
    },
    {
      name: 'Dr. Rajesh Kumar',
      role: t('general_physician'),
      content: t('testimonial_rajesh'),
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: t('teacher'),
      content: t('testimonial_amit'),
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {t('hero_title')}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {t('hero_subtitle')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/symptom-checker"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                {t('check_symptoms')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                {isAuthenticated ? 'View Dashboard' : t('view_dashboard')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('features_title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('platform_description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className={`h-12 w-12 ${feature.color} mb-6`} />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('how_it_works')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('simple_steps')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('describe_symptoms_step')}</h3>
              <p className="text-gray-600">{t('describe_symptoms_desc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('get_ai_analysis')}</h3>
              <p className="text-gray-600">{t('get_ai_analysis_desc')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('connect_with_experts')}</h3>
              <p className="text-gray-600">{t('connect_with_experts_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('what_users_say')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('trusted_by_users')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('ready_to_transform')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('join_thousands')}
          </p>
          <Link
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            {t('start_journey')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
