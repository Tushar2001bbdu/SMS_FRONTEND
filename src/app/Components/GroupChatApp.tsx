"use client";
import React, { useState, useEffect, useMemo, useContext } from "react";
import io from "socket.io-client";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Space_Grotesk } from "next/font/google";
import { StudentContext } from "@/app/Context/StudentProvider";
import FilePresentIcon from '@mui/icons-material/FilePresent';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500"] });
interface Props {
  senderName: string;
  groupName: string;
  senderRollNo: string;
}
interface StudentContextType {
  StudentDetails: () => Promise<any>;
  studentData: any;
  getStudentResult: () => Promise<any>;
  getAssignmentUrl?: (filename: string) => Promise<any>;
  uploadUrl?: string;
  studentResult: any;
}

const Page: React.FC<Props> = ({ senderName,senderRollNo, groupName }) => {
  const student = useContext<StudentContextType | null>(StudentContext);
  const socket = useMemo(() => io("http://localhost:3001/group-chat"), []);
  const groupId = groupName;
  interface SenderData{
    rollNo:string,
    name:string
  }
  interface Message {
    sender: SenderData;
    receiver: string;
    content: string;
    timestamp: string;
    mediaUrl?: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    socket.emit("join-group", { groupId });

    const fetchMessages = () => {
      fetch(`http://localhost:3001/app/details/groupMessages/${groupId}`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("firebaseToken") || "",
        } as HeadersInit,
      })
        .then((response) => response.json())
        .then((data) => setMessages(data?.data));
    };

    fetchMessages();

    socket.on("new-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message.message]);
    });

    return () => {
      socket.off("new-message");
    };
  }, [senderRollNo, groupId, socket]);

  const handleSendMessage = async () => {
    if (student?.getAssignmentUrl && selectedFile) {
      student?.getAssignmentUrl(selectedFile?.name);
    }
    if (message.trim() && student?.uploadUrl) {
      await fetch(student?.uploadUrl, {
        method: "PUT",
        body: selectedFile,
        headers: {
          "Content-Type": selectedFile?.type || "",
        } as HeadersInit,
      });

      const messageData = {
        sender: {
          rollNo: senderRollNo,
          name: senderName
        },
        receiver: groupId,
        content: message,
        mediaUrl: `https://assignmentsolutions.s3.ap-south-1.amazonaws.com/${selectedFile?.name}`,
        timestamp: new Date().toISOString(),
      };
      socket.emit("send-message", { message: messageData });
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage("");
    }
  };
  const handleFileChange = (event: any) => {
    if (event.target.files?.[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className={spaceGrotesk.className}>
      <header
        style={{ font: "bold", textAlign: "center" }}
        className="text-2xl hover:text-white"
      >
        {groupId}
      </header>
      <div className="w-full max-h-[70vh] overflow-y-scroll border border-gray-300 p-2">

        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg.sender.rollNo === senderRollNo
                ? "bg-blue-400 text-white"
                : "bg-white text-black"
            }`}
            style={{
              marginBottom: "20px",
              textAlign: msg.sender.rollNo === senderRollNo ? "right" : "left",
              padding: "10px",
              borderRadius: "12px",
            }}
          >
            <p>
              <strong>{msg.sender.name} - {msg.sender.rollNo}:</strong>{" "}
              {msg.mediaUrl ? (
                <a
                  href={msg.mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FilePresentIcon/> {msg.content}
                </a>
              ) : (
                msg.content
              )}
            </p>
            <p style={{ fontSize: "12px", color: "#888" }}>
              {new Date(msg.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-2 flex flex-col md:flex-row items-center gap-2 w-full px-4">
  <Button
    variant="contained"
    component="label"
    startIcon={<UploadFileIcon />}
    className="w-full md:w-auto"
  >
    Add File
    <input type="file" hidden onChange={handleFileChange} />
  </Button>

  <TextField
    className="w-full md:w-2/3"
    value={message}
    sx={{
      "& .MuiOutlinedInput-root": {
        backgroundColor: "white",
      },
    }}
    onChange={(e) => setMessage(e.target.value)}
  />

  <button
    onClick={handleSendMessage}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    className="w-full md:w-1/4"
    style={{
      padding: "10px",
      backgroundColor: hovered ? "#2d2d2d" : "transparent",
      color: hovered ? "white" : "black",
      borderRadius: "10%",
      border: "1px solid black",
    }}
  >
    Send
  </button>
</div>

    </div>
  );
};

export default Page;
