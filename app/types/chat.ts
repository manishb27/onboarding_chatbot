export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  buttons?: ButtonOption[];
}

export interface ButtonOption {
  id: string;
  label: string;
  value: string;
}

export interface UserData {
  email?: string;
  password?: string;
  companyId?: string;
  businessType?: string;
  companySize?: string;
  useCase?: string;
  isComplete: boolean;
}

export type FlowStep = 
  | 'welcome'
  | 'auth_choice'
  | 'email_input'
  | 'company_check'
  | 'password_input'
  | 'business_type'
  | 'company_size'
  | 'use_case'
  | 'confirmation'
  | 'complete';

export interface ChatState {
  messages: Message[];
  currentStep: FlowStep;
  userData: UserData;
  isLoading: boolean;
}