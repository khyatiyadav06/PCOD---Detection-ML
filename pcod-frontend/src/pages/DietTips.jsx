
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const tips = [
//   {
//     phase: "Menstrual Phase",
//     foods: ["Iron-rich spinach", "Dates", "Watermelon"],
//     color: "from-red-200 to-pink-100",
//     duration: "Day 1–5",
//   },
//   {
//     phase: "Follicular Phase",
//     foods: ["Lean proteins", "Leafy greens", "Berries"],
//     color: "from-green-200 to-green-100",
//     duration: "Day 6–13",
//   },
//   {
//     phase: "Ovulation Phase",
//     foods: ["Zinc foods", "Nuts", "Pumpkin seeds"],
//     color: "from-yellow-200 to-yellow-100",
//     duration: "Day 14",
//   },
//   {
//     phase: "Luteal Phase",
//     foods: ["Magnesium foods", "Dark chocolate", "Herbal teas"],
//     color: "from-purple-200 to-purple-100",
//     duration: "Day 15–28",
//   },
// ];

// export default function DietTips() {
//   return (
//     <motion.div
//       className="min-h-screen bg-pink-50 flex flex-col items-center p-6 relative pt-16"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Home Button */}
//       <Link
//         to="/home"
//         className="absolute top-4 left-4 bg-white text-pink-600 px-4 py-2 rounded-full shadow hover:bg-pink-100 transition"
//       >
//         ← Home
//       </Link>

//       {/* Title */}
//       <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">
//         🥗 Diet Tips by Cycle Phase
//       </h2>

//       {/* Timeline Section */}
//       <div className="flex flex-col items-center mb-12 w-full max-w-5xl">
//         <div className="relative w-full flex items-center">
//           {/* Horizontal Line */}
//           <div className="absolute top-1/2 left-0 right-0 border-t-4 border-pink-300"></div>

//           {/* Timeline Steps */}
//           {tips.map((tip, index) => (
//             <div key={index} className="flex flex-col items-center flex-1">
//               <motion.div
//                 className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md"
//                 whileHover={{ scale: 1.2 }}
//               >
//                 {index + 1}
//               </motion.div>
//               <div className="text-xs text-gray-600 mt-2 text-center font-semibold">
//                 {tip.phase.split(" ")[0]}<br />
//                 <span className="text-[10px]">{tip.duration}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Tips Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
//         {tips.map((tip, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.05, rotate: 1 }}
//             className={`p-6 rounded-2xl shadow-xl bg-gradient-to-br ${tip.color} transition-all hover:shadow-2xl`}
//           >
//             {/* Phase Name */}
//             <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//               {tip.phase}
//             </h3>

//             {/* Foods */}
//             <ul className="list-disc list-inside text-gray-700 space-y-2">
//               {tip.foods.map((food, i) => (
//                 <li key={i} className="hover:text-pink-600 transition">
//                   {food}
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const tips = [
  {
    phase: "Menstrual Phase",
    foods: ["Iron-rich spinach", "Dates", "Watermelon"],
    color: "from-red-200 to-pink-100",
    duration: "Day 1–5",
    mealPlan: {
      breakfast: "Oatmeal with berries and chia seeds",
      lunch: "Spinach and lentil soup",
      dinner: "Grilled tofu with steamed veggies",
    },
  },
  {
    phase: "Follicular Phase",
    foods: ["Lean proteins", "Leafy greens", "Berries"],
    color: "from-green-200 to-green-100",
    duration: "Day 6–13",
    mealPlan: {
      breakfast: "Greek yogurt with nuts",
      lunch: "Grilled chicken salad",
      dinner: "Quinoa bowl with veggies",
    },
  },
  {
    phase: "Ovulation Phase",
    foods: ["Zinc foods", "Nuts", "Pumpkin seeds"],
    color: "from-yellow-200 to-yellow-100",
    duration: "Day 14",
    mealPlan: {
      breakfast: "Avocado toast with seeds",
      lunch: "Salmon with spinach salad",
      dinner: "Pumpkin seed pesto pasta",
    },
  },
  {
    phase: "Luteal Phase",
    foods: ["Magnesium foods", "Dark chocolate", "Herbal teas"],
    color: "from-purple-200 to-purple-100",
    duration: "Day 15–28",
    mealPlan: {
      breakfast: "Banana smoothie with almond milk",
      lunch: "Turkey wrap with leafy greens",
      dinner: "Sweet potato curry",
    },
  },
];

export default function DietTips() {
  return (
    <motion.div
      className="min-h-screen bg-pink-50 flex flex-col items-center p-6 relative pt-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Home Button */}
      <Link
        to="/home"
        className="absolute top-4 left-4 bg-white text-pink-600 px-4 py-2 rounded-full shadow hover:bg-pink-100 transition"
      >
        ← Home
      </Link>

      {/* Title */}
      <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">
        🥗 Diet Tips & Meal Plans by Cycle Phase
      </h2>

      {/* Timeline Section */}
      <div className="flex flex-col items-center mb-12 w-full max-w-5xl">
        <div className="relative w-full flex items-center">
          {/* Horizontal Line */}
          <div className="absolute top-1/2 left-0 right-0 border-t-4 border-pink-300"></div>

          {/* Timeline Steps */}
          {tips.map((tip, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <motion.div
                className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                whileHover={{ scale: 1.2 }}
              >
                {index + 1}
              </motion.div>
              <div className="text-xs text-gray-600 mt-2 text-center font-semibold">
                {tip.phase.split(" ")[0]}<br />
                <span className="text-[10px]">{tip.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips and Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className={`p-6 rounded-2xl shadow-xl bg-gradient-to-br ${tip.color} transition-all hover:shadow-2xl`}
          >
            {/* Phase Name */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {tip.phase}
            </h3>

            {/* Foods */}
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              {tip.foods.map((food, i) => (
                <li key={i} className="hover:text-pink-600 transition">
                  {food}
                </li>
              ))}
            </ul>

            {/* Meal Plan */}
            <div className="bg-white p-4 rounded-xl shadow-inner text-sm space-y-2">
              <p><strong>🍳 Breakfast:</strong> {tip.mealPlan.breakfast}</p>
              <p><strong>🥗 Lunch:</strong> {tip.mealPlan.lunch}</p>
              <p><strong>🍽️ Dinner:</strong> {tip.mealPlan.dinner}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

