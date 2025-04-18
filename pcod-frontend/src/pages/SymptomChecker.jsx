import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Framer Motion import

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState({
    irregularPeriods: false,
    hairFall: false,
    acne: false,
    weightGain: false,
    moodSwings: false,
    fatigue: false,
    darkPatches: false,
    excessHair: false,
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setSymptoms({ ...symptoms, [e.target.name]: e.target.checked });
  };

  const handleSubmit = () => {
    const selected = Object.values(symptoms).filter(Boolean).length;

    if (selected >= 5) {
      setResult("High possibility of PCOD symptoms. Please consult a doctor.");
    } else if (selected >= 3) {
      setResult("Moderate signs detected. Lifestyle care and tracking recommended.");
    } else {
      setResult("Symptoms are minimal. Keep tracking your cycle and health!");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 relative pt-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Home button */}
      <Link
        to="/"
        className="absolute top-4 left-4 bg-white text-pink-600 px-4 py-2 rounded-full shadow hover:bg-pink-100 transition"
      >
        ← Home
      </Link>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">🩺 Symptom Checker</h2>

        <div className="grid grid-cols-1 gap-4">
          {Object.entries(symptoms).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-3 text-gray-800">
              <input
                type="checkbox"
                name={key}
                checked={value}
                onChange={handleChange}
                className="w-5 h-5 text-pink-500 focus:ring-pink-300 rounded"
              />
              <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold"
        >
          Check Symptoms
        </button>

        {result && (
          <div className="mt-4 p-4 bg-pink-100 text-center text-pink-700 font-semibold rounded">
            {result}
          </div>
        )}
      </div>
    </motion.div>
  );
}
