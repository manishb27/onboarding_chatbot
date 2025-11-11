'use client';

import { motion } from 'framer-motion';
import ChatContainer from './components/ChatContainer';
import { useChat } from './hooks/useChat';
import { CheckCircle2, Star, Users, Shield } from 'lucide-react';

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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f8fafc, #e0e7ff, #e0e7ff)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.02,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }} />
      </div>

      {/* Main Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header Section */}
        <motion.header
          style={{
            textAlign: 'center',
            padding: '48px 24px',
            marginBottom: '20px'
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
            <motion.div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                borderRadius: '9999px',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                marginBottom: '28px'
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Star style={{ width: '16px', height: '16px', color: '#6366f1' }} />
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#475569' }}>
                Trusted by 10,000+ businesses
              </span>
            </motion.div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 700,
              color: '#1e293b',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              <span style={{
                background: 'linear-gradient(to right, #6366f1, #9333ea, #4f46e5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Business Platform
              </span>
              <br />
              <span style={{ color: '#334155' }}>Onboarding</span>
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#64748b',
              maxWidth: '672px',
              margin: '0 auto',
              lineHeight: 1.7,
              marginBottom: '32px',
              padding: '0 16px'
            }}>
              Get started with our intelligent conversational setup process.
              <br />
              <span style={{ color: '#94a3b8' }}>
                Secure, fast, and designed for modern businesses.
              </span>
            </p>

            {/* Feature pills */}
            <motion.div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
                padding: '0 16px'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                borderRadius: '9999px',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
              }}>
                <Shield style={{ width: '16px', height: '16px', color: '#16a34a' }} />
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#475569' }}>
                  Enterprise Security
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                borderRadius: '9999px',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
              }}>
                <Users style={{ width: '16px', height: '16px', color: '#2563eb' }} />
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#475569' }}>
                  Multi-Company
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                borderRadius: '9999px',
                border: '1px solid rgba(226, 232, 240, 0.6)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
              }}>
                <CheckCircle2 style={{ width: '16px', height: '16px', color: '#9333ea' }} />
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#475569' }}>
                  2-Minute Setup
                </span>
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* Chat Section */}
        <main style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px 40px',
          marginBottom: '20px'
        }}>
          <div style={{ width: '100%', maxWidth: '1200px' }}>
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
            style={{ marginTop: '32px', padding: '0 20px' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{
              maxWidth: '448px',
              margin: '0 auto',
              background: 'linear-gradient(to right, #f0fdf4, #ecfdf5)',
              border: '1px solid rgba(134, 239, 172, 0.6)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)'
            }}>
              <motion.div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '72px',
                  height: '72px',
                  background: 'linear-gradient(to right, #10b981, #059669)',
                  borderRadius: '50%',
                  marginBottom: '20px'
                }}
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
                <CheckCircle2 style={{ width: '36px', height: '36px', color: 'white' }} />
              </motion.div>

              <div style={{
                color: '#166534',
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '12px'
              }}>
                Setup Complete!
              </div>
              <p style={{
                color: '#15803d',
                fontSize: '15px',
                lineHeight: 1.7,
                marginBottom: '24px'
              }}>
                Your account has been configured successfully. You can now start using the platform with all your personalized settings.
              </p>

              <motion.button
                style={{
                  padding: '14px 28px',
                  background: 'linear-gradient(to right, #16a34a, #059669)',
                  color: 'white',
                  borderRadius: '14px',
                  fontWeight: 600,
                  fontSize: '15px',
                  boxShadow: '0 10px 30px -8px rgba(22, 163, 74, 0.4)',
                  border: 'none',
                  cursor: 'pointer'
                }}
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
          style={{
            textAlign: 'center',
            padding: '32px 20px',
            marginTop: 'auto'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p style={{ color: '#94a3b8', fontSize: '13px' }}>
            Powered by AI • Built with Next.js • Secured with enterprise-grade encryption
          </p>
        </motion.div>
      </div>
    </div>
  );
}
