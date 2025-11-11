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
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
        marginBottom: '24px',
        justifyContent: message.isBot ? 'flex-start' : 'flex-end'
      }}
    >
      {message.isBot && (
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
          <Bot style={{ width: '20px', height: '20px', color: 'white' }} />
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 'min(320px, 80%)',
        alignItems: message.isBot ? 'flex-start' : 'flex-end'
      }}>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          style={{
            position: 'relative',
            padding: '14px 18px',
            fontSize: '15px',
            lineHeight: 1.6,
            boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)',
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.07))',
            ...(message.isBot ? {
              background: 'white',
              color: '#334155',
              borderRadius: '18px',
              borderBottomLeftRadius: '4px',
              border: '1px solid #e2e8f0'
            } : {
              background: 'linear-gradient(to right, #6366f1, #9333ea)',
              color: 'white',
              borderRadius: '18px',
              borderBottomRightRadius: '4px',
              border: 'none'
            })
          }}
        >
          {/* Texture overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '18px',
            ...(message.isBot ? {
              borderBottomLeftRadius: '4px',
              background: 'linear-gradient(to bottom right, rgba(248, 250, 252, 0.3), transparent)'
            } : {
              borderBottomRightRadius: '4px',
              background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), transparent)'
            })
          }} />

          <div style={{ position: 'relative', zIndex: 10 }}>
            {message.content.split('\n').map((line, index) => (
              <div key={index} style={{ marginTop: index > 0 ? '8px' : 0 }}>
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
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '14px'
            }}
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
                style={{
                  padding: '10px 18px',
                  fontSize: '14px',
                  fontWeight: 500,
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  color: '#334155',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.background = '#f8fafc';
                  target.style.borderColor = '#a5b4fc';
                  target.style.color = '#6366f1';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)';
                  target.style.borderColor = '#e2e8f0';
                  target.style.color = '#334155';
                }}
              >
                {button.label}
              </motion.button>
            ))}
          </motion.div>
        )}

        <span style={{
          fontSize: '12px',
          color: '#94a3b8',
          marginTop: '8px',
          padding: '0 4px'
        }}>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>

      {!message.isBot && (
        <div style={{
          flexShrink: 0,
          width: '40px',
          height: '40px',
          background: 'linear-gradient(to bottom right, #94a3b8, #64748b)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 16px -4px rgba(100, 116, 139, 0.4)',
          border: '2px solid white'
        }}>
          <User style={{ width: '20px', height: '20px', color: 'white' }} />
        </div>
      )}
    </motion.div>
  );
}
