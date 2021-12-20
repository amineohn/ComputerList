import { useState } from "react";
import { Firebase } from "../libs/firebase";
import { Errors } from "../libs/types";
import { Validate } from "../libs/validate";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
const Hello = () => {
  const [comment, setComment] = useState("");
  const [computer, setComputer] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fire = new Firebase();
  const { width, height } = useWindowSize();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        computer.length === 0 ||
        model.length === 0 ||
        serial.length === 0 ||
        comment.length === 0
      ) {
        setError("Please fill all fields");
      } else {
        fire.create("computer", {
          comment,
          computer,
          model,
          serial,
        });
        setSuccess("yeaah");
        setComputer("");
        setModel("");
        setSerial("");
        setComment("");
      }
      if (comment.length > 300) {
        setError("Comment cannot be more than 300 characters");
      }
    } catch (error: Errors | any) {
      const check = new Validate();
      const messages = check.errors(error.code, error.message);
      setError(messages);
    }
  };

  return (
    <div className="mx-5 animate-scaleUp">
      <div className="my-60 lg:my-60 h-screen space-y-2">
        <div className="flex justify-center">
          {error && (
            <div className="p-8 bg-gray-800 shadow-md hover:shodow-lg rounded-2xl !max-w-xl animate-heartbeat">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 rounded-2xl p-3 border border-gray-800 text-blue-400 bg-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div className="flex flex-col ml-3">
                    <div className="font-medium leading-none text-gray-100">
                      Error is there's fam ?
                    </div>
                    <p className="text-sm text-gray-500 leading-none mt-1">
                      {error}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setError("");
                  }}
                  className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
          {success && (
            <>
              <Confetti width={width} height={height} className="z-50" />

              <div className="p-8 bg-pink-800 shadow-md hover:shodow-lg rounded-2xl max-w-md animate-heartbeat">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-16 h-16 rounded-2xl p-3 border border-pink-800 text-pink-400 bg-pink-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <div className="flex flex-col ml-3">
                      <div className="font-medium leading-none text-gray-100">
                        nice gg
                      </div>
                      <p className="text-sm text-gray-500 leading-none mt-1">
                        {success}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSuccess("");
                    }}
                    className="flex-no-shrink bg-pink-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-pink-500 text-white rounded-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="container mx-auto px-4 space-y-5 max-w-xs">
          <h1 className="text-2xl font-bold text-neutral-50">Add a Computer</h1>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <input
                className="transition flex-1 appearance-none border border-neutral-800 w-full py-2 px-4 bg-neutral-800 text-neutral-50 placeholder-neutral-50 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                type="text"
                placeholder="Name of Computer"
                value={computer}
                onChange={(e) => setComputer(e.target.value)}
              />
              <input
                className="transition flex-1 appearance-none border border-neutral-800 w-full py-2 px-4 bg-neutral-800 text-neutral-50 placeholder-neutral-50 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                type="text"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <input
                className="transition flex-1 appearance-none border border-neutral-800 w-full py-2 px-4 bg-neutral-800 text-neutral-50 placeholder-neutral-50 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                type="text"
                placeholder="Serial Number"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
              />
              <textarea
                className="transition flex-1 appearance-none border border-neutral-800 w-full py-2 px-4 bg-neutral-800 text-neutral-50 placeholder-neutral-50 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                id="comment"
                placeholder="Enter your comment"
                name="comment"
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                cols={40}
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-3 py-2 px-4 flex justify-center items-center text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition ease-in duration-200 text-center focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Add Computer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Hello;
