"use client";
import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import TextField from '@mui/material/TextField';
import { Space_Grotesk } from '@next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'],weight:["500"] });

const GroupChatApp = (props) => {
    const socket = useMemo(() => {
    return io('http://localhost:3001/group-chat');
  }, []);
 
  const senderId = props.senderId;
  const groupId  = props.groupName;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    socket.emit("join-group", {groupId:groupId});
    let fetchMessages=()=>{
    fetch(`http://localhost:3001/app/details/groupMessages/${groupId}`,{
    method: 'GET',
    headers: {
        "authorization":localStorage.getItem("firebaseToken")
    }})
      .then((response) => response.json())
      .then((data) => setMessages(data?.data));
    }
    fetchMessages();
    socket.on('new-message', (message) => {
        console.log(message)
        setMessages((prevMessages) => [...prevMessages, message.message]);
    });
    
    return () => {
      socket.off('new-message');
    };
  }, [senderId, groupId,socket]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData = {
        sender: senderId,
        receiver: groupId,
        content: message,
        timestamp: new Date().toISOString(),
      };
      socket.emit('send-message', { message: messageData });
        setMessages((prevMessages) => [...prevMessages, messageData]);
    
      setMessage('');
    }
  };

  return (
    <div className={spaceGrotesk.className}>
      <header style={{ font: "bold", textAlign: "center" }} className=" text-2xl hover:text-white">{groupId}</header>
      <div className='sm:width-screen lg:width-full  max-h-[70vh] overflow-y-scroll' style={{ border: '1px solid #ccc', padding: '10px' }}>
        {messages?.map((msg, index) => (
          <div
            className={`${
              msg.sender === senderId ? 'bg-blue-400 text-white' : 'bg-white text-black'
            }`}
            key={index}
            style={{ marginBottom: '20px', textAlign: msg.sender === senderId ? 'right' : 'left', padding: '10px',maxWidth:"auto", borderRadius: '12px'}}
          >
            <p><strong>{msg.sender}:</strong> {msg.content}</p>
            <p style={{ width:"auto",fontSize: '12px', color: '#888' }}>
              {new Date(msg.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className='mt-2 flex justify-center'>
        
        <TextField className="w-3/4" value={message} sx={{
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
    }}}
          onChange={(e) => setMessage(e.target.value)} />

        <button
          onClick={handleSendMessage}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-1/4"
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

export default GroupChatApp;
