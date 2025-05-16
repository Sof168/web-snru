import React, { useState } from 'react';
import logo from "./img/snru-logo-n.png";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(''); 

    if (!username || !password) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    try {
      const response = await fetch('https://6799edd6747b09cdcccd04d3.mockapi.io/data/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
      }

      setSuccess('เข้าสู่ระบบสำเร็จ!');
      console.log('Login success:', data);


    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-200 to-pink-400 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl transition-all duration-300">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 object-contain rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          />
          <h2 className="text-xl font-bold text-gray-700">ระบบแจ้งซ่อมครุภัณฑ์</h2>
          <p className="text-sm text-gray-500">มหาวิทยาลัยราชภัฏสกลนคร</p>
        </div>

        {error && <div className="text-red-500 text-sm mt-4 text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm mt-4 text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ชื่อผู้ใช้"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="รหัสผ่าน"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.123.184-2.205.525-3.225M9.75 9.75a3 3 0 114.5 4.5M3 3l18 18" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.364-1.636A10 10 0 003.636 10.364M2 12c0-5.523 4.477-10 10-10s10 4.477 10 10" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-200 shadow-sm"
          >
            ล็อกอิน
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
