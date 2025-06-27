import React, { useState } from "react";
import axios from "axios";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", content: message };
    setChatLog((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message,
      });
      const botReply = { role: "bot", content: res.data.reply };
      setChatLog((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("Chat error", err);
    }

    setMessage("");
  };

  return (
    <div className="chatbox p-4 border rounded-md w-1/2">
      <h2 className="text-xl font-bold mb-2">Ask about your Plan</h2>
      <div className="chat-log mb-3 h-60 overflow-y-auto bg-gray-100 p-2 rounded">
        {chatLog.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === "bot" ? "text-green-600" : "text-blue-600"}`}>
            <strong>{msg.role === "bot" ? "Coach" : "You"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border p-2 rounded-l"
          placeholder="Ask something..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
