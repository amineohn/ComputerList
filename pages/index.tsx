import type { NextPage } from "next";
import React, { FormEvent, useState } from "react";
import FadeIn from "react-fade-in";
import { useRouter } from "next/router";
import Loading from "../components/loading";
import { Firebase } from "../libs/firebase";
import { Validate } from "../libs/validate";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [redirection, setRedirection] = useState(false);
  const router = useRouter();
  const { width, height } = useWindowSize();

  const check = new Validate();
  const fire = new Firebase();
  fire.stateChanged((user) => {
    if (user) {
      setRedirection(true);
      router.push("/hello");
    }
  });

  const setEmailChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const setPasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setRedirection(false);

    if (email.length === 0 || password.length === 0) {
      setLoading(false);
      setRedirection(false);
      setError("Please enter all fields");
      return;
    }

    if (password.length < 6) {
      setLoading(false);
      setRedirection(false);
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await fire.signIn(email, password, "users", "/hello", fire.id());
      await setRedirection(true);
      await setLoading(false);
      await setSuccess(true);
    } catch (error: any) {
      setLoading(false);
      setRedirection(false);
      const messages = check.errors(error.code, error.message);
      setError(messages);
    }
    setRedirection(false);
    setLoading(false);
    setRedirection(false);
  };

  return (
    <>
      <FadeIn className="lg:my-48 my-48 animate-scaleUp transition">
        {redirection && (
          <div className="flex items-center justify-center z-50">
            <div className="flex justify-center m-auto space-x-2">
              <svg
                className="flex justify-center animate-spin h-7 w-7 text-gray-800 mt-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="flex text-center text-lg font-medium m-auto">
                Redirection...
              </span>
            </div>
          </div>
        )}
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
                      setSuccess(false);
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
        <div className="container mx-auto px-4 py-16 max-w-xl transition-all duration-100 animate-heartbeat">
          <div className="flex flex-col items-center">
            <form method="POST" onSubmit={handleSubmit} className="space-y-2">
              <div className="mb-4">
                <label
                  className="block text-neutral-50 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={setEmailChange}
                  className="shadow appearance-none rounded-lg w-full py-2 px-3 bg-neutral-800 text-neutral-50 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-neutral-50 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={setPasswordChange}
                  className="shadow appearance-none rounded-lg w-full py-2 px-3 bg-neutral-800 text-neutral-50 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="***********"
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <button
                  className={
                    `py-2 px-5 flex justify-center items-center bg-blue-500 hover:bg-blue-700 focus:ring-blue-700 focus:ring-offset-blue-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg` +
                    (loading
                      ? "py-2 px-4 flex justify-center items-center bg-blue-500 hover:bg-blue-700 focus:ring-blue-700 focus:ring-offset-blue-100 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg animate-pulse cursor-not-allowed"
                      : "")
                  }
                  type="submit"
                  onClick={(e: any) => handleSubmit(e)}
                >
                  {loading ? (
                    <>
                      <Loading message="Chargement" />
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </FadeIn>
    </>
  );
};
export default Login;
