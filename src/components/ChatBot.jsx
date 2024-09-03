// src/components/ChatBot.jsx
import { useState } from "react";
import robotIcon from "../assets/icons/robot-icon.svg";

const ChatBot = () => {

// Format time to HH:MM AM/PM
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can I assist you today?", timestamp: formatTime(new Date()) },
  ]);
  const [input, setInput] = useState("");
  const [showQuickResponses, setShowQuickResponses] = useState(true);

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(input);
      e.preventDefault();
    }
  };

  // Handle quick response selection
  const quickResponse = (text) => {
    sendMessage(text);
    setShowQuickResponses(false);
  };

  // Send user message and receive bot response
  const sendMessage = async (message) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setShowQuickResponses(false);

    const newMessage = { id: Date.now(), text: trimmedMessage, sender: "user", timestamp: formatTime(new Date()) };
    setMessages((messages) => [...messages, newMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      const { reply } = await response.json();
      const formattedReply = formatText(reply);

      setMessages((messages) => [
        ...messages,
        { id: Date.now() + 1, text: formattedReply, sender: "bot", timestamp: new Date().toLocaleTimeString() },
      ]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  // Format bot response text with HTML elements
  const formatText = (text) => {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formattedText = formattedText
      .split("\n")
      .map((line) => {
        if (line.trim().startsWith("* ")) {
          return `<li>${line.trim().substring(2)}</li>`;
        }
        return line;
      })
      .join("\n");

    if (formattedText.includes("<li>")) {
      formattedText = `<ul>${formattedText}</ul>`;
    }

    return formattedText;
  };

  // Render formatted or plain messages
  const renderMessage = (msg) => {
    return (
      <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
        <div className={`max-w-xs px-4 py-3 rounded-lg ${msg.sender === "user" ? "bg-[#0b2747] text-white" : "text-white"} break-words`}>
          <p dangerouslySetInnerHTML={{ __html: msg.text }}></p>
          <p className="text-xs text-gray-300 mt-1 flex justify-end">{msg.timestamp}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:px-48 h-screen bg-primary p-4">
      {/* Header with Bot Icon */}
      <div className="flex flex-row items-center gap-2 border-b border-secondary py-2">
        <img src={robotIcon} className="w-12" alt="robot head icon" />
        <h1 className="text-4xl text-white font-inter font-bold">FixIT Bot</h1>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 bg-primary">
        {messages.map((msg) => renderMessage(msg))}
      </div>

      {/* Quick Responses */}
      {showQuickResponses && (
        <div className="flex flex-col md:flex-row justify-center gap-3 py-2 my-6">
          {["My laptop screen is black", "My phone won't turn on", "Software error"].map((text, idx) => (
            <button
              key={idx}
              className="px-4 py-2 border border-[#0F3460] hover:bg-[#123d73] text-white rounded-lg"
              onClick={() => quickResponse(text)}
            >
              {text}
            </button>
          ))}
        </div>
      )}

      {/* Input field and Send button */}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          className="flex-1 p-4 rounded-lg bg-[#0b2747] text-white focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-2 px-11 py-4 bg-[#0F3460] hover:bg-[#123d73] text-white rounded-lg"
          onClick={() => sendMessage(input)}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
