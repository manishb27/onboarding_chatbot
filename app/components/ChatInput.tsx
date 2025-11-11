'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Eye, EyeOff, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  isPassword?: boolean;
  disabled?: boolean;
}

export default function ChatInput({ 
  onSendMessage, 
  placeholder = "Type your message...", 
  isPassword = false,
  disabled = false 
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
      setShowPassword(false);
    }
  };

  const inputType = isPassword && !showPassword ? 'password' : 'text';

  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-t from-slate-50 to-white border-t border-slate-200/60">
      <motion.form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 sm:gap-3 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex-1 relative">
          <motion.div
            className={`relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-300 ${
              isFocused 
                ? 'ring-2 ring-indigo-400 ring-opacity-50 shadow-lg' 
                : 'shadow-md hover:shadow-lg'
            }`}
            whileHover={{ scale: 1.005 }}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            }}
          >
            {/* Paper texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
            
            <input
              type={inputType}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              disabled={disabled}
              className={`relative z-10 w-full px-3 py-3 sm:px-4 sm:py-4 bg-transparent border-0 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 placeholder-slate-400 text-sm sm:text-base ${
                isPassword && !showPassword ? 'pr-12 sm:pr-14' : 'pr-3 sm:pr-4'
              }`}
            />
            
            {isPassword && (
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors z-20"
                disabled={disabled}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </motion.button>
            )}
          </motion.div>
        </div>
        
        <motion.button
          type="submit"
          disabled={!input.trim() || disabled}
          whileHover={{ 
            scale: input.trim() ? 1.03 : 1,
            boxShadow: input.trim() ? "0 8px 20px -5px rgba(99, 102, 241, 0.4)" : undefined
          }}
          whileTap={{ scale: 0.97 }}
          className={`relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg ${
            input.trim() && !disabled
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-indigo-500/25'
              : 'bg-gradient-to-r from-slate-300 to-slate-400 text-slate-500 cursor-not-allowed'
          }`}
          style={{
            filter: input.trim() ? 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' : 'none'
          }}
        >
          {/* Paper texture */}
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
          
          <div className="relative z-10">
            {input.trim() ? (
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </div>
        </motion.button>
      </motion.form>
      
      {/* Subtle hint text */}
      <motion.p 
        className="text-center text-xs text-slate-400 mt-2 sm:mt-3 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Press Enter to send • Your information is secure and encrypted
      </motion.p>
    </div>
  );
}