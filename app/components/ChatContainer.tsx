'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { Message } from '../types/chat';
import { MessageSquare, Shield, Sparkles, Bot } from 'lucide-react';

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
    <div className="w-full max-w-3xl mx-auto">
      {/* Main Chat Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden h-[500px] sm:h-[600px] lg:h-[700px]"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-2xl sm:rounded-3xl" />
        
        {/* Header */}
        <motion.div 
          className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white p-4 sm:p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Header paper texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div className="p-1.5 sm:p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight">
                  Welcome to Our Platform
                </h1>
              </div>
              <p className="text-indigo-100 text-xs sm:text-sm font-medium opacity-90">
                Let's get you set up in just a few steps
              </p>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-indigo-200">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-medium">Secure</span>
            </div>
          </div>
        </motion.div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 bg-gradient-to-b from-slate-50/50 to-white/80 relative">
          {/* Subtle paper pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-slate-500 text-lg">Starting conversation...</p>
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
                className="flex items-end gap-2 mb-6"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-lg border border-slate-200">
                  <div className="flex gap-1">
                    <motion.div 
                      className="w-2 h-2 bg-indigo-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-indigo-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-indigo-400 rounded-full"
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