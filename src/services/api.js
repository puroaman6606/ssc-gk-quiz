const API_URL = "http://localhost:5000/api"; // backend URL

// helper: fetch with error handling
const request = async (url, options = {}) => {
  const res = await fetch(url, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
};

// signup request
export const signup = (userData) => {
  return request(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
};

// login request
export const login = (userData) => {
  return request(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
};

// get profile with token
export const getMe = (token) => {
  return request(`${API_URL}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getQuizHistory = async (token) => {
  const res = await fetch(`${API_URL}/quiz/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

