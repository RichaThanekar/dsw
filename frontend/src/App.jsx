import React, { useState } from "react";
import InsuranceForm from "./components/InsuranceForm";
import ChatBox from "./components/ChatBox";
import axios from "axios";

export default function App() {
  const [chat, setChat] = useState([]);
  const [stage, setStage] = useState("form");

  const handleFormSubmit = async (formData) => {
    const res = await axios.post("/api/initial", formData);
    setChat([{ role: "assistant", content: res.data.reply }]);
    setStage("chat");
  };

  const handleUserMessage = async (msg) => {
    const res = await axios.post("/api/chat", { message: msg });
    setChat([...chat, { role: "user", content: msg }, { role: "assistant", content: res.data.reply }]);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {stage==="form" 
        ? <InsuranceForm onSubmit={handleFormSubmit}/>
        : <ChatBox chat={chat} onSend={handleUserMessage}/>}
    </div>
  );
}
