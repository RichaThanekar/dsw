# 🛡️ InsuranceCoach – Personalized Insurance Advisor Agent 

InsuranceCoach is a smart, GenAI-powered virtual insurance advisor built for beginners.It generates tailored insurance advice based on a user's profile — helping them understand what kind of coverage they truly need, and why. 
---

## 🚀 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Flask (Python)
- **LLM API**: OpenRouter (e.g., Mistral 7B Instruct)

---

## 🧠 Key Features

- 🧾 Personalized insurance recommendations
- 🧠 GenAI agent that explains decisions in plain language
- 👨‍👩‍👧 Life stage coverage suggestions (e.g., single, married, retired)


---

Setup Guide

### 1. 📦 Clone the Repository

```bash
git clone https://github.com/RichaThanekar/insurance_coach.git
cd insurance_coach
```

---

### 2. 🐍 Set Up the Backend (Flask)

```bash
cd backend
python -m venv venv
venv\Scripts\activate      # On Windows
# OR
source venv/bin/activate  # On Mac/Linux

pip install -r requirements.txt
```

#### 🔐 Create `.env` file in `backend/` with:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

> You can get a free API key by signing up at [https://openrouter.ai](https://openrouter.ai).
> **Model Used**: `mistralai/mistral-7b-instruct` (Free Tier)

Start the Flask backend:

```bash
python app.py
```

---

### 3. ⚛️ Set Up the Frontend (React)

```bash
cd ../frontend
npm install
npm run dev
```

This launches the React frontend (default: [http://localhost:5173](http://localhost:5173)) and connects to the Flask backend at [http://localhost:5000](http://localhost:5000).

---

You're all set!
Your **AI-powered Insurance Coach (using Mistral 7B Instruct)** is ready to guide users with life-stage based recommendations — completely free to run. 🧠💬

