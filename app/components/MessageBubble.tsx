'use client';

import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
  onButtonClick?: (value: string) => void;
}

export default function MessageBubble({ message, onButtonClick }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex items-end gap-2 sm:gap-3 mb-4 sm:mb-6 ${
        message.isBot ? 'justify-start' : 'justify-end'
      }`}
    >
      {message.isBot && (
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
      )}
      
      <div className={`flex flex-col max-w-[240px] sm:max-w-[280px] lg:max-w-sm ${
        message.isBot ? 'items-start' : 'items-end'
      }`}>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className={`relative px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base leading-relaxed shadow-lg ${
            message.isBot
              ? 'bg-white text-slate-700 rounded-2xl rounded-bl-md border border-slate-200'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl rounded-br-md'
          }`}
          style={{
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.07))'
          }}
        >
          {/* Paper-like texture */}
          <div className={`absolute inset-0 rounded-2xl ${message.isBot ? 'rounded-bl-md' : 'rounded-br-md'} ${
            message.isBot 
              ? 'bg-gradient-to-br from-slate-50/30 to-transparent' 
              : 'bg-gradient-to-br from-white/10 to-transparent'
          }`} />
          
          <div className="relative z-10">
            {message.content.split('\n').map((line, index) => (
              <div key={index} className={index > 0 ? 'mt-2' : ''}>
                {line}
              </div>
            ))}
          </div>
        </motion.div>
        
        {message.buttons && message.buttons.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-wrap gap-2 mt-3 sm:mt-4"
          >
            {message.buttons.map((button, index) => (
              <motion.button
                key={button.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.3 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 25px -5px rgba(79, 70, 229, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onButtonClick?.(button.value)}
                className="px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg active:shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
                }}
              >
                {button.label}
              </motion.button>
            ))}
          </motion.div>
        )}
        
        <span className="text-xs text-slate-500 mt-2 px-1">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
      
      {!message.isBot && (
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
      )}
    </motion.div>
  );
}