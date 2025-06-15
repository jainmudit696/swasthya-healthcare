import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Send, Bot, User, AlertTriangle, UserPlus, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { huggingFaceService } from '../services/huggingfaceService';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const SymptomChecker: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI health assistant powered by advanced AI technology. Please describe your symptoms and I\'ll help you understand what might be happening and recommend next steps. Remember, I\'m here to provide guidance, not replace professional medical advice.',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    setApiError(null);
    
    try {
      // Use Hugging Face API for response
      const aiResponseContent = await huggingFaceService.generateResponse(currentInput);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseContent,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setApiError('Unable to connect to AI service. Please try again.');
      
      // Add error message to chat
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm currently experiencing technical difficulties. Please try again in a moment, or for urgent health concerns, please consult a healthcare provider directly.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('ai_symptom_checker')}</h1>
                <p className="text-gray-600">{t('powered_by_ai')}</p>
              </div>
            </div>
            
            {!isAuthenticated && (
              <Link
                to="/register"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span>{t('register_for_more')}</span>
              </Link>
            )}
          </div>
          
          {/* API Status */}
          <div className="mt-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">{t('ai_assistant_online')}</span>
            {apiError && (
              <span className="text-sm text-red-600 ml-4">⚠️ {apiError}</span>
            )}
          </div>
          
          {/* Disclaimer */}
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-800">
                  <strong>{t('medical_disclaimer')}:</strong> {t('disclaimer_text')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-lg flex flex-col h-[600px]">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {!message.isUser && (
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Bot className="h-5 w-5 text-blue-600" />
                  </div>
                )}
                
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                
                {message.isUser && (
                  <div className="p-2 bg-gray-100 rounded-full">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Bot className="h-5 w-5 text-blue-600" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Loader className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-600">AI is analyzing your symptoms...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('describe_symptoms') + " (e.g., 'I have a headache and feel tired')"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={2}
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isLoading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
                <span className="hidden sm:inline">
                  {isLoading ? t('loading') : t('send_message')}
                </span>
              </button>
            </div>
            
            {/* Sample Questions */}
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setInputMessage("I have a persistent headache for 2 days")}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                disabled={isLoading}
              >
                {t('persistent_headache')}
              </button>
              <button
                onClick={() => setInputMessage("I'm feeling chest discomfort and shortness of breath")}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                disabled={isLoading}
              >
                {t('chest_discomfort')}
              </button>
              <button
                onClick={() => setInputMessage("I have fever and body aches")}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                disabled={isLoading}
              >
                {t('fever_body_aches')}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Link
            to="/emergency"
            className="bg-red-50 border border-red-200 rounded-xl p-6 hover:bg-red-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">{t('emergency_support')}</h3>
                <p className="text-sm text-red-700">{t('immediate_help')}</p>
              </div>
            </div>
          </Link>
          
          <Link
            to="/mediconnect"
            className="bg-green-50 border border-green-200 rounded-xl p-6 hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">{t('book_appointment')}</h3>
                <p className="text-sm text-green-700">Connect with doctors online</p>
              </div>
            </div>
          </Link>
          
          <Link
            to="/education"
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Bot className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">{t('health_education')}</h3>
                <p className="text-sm text-blue-700">{t('learn_health_topics')}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Registration CTA for non-authenticated users */}
        {!isAuthenticated && (
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">{t('get_personalized_insights')}</h2>
            <p className="text-blue-100 mb-6">
              {t('unlock_features')}
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <UserPlus className="h-5 w-5" />
              <span>{t('start_journey')}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
