import React, { useRef, useState, useEffect, useContext } from "react";
import questions from "../questions";
import Webcam from "react-webcam";
import { AdminContext } from "../Context/AdminProvider";
import ExamAlert from "./ExamAlert";

export default function OnlineExam() {
  const context = useContext(AdminContext);
  const [marks, updateMarks] = useState(0);
  let examTracker = new Map();
  const webcamRef = useRef(null);
  let disabled = false;

  useEffect(() => {
    const interval = setInterval(() => {
      captureImage();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  async function calculateMarks(index, optionSelected, correctAnswer) {
    if (examTracker.get(index) === undefined) {
      if (optionSelected === correctAnswer) {
        examTracker.set(index, true);
      }
      else {
        examTracker.set(index, false);
      }

      updateMarks((marks) => (optionSelected === correctAnswer ? marks + 1 : marks + 0));


    }
    else {
      if (examTracker.get(index) !== true) {
        if (optionSelected === correctAnswer) {
          examTracker.set(index, true);
        }
        else {
          examTracker.set(index, false);
        }
        updateMarks((marks) => (optionSelected === correctAnswer ? marks + 1 : marks + 0));
      }

    }

    console.log("The current marks is " + marks);
  }

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const captureImage = async () => {
    const image = webcamRef.current.getScreenshot();
    if (image) {
      context.sendFrame(image);
    }
  };


  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        screenshotQuality={0.6}
        videoConstraints={videoConstraints}
      />
      <div className="heading text-center">
        <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Online Test
        </h2>
      </div>
      <div className="questions-container">
        {questions.map((element, index) => (
          <div className="question-card my-7 mx-4 box bg-white px-7 py-7" key={index}>
            <h3 className="question-text my-3 text-center">{element.question}</h3>
            <div className="grid grid-rows-2 grid-cols-2 gap-4 question-options">

              {
                [element.option1, element.option2, element.option3, element.option4].map((option, i) => (
                  <div key={i}>
                    <button className="block items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500" onClick={() => { calculateMarks(i, option, element.answerkey) }} >
                      <a
                        href="#_"

                      >
                        <span className="relative">{option}</span>
                      </a>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      <div role="button" className="submit text-center text-red-600 rounded-lg shadow-2xl group">
        <a
          href="#_"
          className="relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
        >
          <span className="relative text-white">Submit Answer</span>
        </a>
      </div>
      </div>
      
    </div>
  );
}

