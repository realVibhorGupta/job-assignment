import  { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Label from "./Label";
import Textbox from "./Textbox";
import Button from "./Button";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    nickname: "",
    website: "",
    firstName: "",
    lastName: "",
    jabber: "",
    aolIM: "",
    yahooIM: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // Better way to set axios defaults
  axios.defaults.baseURL = "http://localhost:5000/api";
  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    // Format the form data to send to the backend
    const dataToSend = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      displayName: formData.displayName,
      nickname: formData.nickname,
      website: formData.website,
      name: { first: formData.firstName, last: formData.lastName }, // Nested name object for first and last names
      jabber: formData.jabber,
      aolIM: formData.aolIM,
      yahooIM: formData.yahooIM,
    };

    try {
       await axios.post(`/signup`, dataToSend, {
        withCredentials: true,
      });
      setMessage("Registration successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error);
      setError(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "An error occurred during signup"
      );
    }
  };

  return (
    <form
      className="w-full max-w-lg bg-white p-6 shadow-lg rounded-md space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
      <Label htmlFor="username">Username</Label>
      <Textbox
        name="username"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
        required
      />
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
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Textbox
        type="password"
        name="confirmPassword"
        placeholder="Re-enter your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <Label htmlFor="displayName">Display Name</Label>
      <Textbox
        name="displayName"
        placeholder="Enter your display name"
        value={formData.displayName}
        onChange={handleChange}
      />

      <Label htmlFor="nickname">Nickname</Label>
      <Textbox
        name="nickname"
        placeholder="Enter your nickname"
        value={formData.nickname}
        onChange={handleChange}
      />
      <Label htmlFor="website">Website</Label>
      <Textbox
        type="url"
        name="website"
        placeholder="Enter your website URL"
        value={formData.website}
        onChange={handleChange}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Textbox
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Textbox
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <Label htmlFor="jabber">Jabber</Label>
      <Textbox
        name="jabber"
        placeholder="Enter your Jabber ID"
        value={formData.jabber}
        onChange={handleChange}
      />
      <Label htmlFor="aolIM">AOL IM</Label>
      <Textbox
        name="aolIM"
        placeholder="Enter your AOL IM username"
        value={formData.aolIM}
        onChange={handleChange}
      />
      <Label htmlFor="yahooIM">Yahoo IM</Label>
      <Textbox
        name="yahooIM"
        placeholder="Enter your Yahoo IM username"
        value={formData.yahooIM}
        onChange={handleChange}
      />
      <Button
        label="Create and Access"
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </form>
  );
};

export default SignupForm;
