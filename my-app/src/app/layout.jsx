// src/app/layout.jsx
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';

export default function Layout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body style={{justifyContent:"center"}}>
          <main><Toaster />
          {children}</main>
        </body>
      </html>

    </ClerkProvider>
  );
}
