from flask import Flask, request, jsonify
from flask_cors import CORS
from agent import send_message_to_agent

app = Flask(__name__)
CORS(app)

@app.route("/api/get-plan", methods=["POST"])
def get_plan():
    user_data = request.json

    prompt = f"""
You are LifeStageCoach, an expert digital insurance advisor trained in financial planning and insurance needs assessment across all life stages.

Your goal is to:
1. Understand the user's life stage.
2. Analyze their financial risk exposure.
3. Audit their existing insurance.
4. Recommend the best insurance types, coverage amounts, and riders.
5. Explain the recommendations in simple terms.
6. Optionally simulate future needs (like having a child).
7. Create a professional report with clear headers.

Use this user profile to give a smart, clear, and personalized insurance plan:

📋 User Profile:
- Age: {user_data['age']}
- Marital Status: {user_data['marital_status']}
- Has Children: {user_data['children']}
- Annual Income: ₹{user_data['income']}
- Dependents: {user_data['dependents']}
- Existing Insurance: {user_data['insurance']}
- Future Goals or Concerns: {user_data.get('goals', 'Not specified')}

💡 Format your response like this:
1. 👤 Life Stage Summary
2. 🛡️ Recommended Coverages
3. 🔍 Reasoning for Each Recommendation
4. 🧮 Estimated Premiums (rough)
5. 📈 Future Simulation (if applicable)
6. 📄 Final Summary (PDF-style, markdown or text format)

Be concise, smart, and practical like a human advisor.
"""

    result = send_message_to_agent(prompt)
    return jsonify({"plan": result})

if __name__ == "__main__":
    app.run(debug=True)

