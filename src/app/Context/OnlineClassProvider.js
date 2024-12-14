import React, { createContext, useMemo, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const OnlineClassContext = createContext(null);

export const OnlineClassProvider = (props) => {
  const [signature, setSignature] = useState(null);

  const socket = useMemo(() => {
    try {
      return io("http://localhost:3001", {
        transports: ["websocket"], // Ensure only WebSocket transport is used to avoid CORS issues
        withCredentials: true, // Send credentials (if needed, like cookies) with CORS requests
      });
    } catch (error) {
      console.error("Socket connection error:", error);
      return null;
    }
  }, []);
  const generateSignature = async (meetingNumber, role) => {
    try {
      let response = await fetch("http://localhost:3001/app/onlineClass/generateSignature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: role,
        }),
      });
      response = await response.json();
      console.log(response)
      setSignature(response);
    } catch (error) {
      console.error("Error generating signature:", error);
    }
  };

  return (
    <OnlineClassContext.Provider value={{ socket, generateSignature, signature }}>
      {props.children}
    </OnlineClassContext.Provider>
  );
};
