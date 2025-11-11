'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { Message } from '../types/chat';
import { MessageSquare, Shield, Sparkles } from 'lucide-react';

interface ChatContainerProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onButtonClick: (value: string) => void;
  isLoading?: boolean;
  inputPlaceholder?: string;
  isPasswordInput?: boolean;
  showInput?: boolean;
}

export default function ChatContainer({
  messages,
  onSendMessage,
  onButtonClick,
  isLoading = false,
  inputPlaceholder,
  isPasswordInput = false,
  showInput = true
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Main Chat Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: '24px',
          boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          height: 'clamp(750px, 88vh, 1000px)',
          position: 'relative'
        }}
      >
        {/* Paper texture overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom right, rgba(255,255,255,0.4), transparent)',
          pointerEvents: 'none',
          borderRadius: '24px'
        }} />

        {/* Header */}
        <motion.div
          style={{
            position: 'relative',
            background: 'linear-gradient(to right, #6366f1, #9333ea, #6366f1)',
            color: 'white',
            padding: '28px 40px'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Header gradient overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom right, rgba(255,255,255,0.2), transparent)'
          }} />

          <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px'
              }}>
                <div style={{
                  padding: '8px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MessageSquare style={{ width: '20px', height: '20px' }} />
                </div>
                <h1 style={{
                  fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  margin: 0
                }}>
                  Welcome to Our Platform
                </h1>
              </div>
              <p style={{
                color: '#e0e7ff',
                fontSize: '14px',
                fontWeight: 500,
                opacity: 0.95,
                margin: 0
              }}>
                Let's get you set up in just a few steps
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#e0e7ff'
            }}>
              <Shield style={{ width: '16px', height: '16px' }} />
              <span style={{ fontSize: '12px', fontWeight: 500 }}>Secure</span>
            </div>
          </div>
        </motion.div>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 40px',
          background: 'linear-gradient(to bottom, rgba(248, 250, 252, 0.5), rgba(255, 255, 255, 0.8))',
          position: 'relative'
        }}>
          {/* Subtle pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.02,
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }} />

          <div style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  textAlign: 'center',
                  padding: '48px 0'
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(to bottom right, #e0e7ff, #ddd6fe)',
                  borderRadius: '50%',
                  marginBottom: '16px'
                }}>
                  <Sparkles style={{ width: '32px', height: '32px', color: '#6366f1' }} />
                </div>
                <p style={{
                  color: '#64748b',
                  fontSize: '18px',
                  margin: 0
                }}>
                  Starting conversation...
                </p>
              </motion.div>
            )}

            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onButtonClick={onButtonClick}
              />
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '12px',
                  marginBottom: '24px'
                }}
              >
                <div style={{
                  flexShrink: 0,
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(to bottom right, #6366f1, #9333ea)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.4)',
                  border: '2px solid white'
                }}>
                  <MessageSquare style={{ width: '20px', height: '20px', color: 'white' }} />
                </div>
                <div style={{
                  background: 'white',
                  borderRadius: '18px',
                  borderBottomLeftRadius: '4px',
                  padding: '14px 18px',
                  boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <motion.div
                      style={{
                        width: '8px',
                        height: '8px',
                        background: '#a5b4fc',
                        borderRadius: '50%'
                      }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      style={{
                        width: '8px',
                        height: '8px',
                        background: '#a5b4fc',
                        borderRadius: '50%'
                      }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      style={{
                        width: '8px',
                        height: '8px',
                        background: '#a5b4fc',
                        borderRadius: '50%'
                      }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        {showInput && (
          <ChatInput
            onSendMessage={onSendMessage}
            placeholder={inputPlaceholder}
            isPassword={isPasswordInput}
            disabled={isLoading}
          />
        )}
      </motion.div>
    </div>
  );
}
