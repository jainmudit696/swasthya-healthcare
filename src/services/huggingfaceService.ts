interface HuggingFaceResponse {
  generated_text?: string;
  error?: string;
}

class HuggingFaceService {
  private apiKey: string;
  private baseURL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';

  constructor() {
    this.apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    if (!this.apiKey) {
      console.warn('Hugging Face API key not found in environment variables');
    }
  }

  private getSystemPrompt(): string {
    return `You are MediSense AI, a healthcare assistant designed to help users understand their symptoms and provide general health guidance. 

IMPORTANT GUIDELINES:
1. You ONLY respond to healthcare, medical, and health-related questions
2. For non-health questions, politely redirect users to ask about health concerns
3. Always include medical disclaimers
4. Never provide specific diagnoses - only general information and guidance
5. Always recommend consulting healthcare professionals for serious concerns
6. Be empathetic and supportive
7. Provide actionable advice when appropriate (rest, hydration, when to seek care)
8. For emergency symptoms, strongly recommend immediate medical attention

EMERGENCY SYMPTOMS that require immediate medical attention:
- Severe chest pain
- Difficulty breathing
- Severe allergic reactions
- Loss of consciousness
- Severe bleeding
- Signs of stroke (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency)
- High fever with severe symptoms
- Severe abdominal pain

For non-healthcare questions, respond with: "I'm specialized in healthcare assistance. Please describe any symptoms or health concerns you have, and I'll do my best to help you understand them and suggest appropriate next steps."

Always end serious symptom discussions with appropriate medical disclaimers and recommendations to consult healthcare providers.`;
  }

  private isHealthcareRelated(message: string): boolean {
    const healthKeywords = [
      'pain', 'ache', 'fever', 'cold', 'cough', 'headache', 'stomach', 'nausea', 
      'dizzy', 'tired', 'fatigue', 'chest', 'throat', 'back', 'joint', 'muscle',
      'symptom', 'sick', 'illness', 'disease', 'hurt', 'sore', 'swollen', 'rash',
      'breathing', 'shortness', 'breath', 'heart', 'palpitation', 'anxiety', 'stress',
      'blood', 'pressure', 'diabetes', 'medication', 'doctor', 'hospital', 'health',
      'medical', 'treatment', 'diagnosis', 'allergy', 'infection', 'virus', 'bacteria',
      'injury', 'wound', 'bruise', 'cut', 'burn', 'fracture', 'sprain', 'strain',
      'mental health', 'depression', 'sleep', 'insomnia', 'weight', 'diet', 'nutrition',
      'exercise', 'fitness', 'wellness', 'prevention', 'vaccine', 'immunization',
      'दर्द', 'बुखार', 'सिरदर्द', 'पेट', 'खांसी', 'सांस', 'दवा', 'डॉक्टर', 'स्वास्थ्य'
    ];
    
    const lowerMessage = message.toLowerCase();
    return healthKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  async generateResponse(userMessage: string): Promise<string> {
    try {
      // Check if the message is healthcare-related
      if (!this.isHealthcareRelated(userMessage)) {
        return "I'm specialized in healthcare assistance. Please describe any symptoms or health concerns you have, and I'll do my best to help you understand them and suggest appropriate next steps.";
      }

      if (!this.apiKey) {
        return this.getFallbackResponse(userMessage, 'general');
      }

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: `${this.getSystemPrompt()}\n\nUser: ${userMessage}\nAssistant:`,
          parameters: {
            max_length: 500,
            temperature: 0.7,
            do_sample: true,
            top_p: 0.9
          }
        })
      });

      if (!response.ok) {
        console.warn(`Hugging Face API error (${response.status}), using fallback response`);
        return this.getFallbackResponse(userMessage, 'general');
      }

      const data: HuggingFaceResponse[] = await response.json();
      
      if (!data || data.length === 0 || !data[0].generated_text) {
        console.warn('No response from Hugging Face API, using fallback response');
        return this.getFallbackResponse(userMessage, 'general');
      }

      // Extract the assistant's response from the generated text
      const fullText = data[0].generated_text;
      const assistantResponse = fullText.split('Assistant:').pop()?.trim() || '';
      
      return assistantResponse || this.getFallbackResponse(userMessage, 'general');
    } catch (error) {
      console.warn('Error calling Hugging Face API, using fallback response:', error instanceof Error ? error.message : 'Unknown error');
      return this.getFallbackResponse(userMessage, 'general');
    }
  }

  private getFallbackResponse(userMessage: string, errorType: 'quota' | 'auth' | 'general' = 'general'): string {
    const lowerMessage = userMessage.toLowerCase();
    
    const fallbackNotice = "🤖 **Note**: I'm currently operating in offline mode, but I can still provide helpful health guidance based on common symptoms.\n\n";
    
    if (lowerMessage.includes('chest pain') || lowerMessage.includes('सीने में दर्द')) {
      return fallbackNotice + "⚠️ **IMPORTANT**: Chest pain can be serious. If you're experiencing severe chest pain, especially with shortness of breath, sweating, nausea, or pain radiating to your arm or jaw, seek emergency medical attention immediately by calling emergency services.\n\nFor mild chest discomfort, it could be due to:\n• Muscle strain from exercise or poor posture\n• Acid reflux or heartburn\n• Stress or anxiety\n• Costochondritis (inflammation of chest wall)\n\nHowever, it's always best to consult a healthcare provider for proper evaluation, especially if the pain persists or worsens.\n\n**Disclaimer**: This is general information only and not a substitute for professional medical advice.";
    }
    
    if (lowerMessage.includes('headache') || lowerMessage.includes('सिरदर्द')) {
      return fallbackNotice + "Headaches can have various causes and here's some general guidance:\n\n**Common causes:**\n• Stress and tension\n• Dehydration\n• Lack of sleep\n• Eye strain from screens\n• Skipped meals\n• Poor posture\n\n**Self-care measures:**\n• Rest in a quiet, dark room\n• Stay hydrated with water\n• Apply a cold or warm compress\n• Gentle neck and shoulder stretches\n• Over-the-counter pain relievers as directed\n\n**Seek immediate medical attention if you experience:**\n• Sudden, severe headache unlike any before\n• Headache with fever and neck stiffness\n• Headache with vision changes or confusion\n• Headache after a head injury\n\n**Disclaimer**: This is general information only. Consult a healthcare provider for persistent or concerning headaches.";
    }
    
    if (lowerMessage.includes('fever') || lowerMessage.includes('बुखार')) {
      return fallbackNotice + "Fever is your body's natural response to infection. Here's what you should know:\n\n**For adults:**\n• Normal body temperature: 98.6°F (37°C)\n• Low-grade fever: 100.4°F (38°C)\n• High fever: 103°F (39.4°C) or higher\n\n**Self-care measures:**\n• Stay hydrated with water, clear broths, or electrolyte solutions\n• Rest and avoid strenuous activity\n• Dress lightly and keep room cool\n• Consider over-the-counter fever reducers (follow package directions)\n\n**Seek immediate medical attention if:**\n• Fever exceeds 103°F (39.4°C)\n• Fever persists for more than 3 days\n• Accompanied by difficulty breathing, chest pain, severe headache, or confusion\n• Signs of dehydration\n\n**Disclaimer**: This is general information only. Always consult a healthcare provider for medical concerns.";
    }

    return fallbackNotice + "I understand you're experiencing health concerns. Here's some general guidance:\n\n**General health recommendations:**\n• Monitor your symptoms closely\n• Stay hydrated and get adequate rest\n• Consider over-the-counter remedies as appropriate for your symptoms\n• Maintain good hygiene practices\n\n**When to seek medical care:**\n• Symptoms worsen or don't improve\n• You develop new concerning symptoms\n• You have underlying health conditions\n• You're unsure about the severity of your symptoms\n\n**For emergencies, call emergency services immediately if you experience:**\n• Difficulty breathing\n• Chest pain\n• Severe bleeding\n• Loss of consciousness\n• Signs of stroke\n\n**Disclaimer**: This is general information only and not a substitute for professional medical advice. Please consult with a healthcare provider for proper evaluation and treatment of your specific symptoms.";
  }
}

export const huggingFaceService = new HuggingFaceService();
