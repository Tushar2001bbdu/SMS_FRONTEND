"use client";
import React, { useState } from 'react';
import Image from 'next/image';

function ChatBot() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful tutor.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatWindow, showChatWindow] = useState(false);

  const sendMessage = async () => {
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://project-backend.online/app/assignments/answerChat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();
      setMessages([...updatedMessages, data.reply]);
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Image
        src="/chatbot.png"
        alt="Chatbot"
        width={50}
        height={50}
        className="cursor-pointer"
        onClick={() => showChatWindow(!chatWindow)}
      />

      {chatWindow && (
        <div className="mt-2 bg-white p-4 rounded shadow-lg w-80 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2 mb-2">
            {messages.slice(1).map((msg, idx) => (
              <p key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
              </p>
            ))}
          </div>
          <textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full border rounded p-2"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
