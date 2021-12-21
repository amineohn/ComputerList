import React, { FormEvent, useState } from "react";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import FadeIn from "react-fade-in";
import { Firebase } from "../libs/firebase";
import router from "next/router";
import { NextSeo } from "next-seo";
import { configuration } from "../utils/configuration";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { width, height } = useWindowSize();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const fire = new Firebase();
  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fire.signUp(email, password);
      await fire.user()?.updateProfile({
        displayName: name,
      });
      setInterval(() => {
        setError("");
      }, 3500);
    } catch (error: any) {
      setError(error.message);
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      setError("L'email doit être valide");
      return;
    }

    try {
      await fire.collection("users").add({
        name,
        email,
        password,
      });
      setSuccess(true);
      setError("");
      return;
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue");
    }
    setSuccess(true);

    if (!name || !email || !password) {
      setInterval(() => {
        setError("");
      }, 3500);
      setError("Please enter all fields");
    }
    if (!email.includes("@") || !email.includes(".") || email.length < 5) {
      setInterval(() => {
        setError("");
      }, 3500);
      setError("Please enter a valid email");
    }
    if (success) {
      setSuccess(false);
    }
    if (error) {
      setError("");
    }
    if (password.length < 6) {
      setInterval(() => {
        setError("");
      }, 3500);

      setError("Password must be at least 6 characters");
      return;
    }
  };
  return (
    <>
      <NextSeo
        title={configuration.title}
        description={configuration.description}
        openGraph={{
          url: configuration.openGraph.url,
          title: configuration.openGraph.title,
          description: configuration.openGraph.description,
          images: [
            {
              url: configuration.openGraph.image,
              width: configuration.openGraph.width,
              height: configuration.openGraph.height,
              alt: configuration.openGraph.alt,
            },
          ],
        }}
      />
      {success && (
        <Confetti
          width={width}
          height={height}
          className="z-50 animate-conffeti"
        />
      )}
      <FadeIn className="lg:my-60 my-60 flex flex-col items-center justify-center animate-heartbeat">
        <div className="flex justify-center">
          {error && (
            <div className="p-8 bg-neutral-800 shadow-md hover:shodow-lg rounded-2xl !max-w-xl animate-heartbeat">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 rounded-2xl p-3 border border-neutral-800 text-neutral-400 bg-neutral-900"
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
                    <div className="font-medium leading-none text-neutral-100">
                      Error is there's fam ?
                    </div>
                    <p className="text-sm text-neutral-500 leading-none mt-1">
                      {error}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setError("");
                  }}
                  className="flex-no-shrink px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 bg-neutral-50 text-neutral-900 hover:bg-neutral-100 rounded-full"
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
                      <div className="font-medium leading-none text-neutral-100">
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
                      setSuccess(false);
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
        <div className="w-full max-w-xs">
          <form className="px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-neutral-50 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none rounded-lg w-full py-2 px-3 border border-neutral-800 bg-neutral-800 text-neutral-50 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-neutral-50 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none rounded-lg w-full py-2 px-3 border border-neutral-800 bg-neutral-800 text-neutral-50 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-neutral-50 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none rounded-lg w-full py-2 px-3 border border-neutral-800 bg-neutral-800 text-neutral-50 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="********"
                value={password}
                onChange={(e) => onChange(e)}
              />
              {password.length < 6 && (
                <p className="text-neutral-50 text-xs italic">
                  Password must contain at least 6 characters
                </p>
              )}
            </div>

            <div className="flex items-center justify-center">
              <button
                className="mt-3 py-2 px-4 flex justify-center items-center text-sm font-semibold bg-pink-50 text-pink-700 hover:bg-pink-100 transition ease-in duration-200 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="button"
                onClick={(e) => onSubmit(e)}
              >
                Sign Up
              </button>
            </div>
            {email !== "" || password !== "" || name !== "" ? (
              <div className="relative pt-1 animate-heartbeat">
                <span className="text-neutral-50">
                  {password.length + email.length + name.length < 100 &&
                    password.length + email.length + name.length + "%"}
                </span>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                  {password.length + email.length + name.length < 100 && (
                    <div
                      style={{
                        width:
                          (password.length + email.length + name.length) / 1 +
                          "%",
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500 transition animate-heartbeat"
                    ></div>
                  )}
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </FadeIn>
    </>
  );
};
export default SignUp;
