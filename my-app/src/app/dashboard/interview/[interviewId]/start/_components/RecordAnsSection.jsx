"use client";

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { chatSession } from "../../../../../../../utils/GeminiAIModel";
import { db } from "../../../../../../../utils/db";
import { UserAnswer } from "../../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnsSection({ questionsArray, activeQue, interviewData, answerArray }) {
  const [userAnswer, setuserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setloading] = useState(false);
 
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    setResults,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Toggle Recording
  const StartStopRecording = () => {
    if (isRecording) {
      console.log("Stopping recording...");
      stopSpeechToText();
    } else {
      console.log("Starting recording...");
      startSpeechToText();
    }
  };

  // Update `userAnswer` when results change
  useEffect(() => {
    if (results.length > 0) {
      const concatenatedResult = results.map((result) => result.transcript).join(" ");
      console.log("Updated userAnswer:", concatenatedResult);
      setuserAnswer(concatenatedResult);
    }
  }, [results]);

  // Update User Answer in the Database
  const UpdateUserAns = async () => {
    try {
      if (!userAnswer.trim()) {
        toast.error("User Answer cannot be empty.");
        return;
      }

      console.log("Processing userAnswer for feedback...");
      setloading(true);

      const feedbackPrompt = `
        Question: ${questionsArray[activeQue]},
        User Answer: ${userAnswer}.
        Provide feedback in JSON format with fields 'rating' and 'feedback'.
      `;

      const result = await chatSession.sendMessage(feedbackPrompt);
      console.log("Feedback result:", result); // Check result before accessing `response.text()`.
      
      const responseText = await result.response.text();
      const mockJsonRep = responseText.replace(/```json|```/g, "");
      console.log("Interview Data:", );
      console.log("Mock ID:", interviewData?.mockId);
      
      let jsonFeedback;
      try {
        jsonFeedback = JSON.parse(mockJsonRep);
      } catch (error) {
        console.error("Error parsing feedback JSON:", error);
        toast.error("Failed to parse feedback. Please try again.");
        setloading(false);
        return;
      }

      const feedbackData = {
        mockIdRef: interviewData?.mockId,
        question: questionsArray[activeQue],
        correctAns: answerArray[activeQue],
        userAns: userAnswer,
        feedback: jsonFeedback.feedback || "No feedback provided.",
        rating: jsonFeedback.rating || 0,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD"),
      };

      console.log("Feedback data prepared:", feedbackData);

      const resp = await db.insert(UserAnswer).values(feedbackData);
console.log("Insert Response:", resp);

      if (resp) {
        toast.success("Answer recorded successfully!");
        setuserAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.error("Error in UpdateUserAns:", error.message);
      toast.error("Failed to record the answer. Please try again.");
    } finally {
      setloading(false);
      setResults([]);
    }
  };

  // Debounce UpdateUserAns to avoid frequent API calls
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (!isRecording && userAnswer.length > 10) {
        UpdateUserAns();
      }
    }, 1000); // 1-second debounce
    return () => clearTimeout(debounceTimer);
  }, [userAnswer, isRecording]);
  console.log("UpdateUserAns triggered:", { userAnswer });

  return (
    <div className="h-60">
      <div className="mt-10 mb-1 p-2 flex flex-col justify-center items-center border rounded-lg bg-slate-100">
        {/* Placeholder Image */}
        <img
          src="/p.png"
          alt="Placeholder"
          width={200}
          height={200}
          className="absolute my-auto mx-auto"
        />

        {/* Webcam */}
        <Webcam
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
            transform: "scaleX(-1)", // Mirror the webcam feed
          }}
        />
      </div>

      <div className="justify-end">
        <button
          disabled={loading}
          className="bg-blue-500 rounded-lg p-2 mt-5 text-white"
          onClick={StartStopRecording}
        >
          {isRecording ? "Stop Recording" : "Record Answer"}
        </button>
      </div>
    </div>
  );
}

export default RecordAnsSection;
