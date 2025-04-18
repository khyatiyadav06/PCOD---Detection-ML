// import { useState } from "react";
// import dayjs from "dayjs";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function PeriodTracker() {
//   const [lastDate, setLastDate] = useState("");
//   const [predicted, setPredicted] = useState(null);

//   const handlePredict = () => {
//     if (lastDate) {
//       const next = dayjs(lastDate).add(28, "day").format("DD MMMM YYYY");
//       setPredicted(next);
//     }
//   };

//   return (
//     <motion.div
//       className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-6 relative pt-16"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <Link
//         to="/"
//         className="absolute top-4 left-4 bg-white text-pink-600 px-4 py-2 rounded-full shadow hover:bg-pink-100 transition"
//       >
//         ← Home
//       </Link>

//       <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">📅 Period Tracker</h2>

//         <label className="block text-gray-700 mb-2">Last Period Date:</label>
//         <input
//           type="date"
//           value={lastDate}
//           onChange={(e) => setLastDate(e.target.value)}
//           className="w-full p-2 border rounded mb-4"
//         />

//         <button
//           onClick={handlePredict}
//           className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
//         >
//           Predict Next Period
//         </button>

//         {predicted && (
//           <div className="mt-6 p-4 bg-pink-50 border border-pink-200 rounded text-center">
//             <p className="text-lg font-semibold text-pink-700">
//               Your next expected period: <br />
//               <span className="text-xl">{predicted}</span>
//             </p>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }


import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PeriodTracker() {
  const [lastDate, setLastDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28); // user can set their cycle length
  const [flowLength, setFlowLength] = useState(5); // user can set average flow duration
  const [upcomingPeriods, setUpcomingPeriods] = useState([]);

  useEffect(() => {
    if (lastDate) {
      calculateUpcomingPeriods();
    }
  }, [lastDate, cycleLength, flowLength]);

  const calculateUpcomingPeriods = () => {
    let periods = [];
    let start = dayjs(lastDate);
    for (let i = 0; i < 6; i++) { // show next 6 cycles
      const startDate = start.add(i * cycleLength, 'day');
      const endDate = startDate.add(flowLength - 1, 'day');
      periods.push({
        start: startDate.format("DD MMM YYYY"),
        end: endDate.format("DD MMM YYYY"),
      });
    }
    setUpcomingPeriods(periods);
  };

  return (
    <motion.div
      className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-6 relative pt-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link
        to="/"
        className="absolute top-4 left-4 bg-white text-pink-600 px-4 py-2 rounded-full shadow hover:bg-pink-100 transition"
      >
        ← Home
      </Link>

      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">📅 Period Tracker</h2>

        <label className="block text-gray-700 mb-2">Last Period Start Date:</label>
        <input
          type="date"
          value={lastDate}
          onChange={(e) => setLastDate(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block text-gray-700 mb-2">Average Cycle Length (days):</label>
        <input
          type="number"
          value={cycleLength}
          onChange={(e) => setCycleLength(Number(e.target.value))}
          className="w-full p-2 border rounded mb-4"
          min="20"
          max="40"
        />

        <label className="block text-gray-700 mb-2">Average Flow Length (days):</label>
        <input
          type="number"
          value={flowLength}
          onChange={(e) => setFlowLength(Number(e.target.value))}
          className="w-full p-2 border rounded mb-6"
          min="2"
          max="10"
        />

        {upcomingPeriods.length > 0 && (
          <div className="bg-pink-50 p-4 rounded-xl shadow-inner">
            <h3 className="text-xl font-semibold text-pink-700 mb-4 text-center">Upcoming Periods:</h3>
            <ul className="list-disc list-inside space-y-2">
              {upcomingPeriods.map((period, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-medium">Cycle {index + 1}:</span> {period.start} ➔ {period.end}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
