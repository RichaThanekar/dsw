import React, { useState } from 'react';
import axios from 'axios';
import '../tailwind.css';
const InsuranceForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    marital_status: '',
    children: '',
    income: '',
    dependents: '',
    insurance: '',
    goals: ''
  });

  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  const { age, marital_status, children, income, dependents, insurance } = formData;
  if (!age || age <= 0 || !marital_status || !children || !income || income <= 0 || !dependents || dependents < 0 || !insurance) {
    alert("⚠️ Please fill out all required fields with valid values.");
    return;
  }

  setIsLoading(true);
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/get-plan', formData);
    setResult(response.data.plan);
  } catch (err) {
    console.error("❌ API Error:", err);
    setResult("❌ Something went wrong. Check backend.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div
      className="big-form-container"
      style={{
        maxWidth: "1200px",
        paddingLeft: "2.5rem",
        paddingRight: "2.5rem",
        fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
      }}
    >
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
          <span className="text-2xl" style={{ fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif" }}>🧠</span>
        </div>
        <h1
          className="big-form-title"
          style={{ fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif" }}
        >
          Insurance Coach
        </h1>
        <p
          className="big-form-subtitle"
          style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}
        >
          Get personalized insurance advice tailored to your life stage and financial goals
        </p>
      </div>

      {/* Form Inputs */}
      <div className="big-form-grid">
        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}
          >
            <span className="text-blue-600">●</span> Age
          </label>
          <input
            name="age"
            type="number"
            placeholder="E.g., 28"
            onChange={handleChange}
            className="big-form-input"
            style={{ fontFamily: "'Roboto Mono', 'Menlo', 'monospace'" }}
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}
          >
            <span className="text-blue-600">●</span> Marital Status
          </label>
          <select
            name="marital_status"
            onChange={handleChange}
            className="big-form-input"
            style={{ fontFamily: "'Roboto Mono', 'Menlo', 'monospace'" }}
          >
            <option value="">Select your status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}
          >
            <span className="text-blue-600">●</span> Do you have children?
          </label>
          <select
            name="children"
            onChange={handleChange}
            className="big-form-input"
            style={{ fontFamily: "'Roboto Mono', 'Menlo', 'monospace'" }}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}
          >
            <span className="text-blue-600">●</span> Annual Income (₹)
          </label>
          <input
            name="income"
            type="number"
            placeholder="E.g., 800000"
            onChange={handleChange}
            className="big-form-input"
            style={{ fontFamily: "'Roboto Mono', 'Menlo', 'monospace'" }}
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}
          >
            <span className="text-blue-600">●</span> Number of Dependents
          </label>
          <input
            name="dependents"
            type="number"
            placeholder="E.g., 2"
            onChange={handleChange}
            className="big-form-input"
            style={{ fontFamily: "'Roboto Mono', 'Menlo', 'monospace'" }}
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}
          >
            <span className="text-blue-600">●</span> Existing Insurance
          </label>
          <select
            name="insurance"
            onChange={handleChange}
            className="big-form-input"
            style={{ fontFamily: "'Roboto Mono', 'Menlo', 'monospace'" }}
          >
            <option value="">Select insurance type</option>
            <option value="none">None</option>
            <option value="health">Health</option>
            <option value="life">Life</option>
            <option value="auto">Auto</option>
            <option value="home">Home</option>
            <option value="multiple">Multiple Policies</option>
          </select>
        </div>

        <div className="md:col-span-2 space-y-2">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}
          >
            <span className="text-blue-600">●</span> Goals or Future Plans (optional)
          </label>
          <textarea
            name="goals"
            placeholder="E.g., Planning to marry, expecting a child, supporting elderly parents, buying a house, etc."
            rows={4}
            onChange={handleChange}
            className="big-form-input resize-none"
            style={{ fontFamily: "'Roboto Mono', 'Menlo', 'monospace'" }}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="big-form-btn"
          style={{ fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif" }}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              <span className="mr-2">✨</span>
              Get My Personalized Plan
            </>
          )}
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className="big-form-output" style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif" }}>
          <div className="big-form-output-title" style={{ fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif" }}>
            <span className="mr-3">📋</span>
            Your Personalized Insurance Plan
          </div>
          <div>
            {result.split('\n\n').map((block, idx) => (
              <div key={idx} style={{ marginBottom: '1.2rem' }}>
                {block.split('\n').map((line, i) => (
                  <p key={i} style={{ margin: 0 }}>{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceForm;
