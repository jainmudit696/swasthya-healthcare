import { Heart, Brain, Shield, Users, Phone, Pill } from "lucide-react"

const AppPreview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header Preview */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">SwasthyaAI</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Symptom Checker
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                MediConnect
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                MediAware
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Emergency
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Your AI-Powered Healthcare Companion</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            SwasthyaAI bridges the gap between symptom onset and appropriate medical care with intelligent health
            insights and expert consultations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
              Check Symptoms Now
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50">
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Comprehensive Healthcare Solutions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Symptom Checker */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <Brain className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Symptom Checker</h3>
              <p className="text-gray-600">
                Advanced AI analyzes your symptoms and provides personalized health insights with medical guidance.
              </p>
            </div>

            {/* MediConnect */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">MediConnect</h3>
              <p className="text-gray-600">
                Connect with verified healthcare professionals through video, voice, or text consultations.
              </p>
            </div>

            {/* Emergency Support */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
              <Phone className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Support</h3>
              <p className="text-gray-600">
                24/7 emergency assistance with quick access to ambulance, hospitals, and first aid guidance.
              </p>
            </div>

            {/* MediAware */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <Shield className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">MediAware</h3>
              <p className="text-gray-600">
                Comprehensive health education hub with expert articles, videos, and preventive care guidance.
              </p>
            </div>

            {/* Medication Tracker */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <Pill className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Medication Tracker</h3>
              <p className="text-gray-600">
                Never miss a dose with intelligent reminders and adherence tracking with progress analytics.
              </p>
            </div>

            {/* MediCollab */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl">
              <Heart className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">MediCollab</h3>
              <p className="text-gray-600">
                Partnership platform connecting NGOs, hospitals, and individuals for community health initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">10,000+</div>
              <div className="text-gray-300">Users Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">200+</div>
              <div className="text-gray-300">Health Ambassadors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">100+</div>
              <div className="text-gray-300">Partner Hospitals</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">50,000+</div>
              <div className="text-gray-300">Consultations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Toggle Demo */}
      <section className="py-8 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 mb-4">Available in Multiple Languages</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white px-4 py-2 rounded-lg shadow-sm border-2 border-blue-600 text-blue-600 font-semibold">
              English
            </button>
            <button className="bg-white px-4 py-2 rounded-lg shadow-sm border text-gray-600 hover:border-blue-600">
              हिंदी
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AppPreview
