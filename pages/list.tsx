import { useState } from "react";
import { Firebase } from "../libs/firebase";
import { Post, Selected } from "../libs/types";
import ReactPaginate from "react-paginate";

const List = () => {
  const fire = new Firebase();
  const [data, setData] = useState([{}] as any);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  fire
    .collection("computer")
    .orderBy("date", "desc")
    .onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // we use endAfter to get the last 8 items
      const endOffset = itemOffset + 8;
      // set data with pagination slice.
      setData(data.slice(itemOffset, endOffset));

      // we set the page count to the total number of items divided by 8
      setPageCount(Math.ceil(data.length / 8));
    });
  const handlePageClick = (event: Selected) => {
    const selectedPage = event.selected as any;
    // const newOffset = (event.selected * 8) % data.length;
    const offset = selectedPage * 10;
    setItemOffset(offset);
  };
  const download = () => {
    const csvData = [
      ...data.map((item) => [
        item.serial.replace(/\s/g, "").toUpperCase(),
        item.computer.replace(/\s/g, "").toUpperCase(),
        item.model.replace(/\s/g, "").toUpperCase(),
        item.date.replace(/\s/g, "").toUpperCase(),
      ]),
    ].join("\n");
    const csv = new Blob([csvData], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(csv);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <div className="mx-10">
        <>
          {data.length > 0 ? (
            <div
              className={`flex items-center h-screen justify-center animate-heartbeat ${
                data ? `animate-heartbeat` : `animate-heartbeat`
              }`}
            >
              <button
                className="fixed bottom-0 middle-0 right-0 m-4 p-2 bg-pink-100 text-pink-400 hover:bg-pink-50 transition hover:text-pink-500 rounded-2xl shadow-lg"
                onClick={download}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="currentColor"
                    d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"
                  ></path>
                </svg>
              </button>
              <div className="col-span-12">
                <div className="">
                  <table className="table text-neutral-400 border-separate space-y-6 text-sm max-w-xl">
                    <thead className="bg-neutral-800 text-neutral-500">
                      <tr>
                        <th className="p-3">Computer</th>
                        <th className="p-3 text-left">Serial Number</th>
                        <th className="p-3 text-left">Model</th>
                        <th className="p-3 text-left">Checked</th>
                        <th className="p-3 text-left"></th>
                      </tr>
                    </thead>
                    <tbody className="">
                      <>
                        {data &&
                          data.map((data: Post, index: string) => (
                            <tr className="bg-neutral-800" key={index}>
                              <td className="p-3">
                                <div className="flex align-items-center">
                                  <div className="ml-3">
                                    <div className="">{data.computer}</div>
                                    <div className="text-neutral-500">
                                      {data.date}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">
                                <span className="bg-neutral-900 z-50 lg:p-2 w-full p-1 rounded-lg text-neutral-50 text-xs lg:text-xs">
                                  {data.serial}
                                </span>
                              </td>
                              <td className="p-3 font-bold">{data.model}</td>
                              <td className="p-3 text-center">
                                <span
                                  className={`text-center rounded-md px-2 ${
                                    data.checked
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {data.checked ? "✓" : "✗"}
                                </span>
                              </td>
                              <td className="p-3"></td>
                            </tr>
                          ))}
                      </>

                      <div className="flex justify-center animate-heartbeat">
                        {pageCount > 1 && (
                          <ReactPaginate
                            breakLabel="..."
                            nextLabel={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            }
                            onPageChange={handlePageClick as any}
                            pageRangeDisplayed={10}
                            pageCount={pageCount}
                            previousLabel={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                                />
                              </svg>
                            }
                            renderOnZeroPageCount={null || undefined}
                          />
                        )}
                      </div>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center h-screen justify-center animate-heartbeat">
              <div className="col-span-12">
                <div className="overflow-auto lg:overflow-visible">
                  <table className="table text-neutral-400 border-separate space-y-6 text-sm">
                    <thead className="bg-neutral-800 text-neutral-500">
                      <tr>
                        <th className="p-3">Computer</th>
                        <th className="p-3 text-left">Serial Number</th>
                        <th className="p-3 text-left">Model</th>
                        <th className="p-3 text-left">Checked</th>
                        <th className="p-3 text-left"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-neutral-800">
                        <td className="p-3">
                          <div className="flex align-items-center">
                            <div className="ml-3">
                              <div className="">No data</div>
                              <div className="text-neutral-500">No data</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">No data</td>
                        <td className="p-3 font-bold">No data</td>
                        <td className="p-3 text-center">
                          <span
                            className={`text-center ${
                              data.checked
                                ? "bg-green-100 text-green-500"
                                : "bg-red-100 text-red-500"
                            } rounded-md px-2`}
                          >
                            No data
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex justify-center">
                            <div className="">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 17l-5-5m0 0l5-5m-5 5h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};
export default List;
