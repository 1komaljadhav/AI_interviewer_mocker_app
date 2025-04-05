"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../utils/db';
import { MockInterview } from '../../../../utils/schema';
import { desc, eq } from 'drizzle-orm';
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
    const [interList, setInterList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user]); 

    const GetInterviewList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(MockInterview.id))

        setInterList(result);
    };

    // Function to delete an interview
    const handleDelete = async (mockId) => {
        try {
            await db.delete(MockInterview).where(eq(MockInterview.mockId, mockId));  // Delete from DB
            setInterList(interList.filter(interview => interview.mockId !== mockId)); // Update state
        } catch (error) {
            console.error("Error deleting interview:", error);
        }
    };

    return (
        <div>
            <h2 className='font-medium text-2xl text-blue-700'> Previous Mock Interviews </h2>
            <div className='grid gap-5 my-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                {interList && interList.map((interview, i) => (
                    <InterviewItemCard 
                        key={i} 
                        interview={interview} 
                        onDelete={handleDelete} 
                    />
                ))}
            </div>
        </div>
    );
}

export default InterviewList;
