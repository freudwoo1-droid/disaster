'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertTriangle } from 'lucide-react';
import { ChatMessage } from '../types';
import { getDisasterGuidanceAction } from '../app/actions';

export const DisasterChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'ai',
      text: '안녕하십니까. 현지 재난대응 전문가 AI입니다.\n\n현재 확인되지 않은 정보나 영상으로 인해 불안감을 느끼고 계신가요?\n\n제가 정보의 진위를 검증하고, 안전한 행동 요령을 안내해 드리겠습니다. 의심되는 정보나 현재 상황을 말씀해 주세요.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Call Server Action instead of client-side service
      const responseText = await getDisasterGuidanceAction(userMsg.text);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
      <div className="bg-slate-900/80 p-4 border-b border-slate-700 backdrop-blur-sm flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white">Disaster Response AI</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-green-400 font-medium">Real-time Active</span>
            </div>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full flex items-center gap-2">
            <AlertTriangle size={14} className="text-red-400" />
            <span className="text-xs text-red-300 font-semibold">Emergency Mode</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-800/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-slate-600' : 'bg-brand-600'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-slate-600 text-white rounded-tr-none' 
                  : 'bg-slate-700 text-gray-100 rounded-tl-none border border-slate-600'
              }`}>
                <div className="prose prose-invert text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>
                <div className="mt-2 text-[10px] opacity-50 flex justify-end">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 rounded-2xl rounded-tl-none p-4 border border-slate-600 flex items-center gap-3">
              <Loader2 size={18} className="animate-spin text-brand-400" />
              <span className="text-sm text-gray-400">정보를 분석하고 있습니다...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="예: 이 영상이 진짜인가요? / 대피소는 어디로 가야 하나요?"
            className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-center text-xs text-slate-500 mt-2">
            AI는 실수가 있을 수 있습니다. 중요한 결정은 반드시 공식 채널을 재확인하세요.
        </p>
      </div>
    </div>
  );
};