// Email validation utility
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generic email domains that require company ID
export const genericDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'protonmail.com',
  'mail.com'
];

export const isGenericDomain = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return genericDomains.includes(domain);
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  // At least 6 characters, contains at least one number or special character
  const hasMinLength = password.length >= 6;
  const hasNumberOrSymbol = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  return hasMinLength && hasNumberOrSymbol;
};

// Generate unique message ID
export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};