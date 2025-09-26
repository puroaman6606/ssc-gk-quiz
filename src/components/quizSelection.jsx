// import { useState, useEffect } from "react";
// import { syllabus } from "../syllabus"; 
// import Quiz from "./Quiz";
// import Sidebar from "./sidebar"; // Make sure the file is named Sidebar.jsx with capital S

// function QuizSelection() {
//   const [exam, setExam] = useState("");
//   const [subject, setSubject] = useState("");
//   const [topic, setTopic] = useState("");
//   const [startQuiz, setStartQuiz] = useState(false);

//   // Optional: force re-render if you want sidebar to slide in on page load
//   const [sidebarVisible, setSidebarVisible] = useState(false);
//   useEffect(() => {
//     const timer = setTimeout(() => setSidebarVisible(true), 300);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="min-h-screen flex">
//       {/* Sidebar */}
//       {sidebarVisible && <Sidebar />}

//       {/* Main content */}
//       <div className="flex-1 p-6 bg-gray-700 flex flex-col items-center justify-center">
//         {!startQuiz ? (
//           <div className="w-full max-w-lg bg-gray-900 shadow-lg rounded-2xl p-8 transition-all transform hover:-translate-y-5 cursor-pointer">
//             <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
//               📘 Quiz App
//             </h1>

//             {/* Exam Selection */}
//             <div className="mb-5">
//               <label className="block mb-2 font-semibold text-gray-200">
//                 Select Exam
//               </label>
//               <select
//                 className="w-full p-3 text-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 value={exam}
//                 onChange={(e) => {
//                   setExam(e.target.value);
//                   setSubject("");
//                   setTopic("");
//                 }}
//               >
//                 <option value="">-- Choose Exam --</option>
//                 {Object.keys(syllabus).map((examName) => (
//                   <option key={examName} value={examName}>
//                     {examName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Subject Selection */}
//             {exam && (
//               <div className="mb-5">
//                 <label className="block mb-2 font-semibold text-gray-200">
//                   Select Subject
//                 </label>
//                 <select
//                   className="w-full p-3 text-gray-700 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600"
//                   value={subject}
//                   onChange={(e) => {
//                     setSubject(e.target.value);
//                     setTopic("");
//                   }}
//                 >
//                   <option value="">-- Choose Subject --</option>
//                   {Object.keys(syllabus[exam]).map((subj) => (
//                     <option key={subj} value={subj}>
//                       {subj}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             {/* Topic Selection */}
//             {exam && subject && (
//               <div className="mb-5">
//                 <label className="block mb-2 font-semibold text-gray-200">
//                   Select Topic
//                 </label>
//                 <select
//                   className="w-full p-3 text-gray-700 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600"
//                   value={topic}
//                   onChange={(e) => setTopic(e.target.value)}
//                 >
//                   <option value="">-- Choose Topic --</option>
//                   {Array.isArray(syllabus[exam][subject])
//                     ? syllabus[exam][subject].map((t) => (
//                         <option key={t} value={t}>
//                           {t}
//                         </option>
//                       ))
//                     : Object.keys(syllabus[exam][subject]).map((subTopic) => (
//                         <optgroup key={subTopic} label={subTopic}>
//                           {syllabus[exam][subject][subTopic].map((t) => (
//                             <option key={t} value={t}>
//                               {t}
//                             </option>
//                           ))}
//                         </optgroup>
//                       ))}
//                 </select>
//               </div>
//             )}

//             {/* Start Quiz Button */}
//             {topic && (
//               <div className="mt-6 flex justify-center">
//                 <button
//                   onClick={() => {
//     console.log("Starting quiz", exam, subject, topic);
//     setStartQuiz(true);
//   }}
//                   className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
//                 >
//                   Start Quiz 🚀
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <Quiz exam={exam} subject={subject} topic={topic} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default QuizSelection;





// src/components/QuizSelection.jsx
import { useState, useEffect } from "react";
import { syllabus } from "../syllabus";
import Quiz from "./quiz";
import Sidebar from "./sidebar";
import { motion, AnimatePresence } from "framer-motion";
import cartoonBoy from "../assets/cartoon2.jpg"; // apna cartoon image yahan daalna

function QuizSelection() {
  const [exam, setExam] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [startQuiz, setStartQuiz] = useState(false);

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showCartoon, setShowCartoon] = useState(true);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSidebarVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Cartoon + card animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setCardVisible(true), 1000); // 2s baad card aayega
    const timer2 = setTimeout(() => setShowCartoon(false), 15000); // 4s baad cartoon side ho jayega
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Sidebar */}
      {sidebarVisible && <Sidebar />}

      {/* Cartoon Boy */}
      <AnimatePresence>
        {/* {showCartoon && ( */}
          <motion.img
            key="cartoon"
            src={cartoonBoy}
            alt="Cartoon Boy"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            // exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 right-0 h-[110vh] z-20"
          />
        {/* )} */}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-700 flex flex-col items-center justify-center">
        {!startQuiz ? (
          <AnimatePresence>
            {cardVisible && (
              <motion.div
                key="quiz-card"
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="w-full max-w-lg bg-gray-900 shadow-lg rounded-2xl p-8 transition-all transform hover:-translate-y-5 cursor-pointer relative z-10"
              >
                <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
                  📘 Quiz App
                </h1>

                {/* Exam Selection */}
                <div className="mb-5">
                  <label className="block mb-2 font-semibold text-gray-200">
                    Select Exam
                  </label>
                  <select
                    className="w-full p-3 text-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
                    value={exam}
                    onChange={(e) => {
                      setExam(e.target.value);
                      setSubject("");
                      setTopic("");
                    }}
                  >
                    <option value="">-- Choose Exam --</option>
                    {Object.keys(syllabus).map((examName) => (
                      <option key={examName} value={examName}>
                        {examName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject Selection */}
                {exam && (
                  <div className="mb-5">
                    <label className="block mb-2 font-semibold text-gray-200">
                      Select Subject
                    </label>
                    <select
                      className="w-full p-3 text-gray-700 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        setTopic("");
                      }}
                    >
                      <option value="">-- Choose Subject --</option>
                      {Object.keys(syllabus[exam]).map((subj) => (
                        <option key={subj} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Topic Selection */}
                {exam && subject && (
                  <div className="mb-5">
                    <label className="block mb-2 font-semibold text-gray-200">
                      Select Topic
                    </label>
                    <select
                      className="w-full p-3 text-gray-700 border border-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    >
                      <option value="">-- Choose Topic --</option>
                      {Array.isArray(syllabus[exam][subject])
                        ? syllabus[exam][subject].map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))
                        : Object.keys(syllabus[exam][subject]).map(
                            (subTopic) => (
                              <optgroup key={subTopic} label={subTopic}>
                                {syllabus[exam][subject][subTopic].map((t) => (
                                  <option key={t} value={t}>
                                    {t}
                                  </option>
                                ))}
                              </optgroup>
                            )
                          )}
                    </select>
                  </div>
                )}

                {/* Start Quiz Button */}
                {topic && (
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => {
                        console.log("Starting quiz", exam, subject, topic);
                        setStartQuiz(true);
                      }}
                      className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
                    >
                      Start Quiz 🚀
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <Quiz exam={exam} subject={subject} topic={topic} />
        )}
      </div>
    </div>
  );
}

export default QuizSelection;
