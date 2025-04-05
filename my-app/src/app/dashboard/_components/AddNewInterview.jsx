"use client";
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { chatSession } from "../../../../utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { v4 as uuidv4 } from 'uuid';
import 'tailwindcss/tailwind.css'

import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [jobPosition, setjobPosition] = useState("");
  const [jobDesc, setjobDesc] = useState("");
  const [jobExper, setjobExper] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResp, setjsonResp] = useState([]);
  const { user } = useUser()
const router=useRouter(); 


  const onSubmit = async (event) => {
    setLoading(true)
    event.preventDefault(); // Prevent page reload on submit
    console.log(jobPosition, jobDesc, jobExper);
    const InputPrompt = "Job position:" + jobPosition + ", Job description: " + jobDesc + " , Years of experience : " + jobExper + " , depends on job position,job experience and years of experience give us 5 interview question along with answer in json format, give us question and answer field on json"
    const result = await chatSession.sendMessage(InputPrompt)

    const MockJsonResp = (result.response.text()).replace('```json', ' ').replace('```', ' ');
    console.log(JSON.parse(MockJsonResp));
    setjsonResp(MockJsonResp)

    if (MockJsonResp) {
      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(), // Corrected syntax: Replace semicolon with a comma
        jsonMockResp: MockJsonResp,
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExper: jobExper, // Ensure correct spelling if "jobExper" is a typo
        createdBy: user?.primaryEmailAddress?.emailAddress, // Added missing comma
         createdAt: new Date()
        // Corrected date format casing
      }).returning({ mockId: MockInterview.mockId });

      console.log("inserted id", resp)
      if(resp)
      {
        setOpenDialog(false)
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      }
    }
    else {
      console.log("error")
    }
    setLoading(false)

  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Avoid server-client mismatch

  return (
    <div>
      <div
        className="w-80 h-32 my-5 p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md transition-all cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h5 className="text-lg text-center">+ Add New</h5>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <span>Add details about your job position/role, job description, and years of experience.</span>
          </DialogDescription>
          <form onSubmit={onSubmit}>
            <div>
              <div className="mt-7">
                <label className="block mb-1" >Job Position</label>
                <Input
                  className="my-2"
                  placeholder="e.g., Full Stack Developer" required
                  onChange={(event) => setjobPosition(event.target.value)}
                />
              </div>

              <div className="my-3">
                <label className="block mb-1">Job Description / Tech Stack</label>
                <Textarea
                  className="my-2"
                  placeholder="e.g., React, Node.js" required
                  onChange={(event) => setjobDesc(event.target.value)}
                />
              </div>

              <div className="my-3">
                <label className="block mb-1">Years of Experience</label>
                <Input
                  className="my-2"
                  placeholder="e.g., 5"
                  type="number"
                  max="40"
                  required
                  onChange={(event) => setjobExper(event.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-6 justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-700 text-white" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Generating form AI
                  </>
                ) : (
                  'Start Interview'
                )}
              </Button>

            </div>
          </form>



        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
