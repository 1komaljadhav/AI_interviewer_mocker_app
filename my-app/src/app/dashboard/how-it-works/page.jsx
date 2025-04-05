import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-8">
          How It Works
        </h2>
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <span className="text-4xl font-bold text-blue-500">1</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Add New Interview
              </h3>
              <p className="text-gray-600">
                Enter details such as job role, tech stack, and years of experience.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <span className="text-4xl font-bold text-blue-500">2</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Start Interview
              </h3>
              <p className="text-gray-600">
                Begin the interview with 5 AI Generated questions.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <span className="text-4xl font-bold text-blue-500">3</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Record Responses
              </h3>
              <p className="text-gray-600">
                Answer questions via webcam and microphone and start interview answer the questions.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <span className="text-4xl font-bold text-blue-500">4</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Feedback
              </h3>
              <p className="text-gray-600">
                Get detailed feedback and ratings based on your responses.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <span className="text-4xl font-bold text-blue-500">5</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Access Results
              </h3>
              <p className="text-gray-600">
                View and improve on your performance with AI-driven insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
