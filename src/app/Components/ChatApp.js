"use client";
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const ChatApp = (props) => {
  const senderId = props.senderId;
  const receiverId = props.receiverId;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.emit("register", senderId);
    fetch(`http://localhost:3001/app/details/messages/${senderId}/${receiverId}`)
      .then((response) => response.json())
      .then((data) => setMessages(data));
    socket.on('receive_message', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
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
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage('');
    }
  };

  return (
    <div>
      <h2 style={{font:"bold",textAlign:"center"}}>{props.receiverName}-{receiverId}</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div
            className={`${
              msg.sender === senderId ? 'bg-gray-800 text-white' : 'bg-white text-black'
            }`}
            key={index}
            style={{ marginBottom: '10px', textAlign: msg.sender === senderId ? 'right' : 'left' }}
          >
            <p><strong>{msg.sender}:</strong> {msg.content}</p>
            <p style={{ fontSize: '12px', color: '#888' }}>
              {new Date(msg.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '80%', padding: '10px',border: '1px solid #ccc' }}
      />
      <button onClick={handleSendMessage} style={{ padding: '10px', marginLeft: '10px' }}>
        Send
      </button>
    </div>
  );
};

export default ChatApp;
