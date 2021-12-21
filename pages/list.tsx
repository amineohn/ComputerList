import { useEffect, useState } from "react";
import { Firebase } from "../libs/firebase";
import { Post } from "../libs/types";
import ReactPaginate from "react-paginate";

const List = () => {
  const fire = new Firebase();
  const [data, setData] = useState([{}] as any);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    fire
      .collection("computer")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const endOffset = itemOffset + 4;
        setData(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / 5));
      });
  }, [itemOffset, 5]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % data.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      {data.length > 0 ? (
        <div
          className={`flex items-center h-screen justify-center animate-heartbeat ${
            data ? `animate-heartbeat` : `animate-heartbeat`
          }`}
        >
          <div className="col-span-12">
            <div className="overflow-auto lg:overflow-visible">
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
                <tbody>
                  <>
                    {data &&
                      data.map((data: Post, index) => (
                        <tr className="bg-neutral-800" key={index}>
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
                            <span
                              className={`text-center ${
                                data.checked
                                  ? "bg-green-100 text-green-500"
                                  : "bg-red-100 text-red-500"
                              } rounded-md px-2`}
                            >
                              {data.checked ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="p-3"></td>
                        </tr>
                      ))}
                  </>

                  <div className="flex justify-center animate-heartbeat">
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      }
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 17l-5-5m0 0l5-5m-5 5h12"
                          />
                        </svg>
                      }
                      renderOnZeroPageCount={null || undefined}
                    />
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
                <tbody>
                  <tr className="bg-neutral-800">
                    <td className="p-3">
                      <div className="flex align-items-center">
                        <div className="ml-3">
                          <div className="">No data</div>
                          <div className="text-gray-500">No data</div>
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
                    <td className="p-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default List;
