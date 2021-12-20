import { useEffect, useState } from "react";
import { Firebase } from "../libs/firebase";
import { Post } from "../libs/types";

const list = () => {
  const fire = new Firebase();
  const [data, setData] = useState([{}] as any);
  useEffect(() => {
    fire
      .collection("computer")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(data);
      });
  }, []);
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center">
        <div className="space-y-2">
          <div className="gap-2 grid grid-cols-1 lg:grid-cols-4">
            {data.map((data: Post) => (
              <div className="bg-neutral-800 w-72 shadow-lg rounded-xl p-4">
                <p className="text-neutral-600 dark:text-white">
                  <span className="font-bold text-blue-400 text-lg">“</span>
                  <span className="text-neutral-50">
                    {data.comment ? data.comment : "No comment"}
                  </span>
                  <span className="font-bold text-blue-400 text-lg">”</span>
                </p>
                <div className="flex items-center mt-4">
                  <a href="#" className="block relative">
                    <img
                      alt="profil"
                      src={
                        data.userPhotoUrl
                          ? data.userPhotoUrl
                          : "/static/images/default.svg"
                      }
                      className="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  </a>
                  <div className="flex flex-col ml-2 justify-between">
                    <span className="font-semibold text-blue-400 text-sm">
                      {data.userName ? data.userName : "Anonymous"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default list;
