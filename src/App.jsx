// import { useState } from "react";
// import { syllabus } from "./syllabus";
// import Quiz from "./components/quiz";

// function App() {
//   const [exam, setExam] = useState("");
//   const [subject, setSubject] = useState("");
//   const [topic, setTopic] = useState("");
//   const [startQuiz, setStartQuiz] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-green-300 flex flex-col items-center justify-center p-6">
//       {!startQuiz ? (
//         <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
//           {/* Title */}
//           <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
//             📘 SSC CGL Quiz App
//           </h1>

//           {/* Exam Selection */}
//           <div className="mb-5">
//             <label className="block mb-2 font-semibold text-gray-700">
//               Select Exam
//             </label>
//             <select
//               className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               value={exam}
//               onChange={(e) => {
//                 setExam(e.target.value);
//                 setSubject("");
//                 setTopic("");
//               }}
//             >
//               <option value="">-- Choose Exam --</option>
//               {Object.keys(syllabus).map((examName) => (
//                 <option key={examName} value={examName}>
//                   {examName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Subject Selection */}
//           {exam && (
//             <div className="mb-5">
//               <label className="block mb-2 font-semibold text-gray-700">
//                 Select Subject
//               </label>
//               <select
//                 className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 value={subject}
//                 onChange={(e) => {
//                   setSubject(e.target.value);
//                   setTopic("");
//                 }}
//               >
//                 <option value="">-- Choose Subject --</option>
//                 {Object.keys(syllabus[exam]).map((subj) => (
//                   <option key={subj} value={subj}>
//                     {subj}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* Topic Selection */}
//           {exam && subject && (
//             <div className="mb-5">
//               <label className="block mb-2 font-semibold text-gray-700">
//                 Select Topic
//               </label>
//               <select
//                 className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//               >
//                 <option value="">-- Choose Topic --</option>
//                 {Array.isArray(syllabus[exam][subject])
//                   ? syllabus[exam][subject].map((t) => (
//                       <option key={t} value={t}>
//                         {t}
//                       </option>
//                     ))
//                   : Object.keys(syllabus[exam][subject]).map((subTopic) => (
//                       <optgroup key={subTopic} label={subTopic}>
//                         {syllabus[exam][subject][subTopic].map((t) => (
//                           <option key={t} value={t}>
//                             {t}
//                           </option>
//                         ))}
//                       </optgroup>
//                     ))}
//               </select>
//             </div>
//           )}

//           {/* Start Quiz Button */}
//           {topic && (
//             <div className="mt-6 flex justify-center">
//               <button
//                 onClick={() => setStartQuiz(true)}
//                 className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
//               >
//                 Start Quiz 🚀
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <Quiz exam={exam} subject={subject} topic={topic} />
//       )}
//     </div>
//   );
// }

// export default App;




//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import QuizSelection from "./components/quizSelection";
import Quiz from "./components/Quiz";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/profile";
import ForgotPassword from "./pages/forgot-password";
import QuizHistory from "./pages/QuizHistory";
import Achievements from "./pages/achievement";
import Notifications from "./pages/notification";
import Settings from "./pages/settings";
import Logout from "./pages/logout";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/quiz-selection" element={<QuizSelection />} />
       <Route path="/quiz" element={<Quiz />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/quiz-history" element={<QuizHistory />} />
       <Route path="/achievements" element={<Achievements />} />
       <Route path="/notifications" element={<Notifications />} />
       <Route path="/settings" element={<Settings />} /> 
       <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;

