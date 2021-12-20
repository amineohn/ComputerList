import { FormEvent, useState } from "react";
import { Firebase } from "../libs/firebase";
import { Errors } from "../libs/types";
import { Validate } from "../libs/validate";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import router from "next/router";
const Hello = () => {
  const [checked, setChecked] = useState(false);
  const [computer, setComputer] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fire = new Firebase();
  const { width, height } = useWindowSize();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        computer.length === 0 ||
        model.length === 0 ||
        serial.length === 0 ||
        checked === false
      ) {
        setError("Please fill all fields");
      } else {
        fire.create("computer", {
          checked,
          computer,
          model,
          serial,
          date: new Date().toLocaleString(),
        });
        setSuccess("yeaah");
        setComputer("");
        setModel("");
        setSerial("");
        setChecked(true);
      }
    } catch (error: Errors | any) {
      const check = new Validate();
      const messages = check.errors(error.code, error.message);
      setError(messages);
    }
  };
  return (
    <>
      {success && (
        <Confetti
          width={width}
          height={height}
          className="z-50 animate-conffeti"
        />
      )}
      <div className="my-60 mx-5 animate-scaleUp space-y-2">
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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
                  className="flex-no-shrink px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 bg-blue-50 text-blue-900 hover:bg-blue-100 rounded-full"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
          {success && (
            <>
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <div className="flex flex-col ml-3">
                      <div className="font-medium leading-none text-gray-100">
                        nice gg
                      </div>
                      <p className="text-sm text-pink-200 leading-none mt-1">
                        {success}
                      </p>
                      <a
                        className="text-sm text-pink-500 font-bold leading-none mt-1 cursor-pointer"
                        onClick={() => router.push("/list")}
                      >
                        List of computers
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSuccess("");
                    }}
                    className="flex-no-shrink  px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 bg-pink-50 text-pink-700 hover:bg-pink-100 rounded-full"
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
                className="transition flex-1 appearance-none border border-neutral-800 w-full py-2 px-4 bg-neutral-800 text-neutral-50 placeholder-neutral-50 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                type="text"
                placeholder="Name of Computer"
                value={computer}
                onChange={(e) => setComputer(e.target.value)}
              />
              <input
                className="transition flex-1 appearance-none border border-neutral-800 w-full py-2 px-4 bg-neutral-800 text-neutral-50 placeholder-neutral-50 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                type="text"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <input
                className="transition flex-1 appearance-none border border-neutral-800 w-full py-2 px-4 bg-neutral-800 text-neutral-50 placeholder-neutral-50 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                type="text"
                placeholder="Serial Number"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
              />
              <label className="inline-flex items-center mt-3">
                <input
                  id="checked"
                  placeholder="checked"
                  name="checked"
                  type="checkbox"
                  onChange={(e) => setChecked(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-pink-600 rounded-lg transition bg-neutral-800 select-none"
                />
                <span className="ml-2 text-neutral-50 text-sm">
                  Computer is checked
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="mt-3 py-2 px-4 flex justify-center items-center text-sm font-semibold bg-pink-50 text-pink-700 hover:bg-pink-100 transition ease-in duration-200 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Add Computer
            </button>
          </form>
          {checked == true ||
          serial !== "" ||
          model !== "" ||
          computer !== "" ? (
            <div className="relative pt-1 animate-heartbeat">
              <span className="text-neutral-50">
                {computer.length + serial.length + model.length < 100 &&
                  computer.length + serial.length + model.length + "%"}
              </span>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                {computer.length + serial.length + model.length < 100 && (
                  <div
                    style={{
                      width:
                        (computer.length + serial.length + model.length) / 3 +
                        "%",
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500 transition animate-heartbeat"
                  ></div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default Hello;
