'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChatState, FlowStep, Message, UserData } from '../types/chat';
import { ChatbotService } from '../services/chatbot';
import { generateMessageId, isValidEmail, isGenericDomain, isValidPassword } from '../utils/validation';

export function useChat() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    currentStep: 'welcome',
    userData: {
      isComplete: false
    },
    isLoading: false
  });

  const addMessage = useCallback((content: string, isBot: boolean, buttons?: any[]) => {
    const message: Message = {
      id: generateMessageId(),
      content,
      isBot,
      timestamp: new Date(),
      buttons
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setChatState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  const updateUserData = useCallback((updates: Partial<UserData>) => {
    setChatState(prev => ({
      ...prev,
      userData: { ...prev.userData, ...updates }
    }));
  }, []);

  const setCurrentStep = useCallback((step: FlowStep) => {
    setChatState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const processStep = useCallback(async (step: FlowStep) => {
    setLoading(true);
    
    try {
      switch (step) {
        case 'welcome': {
          const response = await ChatbotService.getWelcomeMessage();
          addMessage(response.message, true, response.buttons);
          break;
        }
        
        case 'email_input': {
          const response = await ChatbotService.getEmailPrompt('signup');
          addMessage(response.message, true);
          break;
        }
        
        case 'company_check': {
          const response = await ChatbotService.getCompanyPrompt(chatState.userData.email || '');
          addMessage(response.message, true);
          break;
        }
        
        case 'password_input': {
          const response = await ChatbotService.getPasswordPrompt(false);
          addMessage(response.message, true);
          break;
        }
        
        case 'business_type': {
          const response = await ChatbotService.getBusinessTypePrompt();
          addMessage(response.message, true, response.buttons);
          break;
        }
        
        case 'company_size': {
          const response = await ChatbotService.getCompanySizePrompt();
          addMessage(response.message, true, response.buttons);
          break;
        }
        
        case 'use_case': {
          const response = await ChatbotService.getUseCasePrompt();
          addMessage(response.message, true, response.buttons);
          break;
        }
        
        case 'confirmation': {
          const response = await ChatbotService.getConfirmationMessage(chatState.userData);
          const summaryMessage = `Here's what I have:

📧 Email: ${chatState.userData.email}
${chatState.userData.companyId ? `🏢 Company ID: ${chatState.userData.companyId}` : ''}
💼 Business Type: ${chatState.userData.businessType}
👥 Company Size: ${chatState.userData.companySize}
🎯 Use Case: ${chatState.userData.useCase}

Does everything look correct?`;
          
          addMessage(summaryMessage, true, response.buttons);
          break;
        }
        
        case 'complete': {
          const response = await ChatbotService.getCompletionMessage(chatState.userData);
          addMessage(response.message, true);
          updateUserData({ isComplete: true });
          break;
        }
      }
    } catch (error) {
      addMessage('I apologize, but I encountered an issue. Please try again.', true);
    }
    
    setLoading(false);
  }, [chatState.userData, addMessage, setLoading, updateUserData]);

  const handleUserMessage = useCallback(async (message: string) => {
    // Add user message
    addMessage(message, false);
    
    // Process based on current step
    switch (chatState.currentStep) {
      case 'email_input': {
        if (!isValidEmail(message)) {
          addMessage('Please enter a valid email address.', true);
          return;
        }
        
        updateUserData({ email: message });
        
        if (isGenericDomain(message)) {
          setCurrentStep('company_check');
          await processStep('company_check');
        } else {
          setCurrentStep('password_input');
          await processStep('password_input');
        }
        break;
      }
      
      case 'company_check': {
        updateUserData({ companyId: message });
        setCurrentStep('password_input');
        await processStep('password_input');
        break;
      }
      
      case 'password_input': {
        if (!isValidPassword(message)) {
          addMessage('Please use at least 6 characters with a number or symbol.', true);
          return;
        }
        
        updateUserData({ password: message });
        setCurrentStep('business_type');
        await processStep('business_type');
        break;
      }
    }
  }, [chatState.currentStep, addMessage, updateUserData, setCurrentStep, processStep]);

  const handleButtonClick = useCallback(async (value: string) => {
    switch (chatState.currentStep) {
      case 'welcome': {
        if (value === 'signup') {
          addMessage('✨ Sign Up', false);
          setCurrentStep('email_input');
          await processStep('email_input');
        } else {
          addMessage('🔑 Log In', false);
          // For now, redirect to login (you can implement login flow later)
          addMessage('Login functionality will be available soon! For now, let\'s create your account.', true);
          setCurrentStep('email_input');
          await processStep('email_input');
        }
        break;
      }
      
      case 'business_type': {
        const labels: Record<string, string> = {
          'tech': '💻 Tech',
          'finance': '💰 Finance', 
          'retail': '🛍️ Retail',
          'healthcare': '🏥 Healthcare'
        };
        addMessage(labels[value] || value, false);
        updateUserData({ businessType: value });
        setCurrentStep('company_size');
        await processStep('company_size');
        break;
      }
      
      case 'company_size': {
        addMessage(value, false);
        updateUserData({ companySize: value });
        setCurrentStep('use_case');
        await processStep('use_case');
        break;
      }
      
      case 'use_case': {
        const labels: Record<string, string> = {
          'data-collection': '📊 Data Collection',
          'customer-support': '🎧 Customer Support',
          'internal-tools': '🛠️ Internal Tools',
          'analytics': '📈 Analytics'
        };
        addMessage(labels[value] || value, false);
        updateUserData({ useCase: value });
        setCurrentStep('confirmation');
        await processStep('confirmation');
        break;
      }
      
      case 'confirmation': {
        if (value === 'confirm') {
          addMessage('✅ Confirm', false);
          setCurrentStep('complete');
          await processStep('complete');
        } else {
          addMessage('✏️ Edit', false);
          addMessage('What would you like to change? You can restart by refreshing the page.', true);
        }
        break;
      }
    }
  }, [chatState.currentStep, addMessage, updateUserData, setCurrentStep, processStep]);

  // Initialize chat
  useEffect(() => {
    if (chatState.messages.length === 0) {
      processStep('welcome');
    }
  }, [processStep, chatState.messages.length]);

  return {
    messages: chatState.messages,
    currentStep: chatState.currentStep,
    userData: chatState.userData,
    isLoading: chatState.isLoading,
    handleUserMessage,
    handleButtonClick
  };
}