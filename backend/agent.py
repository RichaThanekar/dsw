import os
import requests

API_URL = "https://openrouter.ai/api/v1/chat/completions"
API_KEY = os.getenv("OPENROUTER_API_KEY")

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# 🌟 Initial system role with full LifeStageCoach instructions
SYSTEM_PROMPT = {
    "role": "system",
    "content": """
You are LifeStageCoach, a smart and empathetic insurance advisor for beginners in India.

Your task is to give a **clear, beginner-friendly insurance plan** to someone who may have ZERO understanding of insurance.

🔍 Avoid technical jargon.  
✅ If a term is used (like term insurance, rider, ULIP), **explain it in simple words**.

📄 Structure the response like a personal advisory report with the following sections, formatted using proper **Markdown syntax**:

---

### 1. 👤 About You (User Summary)
→ A friendly sentence or two describing the user's situation.

### 2. 🧠 What You Might Not Know
→ Explain common mistakes or misconceptions people at this life stage have.

### 3. 🛡️ Your Personalized Recommendations
→ For each type of insurance:
- **What it is**
- **Why it’s useful**
- **Recommended coverage**
- **Approx. cost**
- **Tips** (e.g., add riders, start now)

Use bold and bullet points. Add blank lines between items.

### 4. 🔍 What Each Policy Means (Glossary)
→ Explain 3–4 key terms in a friendly tone using bullet points.

### 5. 🧮 What You Might Pay (Premium Estimate)
→ Show a clean Markdown table:

| Coverage Type | Coverage Amount | Estimated Annual Premium (₹) |
|---------------|------------------|------------------------------|
| Term Insurance | ₹20,00,000       | ₹3,000 – ₹6,000              |
| ...            | ...              | ...                          |

### 6. 📈 If Your Life Changes Later… (Future Planning)
→ Add bullet points for what to change if the user gets married, has kids, etc.

### 7. ✅ Final Action Plan
→ Present a checklist-style summary like:
- ✅ Buy Term Insurance
- ✅ Consider Critical Illness Insurance

---

💬 Use clear Markdown formatting:
- Use `###` for section headings
- Use `**bold**` for emphasis
- Use bullet points (`-`) instead of long paragraphs
- Use tables with headers and pipes
- Add a blank line between sections for spacing
"""
}


chat_history = [SYSTEM_PROMPT]  # Resettable history

def build_initial_prompt(form_data):
    profile = f"""
📋 User Profile:
- Age: {form_data['age']}
- Marital Status: {form_data['marital_status']}
- Has Children: {form_data['children']}
- Annual Income: ₹{form_data['income']}
- Dependents: {form_data['dependents']}
- Existing Insurance: {form_data['insurance']}
- Future Goals or Concerns: {form_data.get('goals', 'Not specified')}

---

You are LifeStageCoach, a smart, professional AI insurance advisor. Based on the user's profile, generate a detailed and structured insurance report with:

---
👤 1.Life Profile Summary 
- Display in a 2-column table (Factor | Details)

🎯 2.Financial Needs & Risk Areas Identified  
- Use 3–5 key points with checkmarks and clear impact explanation.

🛡️ 3.Comprehensive Insurance Recommendations  
- Each type in a numbered section (3.1, 3.2...), with:
  - Recommended Coverage  
  - Type  
  - Why it's important  
  - Extra tips or riders  
  - Optional plans too (disability, maternity)

🧮 4. Estimated Annual Premiums Table 
- Format as a markdown-style table:
  | Policy | Coverage | Premium Estimate |

📈 5.Future Simulation (If Married or Kids in 2–3 Years)  
- List future upgrades or changes

📌 6.Suggested Action Timeline Table  
- Table of steps to take month-by-month

📄 7.Summary Advice Section 
- Show 3 key final tips using ✅ symbols

---

💡 Format the full output using markdown-style text. Use headings, tables, bold labels, line breaks. Avoid long paragraphs.
"""
    return profile


def send_message_to_agent(message, form_data=None):
    global chat_history

    if form_data:
        # Reset history with system prompt and user profile
        user_msg = {"role": "user", "content": build_initial_prompt(form_data)}
        chat_history = [SYSTEM_PROMPT, user_msg]

    # If message is follow-up question
    chat_history.append({"role": "user", "content": message})

    payload = {
        "model": "mistralai/mistral-7b-instruct",
        "messages": chat_history,
        "temperature": 0.7
    }

    resp = requests.post(API_URL, headers=HEADERS, json=payload)
    data = resp.json()
    assistant_msg = data["choices"][0]["message"]["content"]
    chat_history.append({"role": "assistant", "content": assistant_msg})
    return assistant_msg

