"use client";
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const ChatApp = ({ senderId, receiverId, receiverName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    socket.emit("register", senderId);
    fetch(`http://localhost:3001/app/details/messages/${senderId}/${receiverId}`)
      .then((response) => response.json())
      .then((data) => setMessages(data));
    
    socket.on('receive_message', (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [senderId, receiverId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData = {
        sender: senderId,
        receiver: receiverId,
        content: message,
        timestamp: new Date().toISOString(),
      };
      socket.emit('send_message', messageData);
      setMessages((prev) => [...prev, messageData]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-center font-bold text-xl mb-2">{receiverName} - {receiverId}</h2>

      <div className="border border-gray-300 p-4 flex-1 overflow-y-scroll rounded-md bg-white dark:bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-md max-w-xs ${
              msg.sender === senderId
                ? 'ml-auto bg-gray-800 text-white text-right'
                : 'mr-auto bg-gray-200 text-black text-left'
            }`}
          >
            <p className="text-sm font-semibold">{msg.sender}</p>
            <p>{msg.content}</p>
            <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="mt-2 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSendMessage}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`ml-2 px-4 py-2 rounded-md border ${
            hovered ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
