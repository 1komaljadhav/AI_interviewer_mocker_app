// src/app/dashboard/layout.jsx
import React from 'react';
import Header from './_components/Header';

export default function DashboardLayout({ children }) {
  return (
    <div >
        <Header/>
        <div className='mx-5 '>
        {children}
        </div>
      
    </div>
  );
}
