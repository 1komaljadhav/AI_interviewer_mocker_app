const mockInterviewQuestions = {
    interviewQuestions: [
      {
        question: 'Considering your experience in [lkj], how did you approach the problem, and what was the outcome?',
        answer: 'This requires a tailored response based on the candidate’s success and lessons learned.',
      },
      {
        question: 'The job description for [jh] mentions a specific skill. Can you provide an example?',
        answer: "Again, this needs to be tailored to the candidate's past experience.",
      },
    ],
  };
  
  const questions = mockInterviewQuestions?.interviewQuestions || []; // Safely access the array
  
  if (questions.length > 0) {
    questions.forEach((item, index) => {
      console.log(`Question ${index + 1}: ${item.question}`);
      console.log(`Answer: ${item.answer}`);
    });
  } else {
    console.log("No questions available.");
  }
  