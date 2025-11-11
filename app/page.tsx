'use client';

import { motion } from 'framer-motion';
import ChatContainer from './components/ChatContainer';
import { useChat } from './hooks/useChat';
import { CheckCircle2, Star, Users, Shield, Sparkles, Award } from 'lucide-react';

export default function Home() {
  const {
    messages,
    currentStep,
    userData,
    isLoading,
    handleUserMessage,
    handleButtonClick
  } = useChat();

  const getInputPlaceholder = () => {
    switch (currentStep) {
      case 'email_input':
        return 'Enter your work email address...';
      case 'company_check':
        return 'Enter your company ID or domain...';
      case 'password_input':
        return 'Create a secure password...';
      default:
        return 'Type your message...';
    }
  };

  const isPasswordInput = currentStep === 'password_input';
  const showInput = !['welcome', 'business_type', 'company_size', 'use_case', 'confirmation', 'complete'].includes(currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <motion.header 
          className="text-center py-8 px-4 sm:py-12 sm:px-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200/50 shadow-sm mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Star className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-slate-700">Trusted by 10,000+ businesses</span>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                Business Platform
              </span>
              <br />
              <span className="text-slate-700">Onboarding</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
              Get started with our intelligent conversational setup process.
              <br className="hidden sm:block" />
              <span className="text-slate-500">Secure, fast, and designed for modern businesses.</span>
            </p>

            {/* Feature pills */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/70 backdrop-blur-sm rounded-full border border-slate-200/50 shadow-sm">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                <span className="text-xs sm:text-sm font-medium text-slate-700">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/70 backdrop-blur-sm rounded-full border border-slate-200/50 shadow-sm">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-medium text-slate-700">Multi-Company</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/70 backdrop-blur-sm rounded-full border border-slate-200/50 shadow-sm">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                <span className="text-xs sm:text-sm font-medium text-slate-700">2-Minute Setup</span>
              </div>
            </motion.div>
          </div>
        </motion.header>
        
        {/* Chat Section */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-8">
          <div className="w-full max-w-4xl">
            <ChatContainer
              messages={messages}
              onSendMessage={handleUserMessage}
              onButtonClick={handleButtonClick}
              isLoading={isLoading}
              inputPlaceholder={getInputPlaceholder()}
              isPasswordInput={isPasswordInput}
              showInput={showInput}
            />
          </div>
        </main>
        
        {/* Completion State */}
        {userData.isComplete && (
          <motion.div 
            className="mt-8 px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-md mx-auto bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 rounded-2xl p-8 text-center shadow-lg">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
              </motion.div>
              
              <div className="text-green-800 text-xl font-bold mb-2">
                🎉 Setup Complete!
              </div>
              <p className="text-green-700 text-sm leading-relaxed">
                Your account has been configured successfully. You can now start using the platform with all your personalized settings.
              </p>
              
              <motion.button
                className="mt-6 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.reload()}
              >
                Start Fresh Demo
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div 
          className="text-center py-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-slate-400 text-sm">
            Powered by AI • Built with Next.js & Groq • Secured with enterprise-grade encryption
          </p>
        </motion.div>
      </div>
    </div>
  );
}
