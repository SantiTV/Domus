import React, { useState, useRef, useEffect } from "react";
import "../styles/Chat.css";

const ChatWidget = ({ selectedUser }) => {
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMsg = { text: input, sender: "user" };
    const prevMsgs = messages[selectedUser.id] || [];
    setMessages({ ...messages, [selectedUser.id]: [...prevMsgs, newMsg] });
    setInput("");

    setTimeout(() => {
      const reply = { text: `Echo: ${input}`, sender: "bot" };
      setMessages((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), reply],
      }));
    }, 500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

  return (
    <div className="chat-container">
      <div className="chat-header">{selectedUser.name}</div>
      <div className="chat-messages">
        {(messages[selectedUser.id] || []).map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatWidget;
