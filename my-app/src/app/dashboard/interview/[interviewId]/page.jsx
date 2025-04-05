"use client";
import React, { useEffect, useState } from "react";
import { MockInterview } from "../../../../../utils/schema";
import { db } from "../../../../../utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation"; // Import useParams from next/navigation

function Interview() {
    const [interviewData, setInterviewData] = useState(null);
    const [webcamEnabled, setWebcamEnabled] = useState(false);

    // Directly use useParams to get the interviewId
    const { interviewId } = useParams();  // Correct way to use useParams

    // Fetch interview details when interviewId is available
    useEffect(() => {
        if (interviewId) {
            const getInterviewDetails = async () => {
                try {
                    const result = await db
                        .select()
                        .from(MockInterview)
                        .where(eq(MockInterview.mockId, interviewId));
                    setInterviewData(result[0]);
                } catch (error) {
                    console.error("Failed to fetch interview details:", error);
                    setInterviewData(null);
                }
            };

            getInterviewDetails();
        }
    }, [interviewId]);

    // Render loading fallback if data is not yet available
    if (!interviewData) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="my-10 flex flex-col items-center">
            <h2 className="p-5 font-bold text-2xl">Let's Get Started</h2>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 w-full px-5 max-w-5xl">
                {/* Job Information Section */}
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-col p-5 rounded-lg border">
                        <h2 className="text-lg">
                            <strong>Job Role / Position: </strong> {interviewData.jobPosition || "NA"}
                        </h2>
                        <h2 className="text-lg">
                            <strong>Job Description / Tech Stack: </strong> {interviewData.jobDesc || "NA"}
                        </h2>
                        <h2 className="text-lg">
                            <strong>Years of Experience: </strong> {interviewData.jobExper || "NA"}
                        </h2>
                    </div>

                    <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                        <h2 className="flex text-yellow-500 gap-2 items-center">
                            <Lightbulb />
                            <strong>Information</strong>
                        </h2>
                        <h2 className="mt-3 text-yellow-500">
                            {process.env.NEXT_PUBLIC_INFO || "No additional information available."}
                        </h2>
                    </div>
                </div>

                {/* Webcam Section */}
                <div className="flex flex-col items-center">
                    {webcamEnabled ? (
                        <Webcam
                            mirrored={true}
                            onUserMedia={() => setWebcamEnabled(true)}
                            onUserMediaError={() => setWebcamEnabled(false)}
                            style={{ height: 300, width: 300 }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className="h-72 w-full p-20 rounded-lg border bg-slate-100" />
                            <Button
                                className="mx-5 my-5 p-5 border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white"
                                onClick={() => setWebcamEnabled(true)}
                            >
                                Enable Webcam and Microphone
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-end items-end">
                <Link href={`/dashboard/interview/${interviewId}/start`}>
                    <Button className="p-5 text-lg bg-sky-200 text-sky-600">Start Interview</Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview;
