// src/app/dashboard/page.jsx
import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import 'tailwindcss/tailwind.css'
import InterviewList from './_components/InterviewList';

export default function DashboardPage() {
  return (
    <div className='mt-5 mx-20 '>
        <h2 className='font-bold text-2xl text-blue-700'>Dashboard</h2>
        <h2>Create and Start your AI Mockup Interview
        </h2>

        <div className='grid grid-cols-1'>
          <AddNewInterview/>
        </div>

      <InterviewList/>
    </div>
  );
}
