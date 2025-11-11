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
    <div style={{
      padding: '24px 40px 28px',
      background: 'linear-gradient(to top, #f8fafc, white)',
      borderTop: '1px solid rgba(226, 232, 240, 0.6)'
    }}>
      <motion.form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          maxWidth: '900px',
          margin: '0 auto'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div style={{ flex: 1, position: 'relative' }}>
          <motion.div
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              transition: 'all 0.3s ease',
              ...(isFocused ? {
                boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2), 0 8px 20px -4px rgba(0, 0, 0, 0.1)'
              } : {
                boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.1)'
              })
            }}
            whileHover={{ scale: 1.005 }}
          >
            {/* Texture overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.6), transparent)',
              pointerEvents: 'none'
            }} />

            <input
              type={inputType}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              disabled={disabled}
              style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                padding: '14px 18px',
                background: 'transparent',
                border: '1px solid transparent',
                outline: 'none',
                color: '#334155',
                fontSize: '15px',
                ...(disabled && {
                  opacity: 0.5,
                  cursor: 'not-allowed'
                }),
                ...(isPassword && !showPassword && {
                  paddingRight: '52px'
                })
              }}
            />

            {isPassword && (
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={disabled}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#64748b',
                  background: 'none',
                  border: 'none',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  zIndex: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  transition: 'color 0.2s ease'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={(e) => {
                  if (!disabled) {
                    (e.currentTarget as HTMLButtonElement).style.color = '#334155';
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = '#64748b';
                }}
              >
                {showPassword ? (
                  <EyeOff style={{ width: '20px', height: '20px' }} />
                ) : (
                  <Eye style={{ width: '20px', height: '20px' }} />
                )}
              </motion.button>
            )}
          </motion.div>
        </div>

        <motion.button
          type="submit"
          disabled={!input.trim() || disabled}
          whileHover={input.trim() ? {
            scale: 1.03,
            boxShadow: "0 8px 20px -5px rgba(99, 102, 241, 0.4)"
          } : {}}
          whileTap={{ scale: 0.97 }}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '16px',
            border: 'none',
            cursor: (input.trim() && !disabled) ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            boxShadow: input.trim() ? '0 8px 20px -6px rgba(99, 102, 241, 0.3)' : 'none',
            filter: input.trim() ? 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' : 'none',
            ...(input.trim() && !disabled ? {
              background: 'linear-gradient(to right, #6366f1, #9333ea)',
              color: 'white'
            } : {
              background: 'linear-gradient(to right, #cbd5e1, #94a3b8)',
              color: '#64748b'
            })
          }}
        >
          {/* Texture */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.2), transparent)'
          }} />

          <div style={{ position: 'relative', zIndex: 10 }}>
            {input.trim() ? (
              <Send style={{ width: '20px', height: '20px' }} />
            ) : (
              <Sparkles style={{ width: '20px', height: '20px' }} />
            )}
          </div>
        </motion.button>
      </motion.form>

      {/* Hint text */}
      <motion.p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#94a3b8',
          marginTop: '12px',
          maxWidth: '900px',
          margin: '12px auto 0'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Press Enter to send • Your information is secure and encrypted
      </motion.p>
    </div>
  );
}
