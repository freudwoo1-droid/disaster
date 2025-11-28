import React from 'react';
import { DisasterChat } from './components/DisasterChat';
import { SafetyChecklist } from './components/SafetyChecklist';
import { Siren, ExternalLink } from 'lucide-react';
import { EMERGENCY_CONTACTS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans selection:bg-brand-500/30 pb-12">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-brand-600 to-slate-800 rounded-lg flex items-center justify-center shadow-lg border border-brand-500/20">
              <Siren size={24} className="text-white" />
            </div>
            <div>
                <h1 className="font-bold text-xl tracking-tight text-white leading-none">
                DisasterGuard AI
                </h1>
                <span className="text-xs text-slate-400 font-medium">재난 정보 검증 및 안전 가이드</span>
            </div>
          </div>
          <a 
            href="https://www.safekorea.go.kr" 
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors bg-brand-500/10 px-3 py-1.5 rounded-full border border-brand-500/20"
          >
            공식 재난안전포털 바로가기 <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Intro Banner */}
        <div className="mb-8 bg-gradient-to-r from-red-900/40 to-slate-900 border border-red-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2">현재 재난 상황이 발생했습니까?</h2>
                <p className="text-red-200 max-w-2xl text-lg">
                    확인되지 않은 정보와 AI 조작 영상이 유포되고 있을 수 있습니다.<br/>
                    정보 공유 전, 반드시 <strong>DisasterGuard AI</strong>를 통해 진위를 확인하고 안전 행동 수칙을 따르십시오.
                </p>
            </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: Chat Interface */}
          <div className="lg:col-span-7 xl:col-span-8">
            <DisasterChat />
          </div>

          {/* Right Column: Info & Checklist */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            
            {/* Checklist Component */}
            <SafetyChecklist />

            {/* Official Channels */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">공식 긴급 연락처</h3>
              <div className="space-y-3">
                {EMERGENCY_CONTACTS.map((contact) => (
                  <a 
                    key={contact.name}
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-all border border-slate-600 hover:border-brand-500/50"
                  >
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-white group-hover:text-brand-400 transition-colors">{contact.name}</span>
                        <ExternalLink size={14} className="text-slate-500 group-hover:text-brand-400" />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{contact.description}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                <p className="text-xs text-slate-500">
                    본 서비스는 AI 기술을 활용하며, 실제 정부 공식 대응과 시차가 있을 수 있습니다.<br/>
                    긴급 상황 시 반드시 <strong>119</strong> 또는 <strong>112</strong>에 우선 신고하십시오.
                </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;