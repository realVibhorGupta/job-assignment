
// File: src/components/LoginForm.js
import  { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Label from './Label';
import Textbox from './Textbox';
import Button from './Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);
  const handleSignUp = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
        const response = await axios.post("http://localhost:5000/api/login", formData);
        sessionStorage.setItem('jwtToken', response.data.token); 

        setMessage(response.data.message);
        navigate("/dashboard");
    } catch (error) {
        setError(error.response?.data?.message || "Login failed!");
    }
};

  const handleForgotPassword = () => {
    navigate('/');
  };

  return (
    <form className="w-full max-w-md bg-white p-6 shadow-lg rounded-md space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center mb-4">Login to Your Account</h2>
      <Label htmlFor="email">Email Address</Label>
      <Textbox
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Label htmlFor="password">Password</Label>
      <Textbox
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="mr-2"
          />
          <Label htmlFor="rememberMe">Stay Signed In</Label>
        </div>
        <button
          type="button"
          className="text-blue-500 hover:underline"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </button>
      </div>
      <Button
        label="Login"
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2"
      />
       <div className="text-center mt-4">
        <span className="text-sm text-gray-500">Don’t have an account? </span>
        <button
          type="button"
          className="text-blue-500 hover:underline"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </form>
  );
};

export default LoginForm;
