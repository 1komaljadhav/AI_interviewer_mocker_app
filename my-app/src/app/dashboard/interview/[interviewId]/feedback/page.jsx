"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../../../../../utils/db';
import { eq } from 'drizzle-orm';
import { UserAnswer } from '../../../../../../utils/schema';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';

function Page() {
    const { interviewId } = useParams();  // Using useParams from next/router
    const router = useRouter();

    console.log("InterId:", interviewId); // Debug: Check if interviewId is available

    const [feedbackList, setFeedbackList] = useState([]);
    const [overallRating, setOverallRating] = useState(0);

    useEffect(() => {
        if (interviewId) {
            GetFeedback();
        } else {
            console.error("Interview ID is missing or invalid.");
        }
    }, [interviewId]);  // Run GetFeedback whenever interviewId changes

    const GetFeedback = async () => {
        try {
            console.log("Fetching feedback for interviewId:", interviewId);

            if (!interviewId) {
                console.error("Invalid or missing interviewId:", interviewId);
                return;
            }
            console.log("SQl q", UserAnswer.mockIdRef)
            // Construct the query
            const result = await db
                .select()
                .from(UserAnswer)
                .where(eq(UserAnswer.mockIdRef, interviewId))
                .orderBy(UserAnswer.id);

            console.log("Query Result:", result);
            
            if (result && result.length > 0) {
                setFeedbackList(result);

              
              setOverallRating(7);  // Set the total rating
              
            } else {
                console.warn("No data found for the given interviewId");
            }
        } catch (error) {
            console.error("Error in GetFeedback:", error.message);
        }
    };

    return (
        <div className='p-10 mx-20'>
            {feedbackList?.length === 0 ? (
                <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Available</h2>
            ) : (
                <>
                    <h2 className='text-3xl font-bold text-indigo-800'>Congratulations!</h2>
                    <h2 className='text-2xl'>Here is your interview feedback...</h2>
                    <h2 className='text-blue-500 text-lg my-3'>
                        Your overall interview rating: <strong>{overallRating}/10</strong>
                    </h2>
                    <h2 className='text-sm text-gray-400'>
                        Below are the interview questions, your answers, and feedback for improvement:
                    </h2>
                    {feedbackList.map((item, i) => (
                        <Collapsible key={i} className='mt-7'>
                            <CollapsibleTrigger className='w-full gap-7  flex justify-between text-left p-2 bg-slate-100 my-2 border rounded-lg'>
                                {item.question} <ChevronsUpDownIcon className='h-5 w-5' />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='text-red-500 p-2 border rounded-lg'>
                                        <strong>Rating:</strong> {item.rating}
                                    </h2>
                                    <h2 className='p-2 border rounded-lg bg-lime-100 text-sm'>
                                        <strong>Your Answer :</strong> {item.userAns}
                                    </h2>
                                    <h2 className='p-2 border rounded-lg bg-red-100 text-sm'>
                                        <strong>Correct Answer :</strong> {item.correctAns}
                                    </h2>
                                    <h2 className='p-2 border rounded-lg bg-violet-100 text-sm'>
                                        <strong>Feedback :</strong> {item.feedback}
                                    </h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>
            )}

            <Button className="bg-blue-800 justify-end text-white p-3 mt-5" onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
    );
}

export default Page;
