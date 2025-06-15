import React, { useState } from 'react';
import { Search, Filter, BookOpen, Video, Clock, User, ExternalLink, Heart, Brain, Shield, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  publishDate: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  thumbnail: string;
  url: string;
}

const EducationPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contentType, setContentType] = useState<'all' | 'articles' | 'videos'>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = [
    { id: 'all', name: t('all_categories'), icon: BookOpen },
    { id: 'heart', name: t('heart_health'), icon: Heart },
    { id: 'mental', name: t('mental_health'), icon: Brain },
    { id: 'prevention', name: t('prevention'), icon: Shield },
    { id: 'fitness', name: t('fitness_nutrition'), icon: Activity },
    { id: 'emergency', name: t('emergency_care'), icon: Shield },
    { id: 'chronic', name: t('chronic_diseases'), icon: Activity }
  ];

  const articles: Article[] = [
    {
      id: '1',
      title: 'Understanding Heart Disease: Prevention and Early Detection',
      excerpt: 'Heart disease remains the leading cause of death globally. Learn about risk factors, prevention strategies, and early warning signs.',
      content: `Heart disease encompasses various conditions affecting the heart and blood vessels. The most common type is coronary artery disease, which occurs when the arteries supplying blood to the heart become narrowed or blocked.

**Risk Factors:**
- High blood pressure
- High cholesterol
- Smoking
- Diabetes
- Obesity
- Family history
- Sedentary lifestyle

**Prevention Strategies:**
1. Maintain a healthy diet rich in fruits, vegetables, and whole grains
2. Exercise regularly (at least 150 minutes of moderate activity per week)
3. Avoid smoking and limit alcohol consumption
4. Manage stress through relaxation techniques
5. Regular health checkups and monitoring

**Early Warning Signs:**
- Chest pain or discomfort
- Shortness of breath
- Fatigue
- Irregular heartbeat
- Swelling in legs, ankles, or feet

If you experience any of these symptoms, consult a healthcare provider immediately. Early detection and treatment can significantly improve outcomes and quality of life.`,
      author: 'Dr. Priya Sharma',
      readTime: '8 min read',
      category: 'heart',
      image: 'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['heart health', 'prevention', 'cardiovascular'],
      publishDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Mental Health in the Digital Age: Managing Stress and Anxiety',
      excerpt: 'Explore effective strategies for maintaining mental wellness in our increasingly connected world.',
      content: `Mental health has become increasingly important in our digital age. With constant connectivity and information overload, many people struggle with stress, anxiety, and digital burnout.

**Common Digital Age Mental Health Challenges:**
- Information overload and decision fatigue
- Social media comparison and FOMO
- Reduced face-to-face social interaction
- Sleep disruption from screen time
- Work-life balance challenges

**Effective Coping Strategies:**
1. **Digital Detox:** Set specific times for device-free activities
2. **Mindfulness Practice:** Use meditation apps or practice breathing exercises
3. **Physical Activity:** Regular exercise releases endorphins and reduces stress
4. **Sleep Hygiene:** Maintain consistent sleep schedules and limit screen time before bed
5. **Social Connection:** Prioritize in-person relationships and meaningful conversations

**When to Seek Professional Help:**
- Persistent feelings of sadness or hopelessness
- Difficulty concentrating or making decisions
- Changes in appetite or sleep patterns
- Loss of interest in activities you once enjoyed
- Thoughts of self-harm

Remember, seeking help is a sign of strength, not weakness. Mental health professionals can provide valuable tools and support for managing stress and anxiety.`,
      author: 'Dr. Rajesh Kumar',
      readTime: '6 min read',
      category: 'mental',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['mental health', 'stress management', 'digital wellness'],
      publishDate: '2024-01-12'
    },
    {
      id: '3',
      title: 'Diabetes Prevention: Lifestyle Changes That Make a Difference',
      excerpt: 'Type 2 diabetes is largely preventable through lifestyle modifications. Learn practical steps to reduce your risk.',
      content: `Type 2 diabetes affects millions worldwide, but the good news is that it's largely preventable through lifestyle changes. Understanding risk factors and implementing preventive measures can significantly reduce your chances of developing this condition.

**Risk Factors for Type 2 Diabetes:**
- Overweight or obesity
- Sedentary lifestyle
- Family history of diabetes
- Age (45 years or older)
- High blood pressure
- Abnormal cholesterol levels
- History of gestational diabetes

**Effective Prevention Strategies:**

**1. Maintain a Healthy Weight:**
- Even a 5-10% weight loss can significantly reduce diabetes risk
- Focus on gradual, sustainable weight loss
- Combine diet and exercise for best results

**2. Follow a Balanced Diet:**
- Choose whole grains over refined carbohydrates
- Include plenty of vegetables and fruits
- Limit processed foods and sugary drinks
- Control portion sizes
- Consider the Mediterranean diet pattern

**3. Stay Physically Active:**
- Aim for at least 150 minutes of moderate aerobic activity weekly
- Include strength training exercises twice a week
- Take regular breaks from sitting
- Find activities you enjoy to maintain consistency

**4. Regular Health Monitoring:**
- Get regular blood sugar screenings
- Monitor blood pressure and cholesterol
- Maintain regular checkups with healthcare providers

**Early Warning Signs:**
- Increased thirst and urination
- Unexplained weight loss
- Fatigue
- Blurred vision
- Slow-healing wounds

Prevention is always better than treatment. Start implementing these changes today for a healthier tomorrow.`,
      author: 'Dr. Anita Patel',
      readTime: '7 min read',
      category: 'prevention',
      image: 'https://images.pexels.com/photos/6823568/pexels-photo-6823568.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['diabetes', 'prevention', 'lifestyle'],
      publishDate: '2024-01-10'
    },
    {
      id: '4',
      title: 'Nutrition Essentials: Building a Healthy Plate for Optimal Wellness',
      excerpt: 'Discover the fundamentals of balanced nutrition and how to create meals that fuel your body effectively.',
      content: `Proper nutrition is the foundation of good health. Understanding how to build a balanced plate can help you maintain energy, support immune function, and prevent chronic diseases.

**The Healthy Plate Model:**

**1. Fill Half Your Plate with Vegetables and Fruits (50%):**
- Aim for variety in colors and types
- Include both raw and cooked vegetables
- Choose whole fruits over fruit juices
- Examples: leafy greens, berries, carrots, bell peppers

**2. One Quarter with Whole Grains (25%):**
- Choose brown rice, quinoa, whole wheat bread
- Limit refined grains and processed foods
- Include ancient grains like millet and barley

**3. One Quarter with Lean Proteins (25%):**
- Include fish, poultry, legumes, nuts, and seeds
- Limit red meat and processed meats
- Consider plant-based protein sources

**Essential Nutrients:**

**Macronutrients:**
- Carbohydrates: 45-65% of daily calories
- Proteins: 10-35% of daily calories
- Fats: 20-35% of daily calories (focus on healthy fats)

**Key Micronutrients:**
- Vitamin D: For bone health and immune function
- Vitamin B12: Essential for nerve function
- Iron: Prevents anemia
- Calcium: For strong bones and teeth
- Omega-3 fatty acids: For heart and brain health

**Practical Tips:**
1. Plan meals in advance
2. Read nutrition labels
3. Stay hydrated (8-10 glasses of water daily)
4. Practice mindful eating
5. Limit processed and ultra-processed foods

**Special Considerations for Indians:**
- Include traditional foods like dal, vegetables, and whole grains
- Use spices like turmeric, ginger, and garlic for their health benefits
- Balance vegetarian diets with adequate protein sources
- Be mindful of oil and salt intake in traditional cooking

Remember, small changes in your daily eating habits can lead to significant health improvements over time.`,
      author: 'Nutritionist Meera Singh',
      readTime: '9 min read',
      category: 'fitness',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['nutrition', 'healthy eating', 'wellness'],
      publishDate: '2024-01-08'
    },
    {
      id: '5',
      title: 'Emergency First Aid: Essential Skills Everyone Should Know',
      excerpt: 'Learn life-saving first aid techniques that could make the difference in emergency situations.',
      content: `First aid knowledge can save lives. Whether at home, work, or in public spaces, knowing basic emergency response techniques is invaluable.

**Essential First Aid Skills:**

**1. CPR (Cardiopulmonary Resuscitation):**
- Check for responsiveness and breathing
- Call emergency services (112/108)
- Place hands on center of chest, push hard and fast
- 30 chest compressions followed by 2 rescue breaths
- Continue until help arrives

**2. Choking Response:**
- Encourage coughing if person is conscious
- Perform back blows and abdominal thrusts
- For unconscious victims, begin CPR

**3. Bleeding Control:**
- Apply direct pressure with clean cloth
- Elevate the injured area if possible
- Don't remove embedded objects
- Watch for signs of shock

**4. Burn Treatment:**
- Cool the burn with running water for 10-20 minutes
- Remove jewelry before swelling occurs
- Cover with sterile, non-stick bandage
- Seek medical attention for severe burns

**5. Fracture Management:**
- Don't move the person unless necessary
- Immobilize the injured area
- Apply ice wrapped in cloth
- Monitor for signs of shock

**Emergency Kit Essentials:**
- Sterile bandages and gauze
- Adhesive tape
- Antiseptic wipes
- Pain relievers
- Thermometer
- Emergency contact numbers
- Flashlight and batteries

**When to Call Emergency Services:**
- Unconsciousness or altered mental state
- Difficulty breathing
- Severe bleeding
- Suspected heart attack or stroke
- Severe burns or injuries
- Poisoning

**Important Reminders:**
- Stay calm and assess the situation
- Ensure your own safety first
- Call for professional help immediately
- Provide comfort and reassurance to the victim
- Don't give food or water to unconscious persons

Consider taking a certified first aid course to practice these skills hands-on. Regular training updates ensure you're prepared when emergencies arise.`,
      author: 'Emergency Specialist Dr. Vikram Reddy',
      readTime: '10 min read',
      category: 'emergency',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['first aid', 'emergency', 'safety'],
      publishDate: '2024-01-05'
    },
    {
      id: '6',
      title: 'Managing Chronic Pain: Holistic Approaches for Better Quality of Life',
      excerpt: 'Explore comprehensive strategies for managing chronic pain beyond medication.',
      content: `Chronic pain affects millions of people worldwide and can significantly impact quality of life. While medication plays a role in pain management, a holistic approach often provides the best outcomes.

**Understanding Chronic Pain:**
Chronic pain persists for more than 3-6 months and can result from various conditions including arthritis, fibromyalgia, back injuries, or nerve damage. Unlike acute pain, chronic pain may not have a clear cause or may persist after the original injury has healed.

**Holistic Pain Management Strategies:**

**1. Physical Approaches:**
- **Exercise Therapy:** Low-impact activities like swimming, walking, or yoga
- **Physical Therapy:** Targeted exercises to improve strength and flexibility
- **Heat and Cold Therapy:** Alternating treatments to reduce inflammation
- **Massage Therapy:** Improves circulation and reduces muscle tension

**2. Mind-Body Techniques:**
- **Meditation:** Mindfulness practices can change pain perception
- **Deep Breathing:** Activates the body's relaxation response
- **Progressive Muscle Relaxation:** Systematic tension and release of muscle groups
- **Biofeedback:** Learning to control physiological responses

**3. Lifestyle Modifications:**
- **Sleep Hygiene:** Quality sleep is crucial for pain management
- **Stress Management:** Chronic stress can worsen pain perception
- **Nutrition:** Anti-inflammatory foods may help reduce pain
- **Pacing Activities:** Balance activity with rest periods

**4. Alternative Therapies:**
- **Acupuncture:** May help reduce certain types of chronic pain
- **Chiropractic Care:** For musculoskeletal pain conditions
- **Herbal Supplements:** Some herbs have anti-inflammatory properties
- **Aromatherapy:** Certain scents may promote relaxation

**Building Your Pain Management Plan:**
1. Work with healthcare providers to identify pain triggers
2. Keep a pain diary to track patterns
3. Set realistic goals for daily activities
4. Build a support network of family, friends, and healthcare providers
5. Consider joining support groups for people with chronic pain

**When to Seek Professional Help:**
- Pain interferes with daily activities
- Sleep disturbances due to pain
- Mood changes or depression
- Increased pain intensity or frequency
- Side effects from pain medications

**Red Flags - Seek Immediate Medical Attention:**
- Sudden, severe pain
- Pain with fever
- Loss of bladder or bowel control
- Numbness or weakness in extremities
- Pain following trauma or injury

Remember, chronic pain management is often a journey that requires patience and persistence. What works for one person may not work for another, so it's important to work with healthcare providers to find the right combination of treatments for your specific situation.`,
      author: 'Pain Management Specialist Dr. Sunita Joshi',
      readTime: '11 min read',
      category: 'chronic',
      image: 'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['chronic pain', 'holistic health', 'pain management'],
      publishDate: '2024-01-03'
    }
  ];

  const videos: Video[] = [
    {
      id: '1',
      title: '10-Minute Morning Yoga for Better Health',
      description: 'Start your day with this energizing yoga routine designed to improve flexibility and mental clarity.',
      duration: '10:32',
      category: 'fitness',
      thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: '#'
    },
    {
      id: '2',
      title: 'Understanding Blood Pressure: What Your Numbers Mean',
      description: 'Learn how to interpret blood pressure readings and understand when to be concerned.',
      duration: '8:45',
      category: 'heart',
      thumbnail: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: '#'
    },
    {
      id: '3',
      title: 'Stress Management Techniques for Busy Professionals',
      description: 'Practical strategies to manage stress and maintain mental wellness in demanding work environments.',
      duration: '12:18',
      category: 'mental',
      thumbnail: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: '#'
    },
    {
      id: '4',
      title: 'Basic First Aid: How to Perform CPR',
      description: 'Step-by-step guide to performing CPR correctly in emergency situations.',
      duration: '15:22',
      category: 'emergency',
      thumbnail: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: '#'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesType = contentType === 'all' || contentType === 'articles';
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesType = contentType === 'all' || contentType === 'videos';
    
    return matchesSearch && matchesCategory && matchesType;
  });

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Education Hub
          </button>
          
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-64 object-cover"
            />
            
            <div className="p-8">
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{selectedArticle.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedArticle.readTime}</span>
                </div>
                <span>{selectedArticle.publishDate}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{selectedArticle.title}</h1>
              
              <div className="prose prose-lg max-w-none">
                {selectedArticle.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                        {paragraph.slice(2, -2)}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <li key={index} className="ml-4 text-gray-700">
                        {paragraph.slice(2)}
                      </li>
                    );
                  }
                  if (paragraph.match(/^\d+\./)) {
                    return (
                      <li key={index} className="ml-4 text-gray-700 list-decimal">
                        {paragraph.replace(/^\d+\.\s*/, '')}
                      </li>
                    );
                  }
                  return paragraph ? (
                    <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ) : null;
                })}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('health_education_hub')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('health_education_desc')}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Content Type Filter */}
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value as 'all' | 'articles' | 'videos')}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">{t('all_content')}</option>
              <option value="articles">{t('articles_only')}</option>
              <option value="videos">{t('videos_only')}</option>
            </select>
          </div>

          {/* Category Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles */}
          {(contentType === 'all' || contentType === 'articles') && (
            <>
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                      <BookOpen className="h-4 w-4" />
                      <span>{t('article')}</span>
                      <span>•</span>
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                      <span className="text-blue-600 font-medium hover:text-blue-700">
                        {t('read_more')} →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Videos */}
          {(contentType === 'all' || contentType === 'videos') && (
            <>
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <Video className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                      <Video className="h-4 w-4" />
                      <span>Video</span>
                      <span>•</span>
                      <span>{video.duration}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {video.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {video.description}
                    </p>
                    
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Watch Video
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('no_content_found')}</h3>
            <p className="text-gray-600">
              {t('adjust_search_filters')}
            </p>
          </div>
        )}

        {/* Featured Resources */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">{t('need_personalized_guidance')}</h2>
            <p className="text-xl text-blue-100 mb-6">
              {t('personalized_guidance_desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/symptom-checker"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('try_symptom_checker')}
              </a>
              <a
                href="/mediconnect"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
              >
                {t('book_consultation')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
