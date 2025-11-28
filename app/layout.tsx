import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DisasterGuard AI - Safety & Fact Check',
  description: 'AI-powered disaster response assistant focusing on misinformation verification and safety guidance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                  },
                  colors: {
                    slate: {
                      850: '#1e293b',
                      900: '#0f172a',
                    },
                    brand: {
                      500: '#3b82f6',
                      600: '#2563eb',
                    },
                    alert: {
                      500: '#ef4444',
                      600: '#dc2626',
                    }
                  }
                }
              }
            }
          `
        }} />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-900 text-fuchsia-50 antialiased">
        {children}
      </body>
    </html>
  );
}