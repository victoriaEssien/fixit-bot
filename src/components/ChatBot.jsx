// src/components/ChatBot.js
import { useState } from "react";
import robotIcon from "../assets/icons/robot-icon.svg"

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    
    // Add user message to chat
    setMessages([...messages, { type: "user", text: input }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: "Let me check on that for you..." },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="flex flex-col md:px-48 h-screen bg-primary p-4">
        <div className="flex flex-row items-center gap-2 border-b border-secondary py-2">
            <img src={robotIcon} className="w-12" alt="robot head icon" />
            <h1 className="text-4xl text-white font-inter font-bold">FixIT Bot</h1>
        </div>
        {/* chat box area */}
        <div className="flex-1 overflow-y-auto p-4 bg-primary">
            {messages.map((msg, index) => (
            <div key={index} className={`mb-4 flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                className={`max-w-xs px-4 py-3 rounded-lg text-white ${
                    msg.type === "user" ? "bg-[#0b2747] ml-auto" : "text-white mr-auto"
                }`}
                >
                {msg.text}
                </div>
            </div>
            ))}
        </div>

        {/* input field and send button */}
        <div className="mt-4 flex items-center">
            <input
            type="text"
            className="flex-1 p-4 rounded-lg bg-[#0b2747] text-white focus:outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
            className="ml-2 px-11 py-4 bg-[#0F3460] hover:bg-[#123d73] text-white rounded-lg"
            onClick={handleSend}
            >
            Send
            </button>
        </div>
    </div>
  );
};

export default ChatBot;
