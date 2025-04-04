import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';  // Import Close Icon
import { useRouter } from 'next/navigation';
import React from 'react';

function InterviewItemCard({ interview, onDelete }) {
    // Format the date to a readable string
    const formattedDate = interview?.createdAt
        ? new Date(interview.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'N/A';

    const router = useRouter();

    // Navigate to the interview dashboard
    const onStart = () => {
        if (interview?.mockId) {
            router.push(`/dashboard/interview/${interview?.mockId}`);
        } else {
            console.error("Invalid mockId: Cannot navigate to the interview page.");
        }
    };

    const onFeedback = () => {
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
    };

    return (
        <div className="relative border w-80 shadow-sm rounded-lg p-5">
            {/* Close Button */}
            <button 
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600" 
                onClick={() => onDelete(interview.mockId)}
            >
                <X size={18} />
            </button>

            <h2 className="font-bold text-blue-600 p-2">
                {interview?.jobPosition}
            </h2>
            <h2 className="text-sm text-gray-500">
                {interview?.jobExperience} Years of Experience
            </h2>
            <h2 className="text-xs text-gray-400">
                Created At: {formattedDate}
            </h2>

            <div className="flex justify-between mt-2 gap-5">
                <Button onClick={onFeedback} size="sm" className="w-full" variant="outline">
                    Feedback
                </Button>
                <Button size="sm" onClick={onStart} className="w-full bg-blue-700 text-white p-2">
                    Start
                </Button>
            </div>
        </div>
    );
}

export default InterviewItemCard;
