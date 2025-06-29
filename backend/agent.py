import requests

API_URL = "https://openrouter.ai/api/v1/chat/completions"
HEADERS = {
    "Authorization": "Bearer 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",
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
📄 Structure the response like a personal advisory report with the following:

---

1. 👤 About You (User Summary)
→ A friendly sentence or two describing the user's situation.

2. 🧠 What You Might Not Know 
→ Explain common mistakes or misconceptions people at this life stage have. Educate.

3. 🛡️ Your Personalized Recommendations
→ List the types of insurance they need, one by one:  
   - What it is  
   - Why it’s useful  
   - How much coverage  
   - Approx. cost  
   - Any tips (e.g., add riders, start now)

4. 🔍 What Each Policy Means (Glossary)  
→ 3–4 key terms explained in a friendly tone.

5. 🧮 What You Might Pay (Premium Estimate)  
→ Show a table of coverage vs. estimated yearly cost

6. 📈 If Your Life Changes Later… (Future Planning)  
→ Advice if user gets married, has kids, etc.

7. ✅ Final Action Plan 
→ A checklist-style summary (Buy this, Upgrade that...)

---

💬 Keep the tone friendly and easy to read, like you're explaining to a friend.

Avoid long paragraphs. Use bullets, short explanations, and examples.
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

