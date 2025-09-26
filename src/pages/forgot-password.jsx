import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1 = email, 2 = OTP + new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleRequestOtp = async () => {
    try {
      const res = await axios.post("https://ssc-backend-c1qi.onrender.com/api/user/request-otp", { email });
      alert(res.data.message);
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.error || "Error sending OTP");
    }
  };

  const handleChangePassword = async () => {
    try {
      const res = await axios.post("https://ssc-backend-c1qi.onrender.com/api/user/change-password", {
        email,
        otp,
        newPassword,
      });
      alert(res.data.message);
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.error || "Error changing password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        {step === 1 ? (
          <>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <button
              onClick={handleRequestOtp}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Reset Password</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <button
              onClick={handleChangePassword}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Change Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
