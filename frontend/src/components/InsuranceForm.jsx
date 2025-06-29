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
    <div style={{ minHeight: "100vh", background: "linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%)" }}>
      {/* Header */}
      <header style={{
        width: "100%",
        background: "rgba(37,99,235,0.95)",
        color: "#fff",
        padding: "1.2rem 0",
        boxShadow: "0 2px 16px rgba(37,99,235,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", maxWidth: 1200, width: "100%", padding: "0 2rem" }}>
          <span style={{
            fontSize: "2.5rem",
            background: "linear-gradient(90deg, #38bdf8 0%, #6366f1 100%)",
            borderRadius: "50%",
            width: "3.2rem",
            height: "3.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 12px #2563eb33"
          }}>🧠</span>
          <div>
            <div style={{ fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif", fontWeight: 900, fontSize: "2rem", letterSpacing: "-1px" }}>
              Insurance Coach
            </div>
            <div style={{ fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif", fontWeight: 500, fontSize: "1.1rem", opacity: 0.85 }}>
              Smarter insurance, for every stage of life.
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          width: "100%",
          padding: "4rem 0 2.5rem 0",
          background: "none",
          borderRadius: "0",
          boxShadow: "none",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Decorative background shape */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 80,
            width: 180,
            height: 180,
            background: "radial-gradient(circle at 60% 40%, #38bdf8 0%, #6366f1 80%, transparent 100%)",
            opacity: 0.13,
            zIndex: 0,
            borderRadius: "50%",
          }}
        />
        <h1
          style={{
            fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
            fontWeight: 900,
            fontSize: "3.2rem",
            color: "#2563eb",
            marginBottom: "1.1rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          Get Your Personalized Insurance Plan
        </h1>
        <p
          style={{
            fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
            fontSize: "1.25rem",
            color: "#334155",
            marginBottom: "0.7rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          Answer a few questions and receive tailored insurance advice for your unique life situation and goals.
        </p>
        <p
          style={{
            fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
            fontSize: "1.05rem",
            color: "#64748b",
            marginBottom: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          No spam. No sales. Just smart, unbiased guidance.
        </p>
      </section>

      {/* Main Form Section */}
      <main>
        <div
          style={{
            maxWidth: "1100px",
            margin: "2.5rem auto",
            background: "#fff",
            borderRadius: "2rem",
            boxShadow: "0 8px 32px 0 rgba(80, 80, 180, 0.10)",
            padding: "2.5rem 2.5rem 2rem 2.5rem",
            fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
            border: "1px solid #e0e7ef",
          }}
        >
          {/* Section Title */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.5rem" }}>
              <span style={{
                fontSize: "2rem",
                color: "#2563eb",
                background: "#e0e7ff",
                borderRadius: "50%",
                width: "2.5rem",
                height: "2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>📝</span>
              <h2 style={{
                fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
                fontWeight: 800,
                fontSize: "1.7rem",
                color: "#1e293b",
                margin: 0
              }}>
                Basic Information
              </h2>
            </div>
            <div style={{
              color: "#64748b",
              fontSize: "1.1rem",
              marginLeft: "3.3rem"
            }}>
              Please provide your details to get a personalized insurance plan.
            </div>
          </div>
          <hr style={{ border: "none", borderTop: "1px solid #e0e7ef", margin: "1.5rem 0 2rem 0" }} />

          {/* Form Inputs */}
          <div className="big-form-grid" style={{ marginBottom: "2rem" }}>
            {/* Age */}
            <div>
              <label className="big-form-label">Age *</label>
              <input
                name="age"
                type="number"
                placeholder="E.g., 28"
                onChange={handleChange}
                className="big-form-input"
              />
            </div>
            {/* Marital Status */}
            <div>
              <label className="big-form-label">Marital Status *</label>
              <select
                name="marital_status"
                onChange={handleChange}
                className="big-form-input"
              >
                <option value="">Select your status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>
            {/* Children */}
            <div>
              <label className="big-form-label">Do you have children? *</label>
              <select
                name="children"
                onChange={handleChange}
                className="big-form-input"
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            {/* Income */}
            <div>
              <label className="big-form-label">Annual Income (₹) *</label>
              <input
                name="income"
                type="number"
                placeholder="E.g., 800000"
                onChange={handleChange}
                className="big-form-input"
              />
            </div>
            {/* Dependents */}
            <div>
              <label className="big-form-label">Number of Dependents *</label>
              <input
                name="dependents"
                type="number"
                placeholder="E.g., 2"
                onChange={handleChange}
                className="big-form-input"
              />
            </div>
            {/* Insurance */}
            <div>
              <label className="big-form-label">Existing Insurance *</label>
              <select
                name="insurance"
                onChange={handleChange}
                className="big-form-input"
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
            {/* Goals */}
            <div className="md:col-span-2">
              <label className="big-form-label">Goals or Future Plans (optional)</label>
              <textarea
                name="goals"
                placeholder="E.g., Planning to marry, expecting a child, supporting elderly parents, buying a house, etc."
                rows={3}
                onChange={handleChange}
                className="big-form-input resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="big-form-btn"
              style={{ minWidth: 180 }}
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
                  Next Step &rarr;
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
      </main>
    </div>
  );
};

export default InsuranceForm;
