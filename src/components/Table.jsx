import { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://s3.amazonaws.com/open-to-cors/assignment.json")
      .then((response) => response.json())
      .then((result) => {
        console.log("RESULT " + result.products);
        for (const idx in result.products) {
          setData((prev) => [...prev, result.products[idx]]);
        }
      });
  },[]);
  data.sort((a, b) => {
    return b.popularity - a.popularity;
  });
  const prods = data.map((row, i) => {
    return (
      <tr
        key={i}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td className="px-6 py-4">{i + 1}</td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {row.title}
        </th>
        <td className="px-6 py-4">{row.popularity}</td>
        <td className="px-6 py-4">₹ {row.price}</td>
      </tr>
    );
  });
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Popularity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>{prods}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
