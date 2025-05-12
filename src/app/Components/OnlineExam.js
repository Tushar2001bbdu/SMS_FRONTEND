"use client"
import React, { useRef, useState, useEffect, useContext } from "react";
import questions from "../questions";
import Webcam from "react-webcam";
import { useDispatch, useSelector } from "react-redux";
import { sendFrame } from "@/app/redux/adminSlice";
import Alert from "./Alert";
import { FacultyContext } from "../Context/FacultyProvider";
import { RoleContext } from "@/app/Context/RoleProvider";
export default function OnlineExam() {
  const dispatch = useDispatch();
  const examNotification = useSelector((state) => state.admin.examNotification);
  const role=useContext(RoleContext)
  const faculty = useContext(FacultyContext);
  const [marks, setMarks] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Map()); // To track selected answers by student
  const examTracker = useRef(new Map());
  const webcamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      captureImage();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const calculateMarks = (index, optionSelected, correctAnswer) => {
    if (!selectedAnswers.has(index)) { // Prevent changing the answer once selected
      setSelectedAnswers((prevSelectedAnswers) => {
        const updatedAnswers = new Map(prevSelectedAnswers);
        updatedAnswers.set(index, { optionSelected, isCorrect: optionSelected === correctAnswer });
        return updatedAnswers;
      });

      setMarks((prevMarks) => prevMarks + (optionSelected === correctAnswer ? 1 : 0));
    }
  };

  const submitExam = async (e) => {
    console.log(role)
    console.log("the roll mumber is"+localStorage.getItem("rollno"))
    e.preventDefault();
    try {
      await faculty.updateResult("121078899",marks);
    } catch (error) {
      console.error("Error submitting exam", error);
    }
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      if (image) {
        dispatch(sendFrame(image));
      }
    }
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <div className="flex flex-col items-center w-full px-4 md:px-8">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        screenshotQuality={0.6}
        style={{ visibility: "hidden" }}
        videoConstraints={videoConstraints}
      />

      <div className="w-full mt-8 h-full">
        {examNotification !== null && examNotification !== "No suspicious activity detected" ? (
          <Alert message="Some Suspicious Activity Detected During Exam" />
        ) : (
          <div className="w-full max-w-3xl mt-8">
            <div className="heading text-center">
              <h2 className="mb-4 text-3xl md:text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
                Online Test
              </h2>
            </div>

            <section className="questions-container">
              {questions.map((element, index) => (
                <div
                  className="question-card my-7 mx-auto bg-white px-6 py-6 sm:px-8 sm:py-8 rounded-lg shadow-md w-full"
                  key={index}
                >
                  <h3 className="question-text my-3 text-center text-lg sm:text-xl font-semibold">
                    {element.question}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 question-options">
                    {[element.option1, element.option2, element.option3, element.option4].map((option, i) => {
                      const selectedAnswer = selectedAnswers.get(index); // Get the selected answer for this question
                      const isSelected = selectedAnswer && selectedAnswer.optionSelected === option;
                      const isCorrect = selectedAnswer && selectedAnswer.isCorrect;

                      return (
                        <button
                          key={i}
                          className={`block items-center justify-center px-4 py-3 text-base font-medium text-center border rounded-lg shadow-sm cursor-pointer 
                            ${isSelected ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-white'}`}
                          onClick={() => calculateMarks(index, option, element.answerkey)}
                          disabled={selectedAnswer}
                        >
                          <span className="relative">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex justify-center mt-6">
                <button
                  className="relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-blue-600 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-blue-600 hover:shadow-blue-600 hover:before:border-[25px]"
                  onClick={submitExam}
                >
                  <span className="relative z-10">Submit Answer</span>
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
