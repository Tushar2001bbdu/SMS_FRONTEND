"use client";
import React, { useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = "129b19ea587f431284a23d942c2ba5b9";
const CHANNEL = "test-classroom"; 
const TOKEN = "007eJxTYHhbOmXD0uf7TEv+cdV+iD1+2SxfQvZgkJDXh7qiX+2Tfl9WYDA0skwytExNNLUwTzMxNjSyMEk0Mk6xNDFKNkpKNE2yzJmpkdEQyMhgy7iVmZEBAkF8PoaS1OIS3eScxOLiovz8XAYGAE4jJLA=";
const UID = Math.floor(Math.random() * 10000);

const OnlineCall = () => {
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);
  const client = useRef<any>(null);

  useEffect(() => {
    const init = async () => {
      client.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      await client.current.join(APP_ID, CHANNEL, TOKEN, UID);

      const localTrack = await AgoraRTC.createCameraVideoTrack();
      if(localVideoRef.current!==null){
      localTrack.play(localVideoRef.current);}

      client.current.publish([localTrack]);

      client.current.on("user-published", async (user: any, mediaType: any) => {
        await client.current.subscribe(user, mediaType);
        if (mediaType === "video") {
          user.videoTrack.play(remoteVideoRef.current);
        }
      });
    };

    init();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div ref={localVideoRef} className="w-1/2 h-64 bg-black" />
      <div ref={remoteVideoRef} className="w-1/2 h-64 bg-black" />
    </div>
  );
};

export default OnlineCall;
