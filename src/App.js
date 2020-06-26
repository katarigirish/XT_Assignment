import React, { useState, useEffect } from "react";
import { Chart } from "react-charts";
import moment from "moment";

function App() {
  const [loading, setLoading] = useState(() => false);
  const [page, setPage] = useState(() => 0);
  const [state, setState] = useState(() => ({}));
  const data = React.useMemo(
    () => [
      {
        label: "ID",
        data: state?.hits?.map((hit, index) => [index, hit.objectID ?? 0]) ?? []
      },
      {
        label: "Votes",
        data: state?.hits?.map((hit, index) => [index, hit.points ?? 0]) ?? []
      }
    ],
    [state]
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );
  useEffect(() => {
    let didMount = true;
    const start = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://hn.algolia.com/api/v1/search?page=${page}`
        );
        const json = await response.json();
        if (didMount) {
          setState(json);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    start();
    return () => (didMount = false);
  }, [page]);
  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Comments
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Vote Count
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Up Vote
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    News Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {state?.hits?.map((hit, index) => (
                  <tr key={hit?.objectID ?? index}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {hit?.num_comments ?? 0}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      {hit?.points ?? 0}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span
                        className="cursor-pointer"
                        onClick={() =>
                          alert("hey, hacker!!! not yet implemented 🤣")
                        }
                      >
                        ▲
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                      {hit?.title ?? ""} {hit?.url ? hit.url : ""} by{" "}
                      {hit?.author ?? ""}{" "}
                      {moment(hit?.created_at ?? Date.now).fromNow()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between">
            <button
              onClick={() =>
                setPage(page => {
                  if (page > 0) {
                    setPage(page - 1);
                  }
                })
              }
              type="button"
              disabled={loading || page === 0}
              className={`${
                loading || page === 0 ? "opacity-50 cursor-not-allowed" : ""
              } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
            >
              {loading ? "Loading" : "Previous"}
            </button>
            <button
              onClick={() =>
                setPage(page => {
                  if ((state?.hits?.length ?? 0) > 0) {
                    setPage(page + 1);
                  }
                })
              }
              type="button"
              disabled={loading || (state?.hits?.length ?? 0) === 0}
              className={`${
                loading || (state?.hits?.length ?? 0) === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              } ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
            >
              {loading ? "Loading" : "Next"}
            </button>
          </div>
        </div>
      </div>
      <div className="h-64">
        <Chart data={data} axes={axes} tooltip />
      </div>
    </main>
  );
}

export default App;
