import React, { useState, useContext } from "react";
import { FacultyContext } from "../Context/FacultyProvider";

export default function UpdateStudentResult(props) {
  const [marks, setMarks] = useState(0);
  const context = useContext(FacultyContext);
  function handleChange(e) {
    setMarks(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    context.updateResult(props.rollno, marks);
  }
  return (
    <div>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        class={`${props.visbility} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Update Student Result
              </h3>
              <button
                type="button"
                class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div class="p-4 md:p-5">
              <form
                class="space-y-4"
                action="#"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div>
                  <label
                    for="rollno"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Student Email
                  </label>
                  <input
                    type="text"
                    name="rollno"
                    id="rollno"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    value={props.rollno}
                    required
                  />
                </div>
                <div>
                  <label
                    for="marks"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Student Marks
                  </label>
                  <input
                    type="text"
                    name="marks"
                    id="marks"
                    value={marks}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update Marks
                </button>
                <button
                  type="exit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    props.setVisibilty("hidden");
                  }}
                >
                  Close Modal
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
