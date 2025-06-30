const OnlineClass = () => {
  return (
    <div className="container mx-auto flex justify-center">
      <div className="sm:w-auto">
        <iframe
          src="https://meet.jit.si/MyOnlineClassRoom123"
          className="block h-screen"
          style={{ width: "800px", maxWidth: "100%" }}
          allow="camera; microphone; fullscreen; display-capture"
        />
      </div>
    </div>
  );
};
export default OnlineClass;
