"use client";

import React, { useState, useEffect } from "react";
import { db } from "../../../../../../utils/db";
import { MockInterview } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import RecordAnsSection from "./_components/RecordAnsSection";
import QuestionSection from "./_components/QuestionSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const resolvedParams = React.use(params); // Unwrap the params Promise
  const interId = resolvedParams?.interviewId;

  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQue, setActiveQue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (interId) {
      GetInterviewDetails();
    }
  }, [interId]);

  const GetInterviewDetails = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interId));

      if (result.length === 0) {
        throw new Error("No interview data found.");
      }

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (err) {
      console.error("Error fetching interview details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  console.log("mockInterviewQuestion:", mockInterviewQuestion);
console.log("interviewQuestions:", mockInterviewQuestion?.interviewQuestions);
 const questionsArray = mockInterviewQuestion?.map(
    (item) => item.question
  ) || [];
  console.log("q a",questionsArray)

  const answerArray = mockInterviewQuestion?.map(
    (item) => item.answer
  ) || [];
  console.log("a a",answerArray)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-10">
        <QuestionSection
          questionsArray={questionsArray}
          activeQue={activeQue}
        />


        <RecordAnsSection questionsArray={questionsArray}
          activeQue={activeQue}
          interviewData={interviewData}
          answerArray={answerArray} />
      </div>

      <div className="flex mt-2 justify-end gap-6">
        {activeQue > 0 && <Button onClick={()=>setActiveQue(activeQue-1)}>Previous Question</Button>}
        {activeQue != questionsArray.length - 1 && <Button onClick={()=>setActiveQue(activeQue+1)}>Next Question</Button>}
        {activeQue == questionsArray.length - 1 &&
         <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
         <Button>End Interview</Button>
         </Link>
        }
        
      </div>
    </div>
  );
}

export default StartInterview;
