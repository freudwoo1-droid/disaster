export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface EmergencyContact {
  name: string;
  description: string;
  url?: string;
}