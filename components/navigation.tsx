import React, { useEffect, useState } from "react";
import { Firebase } from "../libs/firebase";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";
const Navigation = () => {
  const router = useRouter();
  const fire = new Firebase();
  const [showModal, setShowModal] = useState(false);
  const [blur, setBlur] = useState(0);
  useEffect(() => {
    const onScroll = () => setBlur(window.scrollY / 200);

    window.addEventListener("scroll", onScroll);

    return function cleanup() {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <>
      <Transition
        show={showModal}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <nav
          className={`fixed z-auto inset-0 flex items-start justify-end mt-28 mr-5 ${
            blur ? `backdrop-blur-sm` : ""
          }`}
        >
          <div className="fixed inset-0">
            <div className="absolute inset-0" />
          </div>
          <div className="relative bg-neutral-800 text-gray-300 p-4 rounded-lg shadow-lg flex flex-col w-64">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src={
                    (fire.photoUrl() as string)
                      ? (fire.photoUrl() as string)
                      : (fire.defaultPhotoUrl() as string)
                  }
                  alt={fire.userName() as string}
                />
                <div className="ml-3">
                  <p className="text-sm font-semibold text-pink-50">
                    {fire.userName() ? fire.userName() : "Anonymous"}
                  </p>
                  <p className="text-xs text-pink-100">
                    {fire.email() ? fire.email() : "anonymous@email.com"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              {!fire.user() ? (
                <>
                  <a
                    onClick={() => {
                      router.push("/");
                      setShowModal(false);
                    }}
                    className="cursor-pointer group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md focus:outline-none bg-pink-50 text-pink-700 hover:bg-pink-100 transition ease-in-out duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="mr-4 h-5 w-5 transition ease-in-out duration-150"
                    >
                      <path
                        fill="currentColor"
                        d="M416 448h-84c-6.6 0-12-5.4-12-12v-24c0-6.6 5.4-12 12-12h84c26.5 0 48-21.5 48-48V160c0-26.5-21.5-48-48-48h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zM167.1 83.5l-19.6 19.6c-4.8 4.8-4.7 12.5.2 17.1L260.8 230H12c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h248.8L147.7 391.7c-4.8 4.7-4.9 12.4-.2 17.1l19.6 19.6c4.7 4.7 12.3 4.7 17 0l164.4-164c4.7-4.7 4.7-12.3 0-17l-164.4-164c-4.7-4.6-12.3-4.6-17 .1z"
                      ></path>
                    </svg>
                    <span className="">Sign In</span>
                  </a>
                </>
              ) : (
                <>
                  {router.pathname !== "/list" ? (
                    <a
                      onClick={() => {
                        router.push("/list");
                        setShowModal(false);
                      }}
                      className="cursor-pointer group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md focus:outline-none bg-pink-50 text-pink-700 hover:bg-pink-100 transition ease-in-out duration-150"
                    >
                      <svg
                        className="mr-4 h-5 w-5  transition ease-in-out duration-150"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path
                          fill="currentColor"
                          d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z"
                        />
                      </svg>
                      <span>List</span>
                    </a>
                  ) : null}
                  {router.pathname === "/list" ? (
                    <a
                      onClick={() => {
                        router.push("/");
                        setShowModal(false);
                      }}
                      className="cursor-pointer group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md focus:outline-none bg-pink-50 text-pink-700 hover:bg-pink-100 transition ease-in-out duration-150"
                    >
                      <svg
                        className="mr-4 h-5 w-5  transition ease-in-out duration-150"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M480 160H32c-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z"
                        ></path>
                      </svg>
                      <span>Computer</span>
                    </a>
                  ) : null}

                  <a
                    onClick={() => {
                      fire.signOut();
                      router.push("/");
                      setShowModal(false);
                    }}
                    className="cursor-pointer group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md focus:outline-none bg-pink-50 text-pink-700 hover:bg-pink-100 transition ease-in-out duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="mr-4 h-5 w-5 transition ease-in-out duration-150"
                    >
                      <path
                        fill="currentColor"
                        d="M272 112v51.6h-96c-26.5 0-48 21.5-48 48v88.6c0 26.5 21.5 48 48 48h96v51.6c0 42.6 51.7 64.2 81.9 33.9l144-143.9c18.7-18.7 18.7-49.1 0-67.9l-144-144C323.8 48 272 69.3 272 112zm192 144L320 400v-99.7H176v-88.6h144V112l144 144zM96 64h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-53 0-96-43-96-96V160c0-53 43-96 96-96z"
                      ></path>
                    </svg>
                    <span>Logout</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </nav>
      </Transition>

      <div className="fixed z-50 top-0 inset-x-0 p-6 transition duration-500 ease-in-out transform lg:bg-transparent lg:bg-opacity-100 backdrop-blur-sm bg-opacity-20">
        <div className="absolute inset-0 flex">
          <div
            className="w-1/2 h-full"
            onClick={() => setShowModal(!showModal)}
          ></div>
        </div>
        <div className="relative z-10 flex-1 flex flex-col overflow-y-auto">
          <div className="flex-shrink-0 flex items-center px-4 py-3">
            <div className="flex-1 text-white">
              <h3 className="font-semibold text-xl tracking-tight"></h3>
            </div>
            <div className="flex-shrink-0">
              {showModal ? (
                <button
                  className="p-1 fill-current text-white focus:outline-none focus:shadow-outline"
                  aria-label="Close sidebar"
                  onClick={() => setShowModal(!showModal)}
                >
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className="p-1 text-white focus:outline-none focus:shadow-outline"
                  aria-label="Close sidebar"
                  onClick={() => setShowModal(!showModal)}
                >
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
