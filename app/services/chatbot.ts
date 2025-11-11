export interface GroqResponse {
  message: string;
  needsInput?: boolean;
  inputType?: 'text' | 'password' | 'buttons';
  buttons?: Array<{ id: string; label: string; value: string }>;
}

export class ChatbotService {
  private static async generateResponse(prompt: string): Promise<string> {
    // For now, we'll use predefined responses based on the prompt context
    // Later, you can integrate Groq API by setting GROQ_API_KEY environment variable
    
    if (prompt.includes('welcome message')) {
      return "👋 Hi there! Welcome to our business platform. I'm here to help you get started.";
    } else if (prompt.includes('work email')) {
      return "Great choice! Please enter your work email address so I can set up your account.";
    } else if (prompt.includes('personal email')) {
      return "I see you're using a personal email address. Could you provide your company ID or company domain? This helps us connect you to the right organization.";
    } else if (prompt.includes('enter your password')) {
      return "Please enter your current password to log in.";
    } else if (prompt.includes('create a secure password')) {
      return "Now let's set up a secure password for your account. It should be at least 6 characters and include a number or symbol.";
    } else if (prompt.includes('business type')) {
      return "Perfect! Now tell me about your business type so I can personalize your experience.";
    } else if (prompt.includes('company size')) {
      return "Great! What's your company size? This helps me tailor the platform features for you.";
    } else if (prompt.includes('primary use case')) {
      return "Almost done! What's your primary use case for our platform?";
    } else if (prompt.includes('confirmation message')) {
      return "Awesome! Let me confirm your information:";
    } else if (prompt.includes('welcome completion')) {
      return "🎉 Perfect! You're all set up and ready to go. Welcome aboard!";
    }
    
    return "Thanks for that information! Let's continue with the next step.";
  }

  static async getWelcomeMessage(): Promise<GroqResponse> {
    const message = await this.generateResponse(
      'Generate a friendly welcome message for a business app onboarding chatbot. Ask if they want to log in or sign up.'
    );
    
    return {
      message,
      needsInput: true,
      inputType: 'buttons',
      buttons: [
        { id: 'login', label: '🔑 Log In', value: 'login' },
        { id: 'signup', label: '✨ Sign Up', value: 'signup' }
      ]
    };
  }

  static async getEmailPrompt(authType: 'login' | 'signup'): Promise<GroqResponse> {
    const action = authType === 'login' ? 'log in' : 'create your account';
    const message = await this.generateResponse(
      `Ask the user to enter their work email address to ${action}. Be encouraging and professional.`
    );

    return {
      message,
      needsInput: true,
      inputType: 'text'
    };
  }

  static async getCompanyPrompt(email: string): Promise<GroqResponse> {
    const message = await this.generateResponse(
      `The user entered a personal email (${email}). Ask them politely for their company ID or company domain. Explain this helps us connect them to the right organization.`
    );

    return {
      message,
      needsInput: true,
      inputType: 'text'
    };
  }

  static async getPasswordPrompt(isLogin: boolean): Promise<GroqResponse> {
    const action = isLogin ? 'enter your password' : 'create a secure password';
    const message = await this.generateResponse(
      `Ask the user to ${action}. For new passwords, mention it should be at least 6 characters with a number or symbol.`
    );

    return {
      message,
      needsInput: true,
      inputType: 'password'
    };
  }

  static async getBusinessTypePrompt(): Promise<GroqResponse> {
    const message = await this.generateResponse(
      'Ask the user about their business type. Be encouraging and mention this helps personalize their experience.'
    );

    return {
      message,
      needsInput: true,
      inputType: 'buttons',
      buttons: [
        { id: 'tech', label: '💻 Tech', value: 'tech' },
        { id: 'finance', label: '💰 Finance', value: 'finance' },
        { id: 'retail', label: '🛍️ Retail', value: 'retail' },
        { id: 'healthcare', label: '🏥 Healthcare', value: 'healthcare' }
      ]
    };
  }

  static async getCompanySizePrompt(): Promise<GroqResponse> {
    const message = await this.generateResponse(
      'Ask about their company size to help tailor the experience.'
    );

    return {
      message,
      needsInput: true,
      inputType: 'buttons',
      buttons: [
        { id: 'small', label: '1–10', value: '1-10' },
        { id: 'medium', label: '11–50', value: '11-50' },
        { id: 'large', label: '51–200', value: '51-200' },
        { id: 'enterprise', label: '200+', value: '200+' }
      ]
    };
  }

  static async getUseCasePrompt(): Promise<GroqResponse> {
    const message = await this.generateResponse(
      'Ask about their primary use case for the application. This is the final onboarding question.'
    );

    return {
      message,
      needsInput: true,
      inputType: 'buttons',
      buttons: [
        { id: 'data', label: '📊 Data Collection', value: 'data-collection' },
        { id: 'support', label: '🎧 Customer Support', value: 'customer-support' },
        { id: 'internal', label: '🛠️ Internal Tools', value: 'internal-tools' },
        { id: 'analytics', label: '📈 Analytics', value: 'analytics' }
      ]
    };
  }

  static async getConfirmationMessage(userData: any): Promise<GroqResponse> {
    const message = await this.generateResponse(
      `Generate a confirmation message summarizing the user's information: 
      Email: ${userData.email}
      ${userData.companyId ? `Company ID: ${userData.companyId}` : ''}
      Business Type: ${userData.businessType}
      Company Size: ${userData.companySize}
      Use Case: ${userData.useCase}
      
      Ask if everything looks correct.`
    );

    return {
      message,
      needsInput: true,
      inputType: 'buttons',
      buttons: [
        { id: 'confirm', label: '✅ Confirm', value: 'confirm' },
        { id: 'edit', label: '✏️ Edit', value: 'edit' }
      ]
    };
  }

  static async getCompletionMessage(userData: any): Promise<GroqResponse> {
    const firstName = userData.email?.split('@')[0] || 'there';
    const message = await this.generateResponse(
      `Generate an enthusiastic welcome completion message for ${firstName}. Mention they're all set and ready to get started.`
    );

    return {
      message,
      needsInput: false
    };
  }
}