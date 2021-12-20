import { useEffect, useState } from "react";
import { Firebase } from "../libs/firebase";
import { Post } from "../libs/types";

const list = () => {
  const fire = new Firebase();
  const [data, setData] = useState([{}] as any);
  useEffect(() => {
    fire
      .collection("computer")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(data);
      });
  }, []);
  return (
    <>
      <div
        className={`flex items-center justify-center min-h-screen mx-10 lg:mx-10 animate-heartbeat ${
          data ? `animate-heartbeat` : ``
        }`}
      >
        <div className="col-span-12">
          <div className="overflow-auto lg:overflow-visible ">
            <table className="table text-gray-400 border-separate space-y-6 text-sm">
              <thead className="bg-neutral-800 text-gray-500">
                <tr>
                  <th className="p-3">Computer</th>
                  <th className="p-3 text-left">Serial Number</th>
                  <th className="p-3 text-left">Model</th>
                  <th className="p-3 text-left">Checked</th>
                  <th className="p-3 text-left"></th>
                </tr>
              </thead>
              <tbody className="h-28 overflow-auto">
                {data.map((data: Post) => (
                  <tr className="bg-neutral-800">
                    <td className="p-3">
                      <div className="flex align-items-center">
                        <div className="ml-3">
                          <div className="">{data.computer}</div>
                          <div className="text-gray-500">{data.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{data.serial}</td>
                    <td className="p-3 font-bold">{data.model}</td>
                    <td className="p-3 text-center">
                      <span className="text-center bg-green-100 text-green-500 rounded-md px-2">
                        {data.checked ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-3"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default list;
