
// import { useState, useEffect } from "react";
// import { getQuestions } from "../geminiService";

// function Quiz({ exam, subject, topic }) {
//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [showExplanation, setShowExplanation] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [answers, setAnswers] = useState([]);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [time, setTime] = useState(0); // timer in seconds

//   // Fetch questions
//   useEffect(() => {
//     async function fetchQuestions() {
//       setLoading(true);
//       const q = await getQuestions(exam, subject, topic);
//       setQuestions(q);
//       setLoading(false);
//     }
//     fetchQuestions();
//   }, [exam, subject, topic]);

//   // Timer
//   useEffect(() => {
//     if (quizCompleted) return; // stop timer at quiz end
//     const interval = setInterval(() => setTime(prev => prev + 1), 1000);
//     return () => clearInterval(interval);
//   }, [quizCompleted]);

//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">⏳ Loading questions...</div>;
//   }

//   if (questions.length === 0) {
//     return <div className="flex items-center justify-center h-screen text-red-600">❌ No questions generated</div>;
//   }

//   const q = questions[current];

//   const handleAnswer = (opt) => {
//     setSelected(opt);
//     setAnswers(prev => [...prev, { question: q.question, isCorrect: opt === q.answer }]);
//   };

//   const handleNext = () => {
//     setSelected(null);
//     setShowExplanation(false);
//     if (current < questions.length - 1) {
//       setCurrent(prev => prev + 1);
//     } else {
//       setQuizCompleted(true);
//     }
//   };

//   if (quizCompleted) {
//     const total = answers.length;
//     const correct = answers.filter(a => a.isCorrect).length;
//     const accuracy = ((correct / total) * 100).toFixed(2);

//     const formatTime = (t) => {
//       const mins = Math.floor(t / 60);
//       const secs = t % 60;
//       return `${mins}m ${secs}s`;
//     };

//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
//         <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl text-center">
//           <h2 className="text-2xl font-bold mb-4">🎉 Quiz Completed!</h2>
//           <p className="mb-2">Total Questions: {total}</p>
//           <p className="mb-2 text-green-600">Correct: {correct}</p>
//           <p className="mb-2 text-red-600">Wrong: {total - correct}</p>
//           <p className="mb-2">Accuracy: {accuracy}%</p>
//           <p className="mb-4">Time Taken: {formatTime(time)}</p>
//           <button
//             onClick={() => {
//               setCurrent(0);
//               setSelected(null);
//               setShowExplanation(false);
//               setAnswers([]);
//               setQuizCompleted(false);
//               setTime(0);
//             }}
//             className="px-6 py-3 bg-indigo-600 text-white rounded-xl mt-4"
//           >
//             Restart Quiz
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Progress percentage
//   const progress = ((current + 1) / questions.length) * 100;

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
//       <div className="w-full max-w-xl">
//         {/* Progress Bar */}
//         <div className="h-3 bg-gray-300 rounded-full mb-4 overflow-hidden">
//           <div
//             className="h-full bg-indigo-600 transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           />
//         </div>

//         {/* Timer */}
//         <p className="text-right text-gray-600 mb-2">Time: {Math.floor(time / 60)}m {time % 60}s</p>

//         {/* Question Card */}
//         <div className="bg-white shadow-lg rounded-2xl p-6">
//           <h2 className="text-xl font-bold mb-4">
//             Q{current + 1}. {q.question}
//           </h2>

//           <div className="space-y-3">
//             {q.options.map((opt, i) => (
//               <button
//                 key={i}
//                 onClick={() => handleAnswer(opt)}
//                 className={`w-full px-4 py-2 rounded-xl border 
//                   ${selected === opt
//                     ? opt === q.answer
//                       ? "bg-green-500 text-white"
//                       : "bg-red-500 text-white"
//                     : "hover:bg-gray-100"
//                   }`}
//               >
//                 {opt}
//               </button>
//             ))}
//           </div>

//           {selected && (
//             <button
//               onClick={() => setShowExplanation(true)}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl"
//             >
//               Show Explanation
//             </button>
//           )}

//           {showExplanation && (
//             <p className="mt-4 p-3 bg-yellow-100 rounded-lg">{q.explanation}</p>
//           )}

//           {selected && (
//             <button
//               onClick={handleNext}
//               className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-xl"
//             >
//               {current < questions.length - 1 ? "Next Question →" : "Finish Quiz"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Quiz;

import { useState, useEffect } from "react";
import { getQuestions } from "../geminiService";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

function Quiz({ exam, subject, topic }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [skipped, setSkipped] = useState([]);
  const [reviewingSkipped, setReviewingSkipped] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [time, setTime] = useState(0);

  // Fetch questions
  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      const q = await getQuestions(exam, subject, topic);
      setQuestions(q);
      setLoading(false);
    }
    fetchQuestions();
  }, [exam, subject, topic]);

  // Timer
  useEffect(() => {
    if (quizCompleted) return;
    const interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [quizCompleted]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        ⏳ Loading questions...
      </div>
    );
  if (questions.length === 0)
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        ❌ No questions generated
      </div>
    );

  const q = questions[current];

  const handleAnswer = (opt) => {
    setSelected(opt);
    setAnswers((prev) => [
      ...prev,
      { question: q.question, isCorrect: opt === q.answer },
    ]);
    if (skipped.includes(current))
      setSkipped(skipped.filter((i) => i !== current));
  };

  const handleNext = () => {
    setSelected(null);
    setShowExplanation(false);
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else if (skipped.length > 0 && !reviewingSkipped) {
      setReviewingSkipped(true);
      setCurrent(skipped[0]);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleSkip = () => {
    if (!skipped.includes(current)) setSkipped((prev) => [...prev, current]);
    handleNext();
  };

  // --- Fixed calculator function ---
  const calculateScore = () => {
    return answers.filter((a) => a.isCorrect).length;
  };

  // --- Fixed finish quiz saver ---
  const handleFinishQuiz = async () => {
  const score = answers.filter(a => a.isCorrect).length; // calculateScore

  try {
    const token = localStorage.getItem("token"); // JWT stored in localStorage

    await axios.post(
      "https://ssc-backend-c1qi.onrender.com/api/quiz/save", // matches your quizRoutes
      {
        examType: exam,       // from prop
        subject: subject,     // from prop
        topic: topic,         // from prop
        questions: questions, // full array of question objects
        score,                // calculated score
        total: questions.length // total questions
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Quiz result saved!");
  } catch (error) {
    console.error("Error saving quiz result:", error);
    alert("Failed to save quiz result");
  }
};


  if (quizCompleted) {
    const total = answers.length + skipped.length;
    const correct = calculateScore();
    const wrong = answers.filter((a) => !a.isCorrect).length;
    const skippedCount = skipped.length;
    const accuracy = ((correct / total) * 100).toFixed(2);

    const data = [
      { name: "Correct", value: correct },
      { name: "Wrong", value: wrong },
      { name: "Skipped", value: skippedCount },
    ];
    const COLORS = ["#4ade80", "#f87171", "#facc15"]; // green, red, yellow

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-700 p-6">
        <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-xl text-center">
          <h2 className="text-2xl font-bold mb-4">🎉 Quiz Completed!</h2>
          <p className="mb-2">Total Questions: {total}</p>
          <p className="mb-2 text-green-600">Correct: {correct}</p>
          <p className="mb-2 text-red-600">Wrong: {wrong}</p>
          <p className="mb-2 text-yellow-600">Skipped: {skippedCount}</p>
          <p className="mb-2">Accuracy: {accuracy}%</p>
          <p className="mb-4">
            Time Taken: {Math.floor(time / 60)}m {time % 60}s
          </p>

          {/* Pie Chart */}
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <button
            onClick={handleFinishQuiz}
            className="px-6 py-3 bg-green-600 text-white rounded-xl mt-4"
          >
            Save Result
          </button>

          <button
            onClick={() => {
              setCurrent(0);
              setSelected(null);
              setShowExplanation(false);
              setAnswers([]);
              setSkipped([]);
              setQuizCompleted(false);
              setTime(0);
              setReviewingSkipped(false);
            }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl mt-4"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center shadow-lb justify-center h-screen bg-gray-800 p-6">
      <div className="w-full max-w-xl">
        {/* Progress Bar */}
        <div className="h-3 bg-gray-300 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-pink-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Timer */}
        <p className="text-right text-gray-200 mb-2">
          Time: {Math.floor(time / 60)}m {time % 60}s
        </p>

        {/* Question Card */}
        <div className="bg-gray-900 shadow-lg rounded-2xl p-6">
          <h2 className="text-xl text-gray-200 font-bold mb-4">
            Q{current + 1}. {q.question}
          </h2>

          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className={`w-full text-gray-200 hover:bg-gray-700 px-4 py-2 rounded-xl border 
                  ${
                    selected === opt
                      ? opt === q.answer
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex mt-4 gap-3">
            {selected && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-purple-500 text-white rounded-xl"
              >
                {current < questions.length - 1 ||
                (reviewingSkipped && skipped.length > 0)
                  ? "Next Question →"
                  : "Finish Quiz"}
              </button>
            )}
            {!selected && (
              <button
                onClick={handleSkip}
                className="px-4 py-2 bg-yellow-500 text-white rounded-xl"
              >
                Skip / Review Later
              </button>
            )}
            {selected && (
              <button
                onClick={() => setShowExplanation(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl"
              >
                Show Explanation
              </button>
            )}
          </div>

          {showExplanation && (
            <p className="mt-4 p-3 bg-yellow-100 rounded-lg">
              {q.explanation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
