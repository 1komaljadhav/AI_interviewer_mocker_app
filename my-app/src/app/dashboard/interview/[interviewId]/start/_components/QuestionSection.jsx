import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionSection({ questionsArray, activeQue }) {
  console.log(questionsArray)
  const noteMessage =
    "Click on Record Answer when you want to answer the question. At the end of the interview we will give you feedback along with the correct answer for each question and your answer to compare it.";

  // Safely accessing the current question based on the active index
  const currentQuestion = questionsArray[activeQue] || null;

  const textToSpeach=(text)=>{
if('speechSynthesis' in Window){
  const speech=new SpeechSynthesisUtterance(text)
  window.speechSynthesis.speak(speech)
}
else
{
  alert("Sorry...")
}

  }
  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="gap-5 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
        {questionsArray.map((q, i) => (
          <h2
            className={`p-2 bg-purple-300  cursor-pointer text-xs text-center bg-secondary rounded-full border-2 border-gray-500 
              ${i === activeQue ? 'bg-white text-bold text-2xl  border-purple-500 text-purple-600' : ''}`}
            key={i}
          >
            Question #{i + 1}
          </h2>
        ))}
      </div>



      <h2 className="my-5 text-lg">
        {currentQuestion || 'No question available'}
      </h2>

      <Volume2 onClick={()=>textToSpeach(currentQuestion)}/>

      <div className="border bg-blue-100 rounded-lg p-5 mt-10">
        <h2 className="text-blue-700 flex gap-2 items-center">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-blue-900">{noteMessage}</h2>
      </div>
    </div>
  );
}

export default QuestionSection;
