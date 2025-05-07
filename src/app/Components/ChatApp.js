import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://43.204.234.139:3001');

const ChatApp = (props) => {
  const senderId = props.senderId;
  const receiverId = props.receiverId;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    socket.emit("register", senderId);
    fetch(`http://43.204.234.139:3001/app/details/messages/${senderId}/${receiverId}`)
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
      <h2 style={{ font: "bold", textAlign: "center" }}>{props.receiverName}-{receiverId}</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div
            className={`${
              msg.sender === senderId ? 'bg-gray-800 text-white' : 'bg-white text-black'
            }`}
            key={index}
            style={{ marginBottom: '10px', textAlign: msg.sender === senderId ? 'right' : 'left',width:'auto' , padding: '10px', borderRadius: '10px'}}
          >
            <p><strong>{msg.sender}:</strong> {msg.content}</p>
            <p style={{ fontSize: '12px', color: '#888' }}>
              {new Date(msg.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className='mt-2'>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ width: '80%', padding: '10px', borderRadius: "10%", border: "1px solid black" }}
        />
        <button
          onClick={handleSendMessage}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            padding: '10px',
            marginLeft: '10px',
            backgroundColor: hovered ? '#2d2d2d' : 'transparent',
            color: hovered ? 'white' : 'black',
            borderRadius: '10%',
            border: '1px solid black'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
