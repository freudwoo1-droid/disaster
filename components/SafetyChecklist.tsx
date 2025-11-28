'use client';

import React from 'react';
import { ShieldAlert, ScanEye, Type, Copy, UserX, Info } from 'lucide-react';
import { FAKE_MEDIA_CHECKLIST } from '../constants';

const iconMap: Record<string, React.ReactNode> = {
  AlertTriangle: <ShieldAlert className="text-orange-400" size={24} />,
  UserX: <UserX className="text-red-400" size={24} />,
  Type: <Type className="text-blue-400" size={24} />,
  Copy: <Copy className="text-purple-400" size={24} />,
  ShieldCheck: <ScanEye className="text-green-400" size={24} />,
};

export const SafetyChecklist: React.FC = () => {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <div className="bg-slate-900/50 p-4 border-b border-slate-700 flex items-center gap-2">
        <ShieldAlert className="text-brand-500" />
        <h3 className="font-semibold text-white">가짜 정보 & AI 영상 식별 체크리스트</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="bg-blue-900/20 border border-blue-800/50 p-3 rounded-lg flex gap-3">
          <Info className="text-blue-400 shrink-0" size={20} />
          <p className="text-sm text-blue-200">
            소셜 미디어의 자극적인 영상은 AI로 조작되었을 가능성이 높습니다. 공유 전 반드시 확인하세요.
          </p>
        </div>
        
        <div className="grid gap-3">
          {FAKE_MEDIA_CHECKLIST.map((item) => (
            <div key={item.id} className="bg-slate-700/30 p-4 rounded-lg hover:bg-slate-700/50 transition-colors border border-slate-700/50">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-800 rounded-lg shrink-0">
                  {iconMap[item.icon] || <ShieldAlert size={24} />}
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};