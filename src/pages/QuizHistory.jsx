// src/pages/QuizHistory.jsx
import { useEffect, useState } from "react";
import { getQuizHistory } from "../services/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function QuizHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ examType: "", subject: "", date: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [modalQuiz, setModalQuiz] = useState(null);

  const quizzesPerPage = 5;

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await getQuizHistory(token);
      if (res.success) {
        setHistory(res.history);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  // Filtered quizzes
  const filteredHistory = history.filter((q) => {
    const examMatch = filters.examType ? q.examType === filters.examType : true;
    const subjectMatch = filters.subject ? q.subject === filters.subject : true;
    const dateMatch = filters.date ? new Date(q.createdAt).toDateString() === new Date(filters.date).toDateString() : true;
    return examMatch && subjectMatch && dateMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / quizzesPerPage);
  const currentQuizzes = filteredHistory.slice((currentPage - 1) * quizzesPerPage, currentPage * quizzesPerPage);

  // Summary stats
  const totalQuizzes = history.length;
  const totalCorrect = history.reduce((acc, q) => acc + q.score, 0);
  const totalQuestions = history.reduce((acc, q) => acc + (q.total || q.questions.length), 0);
  const totalIncorrect = totalQuestions - totalCorrect;
  const totalSkipped = history.reduce((acc, q) => acc + ((q.skipped?.length) || 0), 0);

  const COLORS = ["#4ade80", "#f87171", "#facc15"]; // green, red, yellow
  const summaryData = [
    { name: "Correct", value: totalCorrect },
    { name: "Incorrect", value: totalIncorrect },
    { name: "Skipped", value: totalSkipped },
  ];

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 bg-gray-800 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">📊 Quiz History Dashboard</h2>

      {/* Summary Card */}
      <div className="bg-pink-600 shadow-lg rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:justify-between items-center gap-6">
        <div className="flex-1 text-center md:text-left">
          <p className="text-white">Total Quizzes</p>
          <p className="text-2xl font-bold">{totalQuizzes}</p>
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-white">Total Correct</p>
          <p className="text-green-600 text-2xl font-bold">{totalCorrect}</p>
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-white">Total Incorrect</p>
          <p className="text-red-600 text-2xl font-bold">{totalIncorrect}</p>
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-white">Total Skipped</p>
          <p className="text-yellow-500 text-2xl font-bold">{totalSkipped}</p>
        </div>
        <div className="w-64 h-48 md:w-48 md:h-48">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={summaryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {summaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Exam"
          value={filters.examType}
          onChange={(e) => setFilters({...filters, examType: e.target.value})}
          className="p-2 bg-lime-200 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Filter by Subject"
          value={filters.subject}
          onChange={(e) => setFilters({...filters, subject: e.target.value})}
          className="p-2  bg-lime-200 border rounded-lg"
        />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({...filters, date: e.target.value})}
          className="p-2 bg-lime-200 border rounded-lg"
        />
        <button
          onClick={() => setFilters({ examType: "", subject: "", date: "" })}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Reset Filters
        </button>
      </div>

      {/* Table */}
      {currentQuizzes.length === 0 ? (
        <p className="text-center text-gray-500">No quizzes found for the selected filters.</p>
      ) : (
        <div className="overflow-x-auto bg-pink-600 shadow-md rounded-2xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-200 sticky top-0">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Exam</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Topic</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Correct</th>
                <th className="px-4 py-2">Incorrect</th>
                <th className="px-4 py-2">Accuracy</th>
                <th className="px-4 py-2">Time Taken</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentQuizzes.map((quiz) => {
                const total = quiz.total || quiz.questions.length;
                const correct = quiz.score;
                const incorrect = total - correct;
                const accuracy = ((correct / total) * 100).toFixed(2);
                const timeTaken = quiz.timeTaken ? `${Math.floor(quiz.timeTaken/60)}m ${quiz.timeTaken%60}s` : "-";

                return (
                  <tr key={quiz._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{new Date(quiz.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-2">{quiz.examType}</td>
                    <td className="px-4 py-2">{quiz.subject}</td>
                    <td className="px-4 py-2">{quiz.topic}</td>
                    <td className="px-4 py-2 font-semibold">{quiz.score}</td>
                    <td className="px-4 py-2">{total}</td>
                    <td className="px-4 py-2 text-green-600">{correct}</td>
                    <td className="px-4 py-2 text-red-600">{incorrect}</td>
                    <td className="px-4 py-2">{accuracy}%</td>
                    <td className="px-4 py-2">{timeTaken}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => setModalQuiz(quiz)}
                        className="px-2 py-1 bg-indigo-600 text-white rounded-lg text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p-1, 1))}
            className="px-3 py-1 border rounded-lg"
          >
            Prev
          </button>
          <span className="px-3 py-1">{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p+1, totalPages))}
            className="px-3 py-1 border rounded-lg"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {modalQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 overflow-y-auto max-h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Quiz Details</h3>
              <button onClick={() => setModalQuiz(null)} className="text-red-600 font-bold text-xl">×</button>
            </div>
            <p className="mb-2 text-gray-500">Exam: {modalQuiz.examType} | Subject: {modalQuiz.subject} | Topic: {modalQuiz.topic}</p>
            {modalQuiz.questions.map((q, i) => {
              const userAnswer = q.selectedAnswer || "-";
              const correct = q.answer;
              const isCorrect = userAnswer === correct;
              return (
                <div key={i} className="mb-4 p-3 border rounded-lg">
                  <p className="font-semibold">Q{i+1}: {q.question}</p>
                  <p>User Answer: <span className={isCorrect ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{userAnswer}</span></p>
                  <p>Correct Answer: <span className="text-green-600 font-bold">{correct}</span></p>
                  <p className="mt-1 bg-yellow-100 p-2 rounded-lg">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

