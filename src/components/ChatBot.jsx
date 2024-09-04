// src/components/ChatBot.jsx
import { useState } from "react";
import robotIcon from "../assets/icons/robot-icon.svg";
import sendIcon from "../assets/icons/send-icon.svg";

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
  const [isTyping, setIsTyping] = useState(false); // New state to indicate typing


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
    setIsTyping(true); // show typing indicator

    try {
      const response = await fetch("https://fixit-bot-server.onrender.com/api/chat", {
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
        { id: Date.now() + 1, text: formattedReply, sender: "bot", timestamp: formatTime(new Date()) },
      ]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    } finally {
      setIsTyping(false); // Hide typing indicator after receiving the response
    }
  };

  const formatText = (text) => {
    // Replace **bold** text with <strong> tags
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  
    // Split text by newline to handle each line separately
    const lines = formattedText.split("\n").map((line) => line.trim());
  
    // Initialize a formatted array
    let formattedLines = [];
    let listItems = [];
  
    lines.forEach((line) => {
      if (line.startsWith("* ")) {
        // If it's a list item, add it to listItems array
        listItems.push(`<li>${line.substring(2)}</li>`);
      } else {
        if (listItems.length) {
          // If we have accumulated list items, close the list and reset it
          formattedLines.push(`<ul>${listItems.join("")}</ul>`);
          listItems = [];
        }
        // Push regular lines as paragraphs with <br> at the end
        formattedLines.push(`${line}<br/>`);
      }
    });
  
    // If there are any remaining list items, add them to formatted lines
    if (listItems.length) {
      formattedLines.push(`<ul>${listItems.join("")}</ul>`);
    }
  
    // Join all formatted lines into a single string
    return formattedLines.join("");
  };
  

  // Render formatted or plain messages
  const renderMessage = (msg) => {
    return (
      <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
        <div className={`max-w-lg px-4 py-3 rounded-lg ${msg.sender === "user" ? "bg-[#0b2747] text-white" : "text-white"} break-words`}>
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

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex justify-start mb-2">
          <div className="px-4 py-3">
          <iframe className="w-20" src="https://lottie.host/embed/92a4e366-f069-4b51-a1ee-14a816aec9f7/UfF37PYCIw.json"></iframe>
          </div>
        </div>
      )}

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
      <div className="mt-4 flex items-center justify-center gap-2">
        <input
          type="text"
          className="flex-1 px-6 py-4 rounded-full bg-[#0b2747] text-white focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="p-4 bg-[#0F3460] hover:bg-[#123d73] text-white rounded-full"
          onClick={() => sendMessage(input)}
        >
          <img src={sendIcon} className="w-6" alt="" />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
