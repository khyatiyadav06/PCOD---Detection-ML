
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function GenerateReport() {
  const reportRef = useRef();
  const [submitted, setSubmitted] = useState(false);

  const symptomOptions = [
    "Irregular periods",
    "Hair fall",
    "Mood swings",
    "Weight gain",
    "Fatigue",
    "Dark patches",
    "Acne",
    "Excess hair growth",
  ];

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    lastPeriod: '',
    cycleLength: 28,
    symptoms: [],
    lifestyle: '',
  });

  const reportGeneratedDate = new Date().toLocaleString();
  const reportId = `PCOD${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSymptomChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      setFormData({ ...formData, symptoms: [...formData.symptoms, value] });
    } else {
      setFormData({ ...formData, symptoms: formData.symptoms.filter(symptom => symptom !== value) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const downloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`PCOD_Report_${formData.name}.pdf`);
    });
  };

  const calculateBMI = () => {
    const heightInMeters = formData.height / 100;
    if (!heightInMeters || !formData.weight) return { bmi: "N/A", category: "N/A" };

    const bmi = formData.weight / (heightInMeters * heightInMeters);
    let category = "";

    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = "Normal";
    } else if (bmi >= 25 && bmi <= 29.9) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    return { bmi: bmi.toFixed(1), category };
  };

  const bmiData = calculateBMI();

  const generateSuggestions = () => {
    const suggestions = [];

    if (formData.symptoms.includes("Irregular periods")) {
      suggestions.push("Maintain a regular sleep schedule and diet.");
    }
    if (formData.symptoms.includes("Hair fall")) {
      suggestions.push("Include protein-rich foods and check Vitamin D levels.");
    }
    if (formData.symptoms.includes("Mood swings")) {
      suggestions.push("Practice meditation or yoga for emotional balance.");
    }
    if (formData.symptoms.includes("Weight gain")) {
      suggestions.push("Start moderate daily exercises and monitor calorie intake.");
    }
    if (formData.symptoms.includes("Fatigue")) {
      suggestions.push("Improve sleep quality and hydration habits.");
    }
    if (formData.symptoms.includes("Dark patches")) {
      suggestions.push("Consult dermatologist for insulin resistance check.");
    }
    if (formData.symptoms.includes("Acne")) {
      suggestions.push("Follow a low-glycemic healthy diet and skin care.");
    }
    if (formData.symptoms.includes("Excess hair growth")) {
      suggestions.push("Consider hormonal therapy under doctor's guidance.");
    }

    if (bmiData.category === "Underweight") {
      suggestions.push("Increase healthy calories like nuts, dairy, and good fats.");
    }
    if (bmiData.category === "Overweight" || bmiData.category === "Obese") {
      suggestions.push("Follow a structured low-carb diet and exercise plan.");
    }
    if (bmiData.category === "Normal") {
      suggestions.push("Maintain regular health checkups and balanced nutrition.");
    }

    const uniqueSuggestions = [...new Set(suggestions)];

    // Shuffle array
    for (let i = uniqueSuggestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueSuggestions[i], uniqueSuggestions[j]] = [uniqueSuggestions[j], uniqueSuggestions[i]];
    }

    return uniqueSuggestions.slice(0, 5);
  };

  const generateAlert = () => {
    if (
      bmiData.category === "Obese" &&
      formData.symptoms.includes("Dark patches") &&
      formData.symptoms.includes("Weight gain")
    ) {
      return "⚠️ Critical Health Alert: Signs of potential insulin resistance and obesity complications detected. Immediate medical consultation highly recommended!";
    }
    return null;
  };

  if (!submitted) {
    // Form Part
    return (
      <motion.div
        className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 relative pt-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/home"
          className="absolute top-6 left-6 bg-white text-pink-600 px-4 py-2 rounded-full shadow hover:bg-pink-100 transition z-20"
        >
          ← Home
        </Link>

        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-pink-600 text-center mb-6">📝 Fill Patient Details</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Form Inputs */}
            <input type="text" name="name" placeholder="Patient Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="border p-2 rounded" required />
            <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} className="border p-2 rounded" required />
            <input type="number" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} className="border p-2 rounded" required />
            <label className="text-gray-700 font-semibold">📅 Last Period Date:</label>
            <input type="date" name="lastPeriod" value={formData.lastPeriod} onChange={handleChange} className="border p-2 rounded" required />
            <label className="text-gray-700 font-semibold">🔁 Cycle Length (in days):</label>
            <input type="number" name="cycleLength" value={formData.cycleLength} onChange={handleChange} className="border p-2 rounded" required />
            
            <label className="text-gray-700 font-semibold">🩺 Select Symptoms:</label>
            <div className="border p-4 rounded grid grid-cols-2 gap-2 bg-pink-50">
              {symptomOptions.map((symptom, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input type="checkbox" value={symptom} checked={formData.symptoms.includes(symptom)} onChange={handleSymptomChange} />
                  {symptom}
                </label>
              ))}
            </div>

            <textarea name="lifestyle" placeholder="Lifestyle Notes" value={formData.lifestyle} onChange={handleChange} className="border p-2 rounded" />

            <button type="submit" className="bg-pink-500 text-white py-2 rounded font-semibold hover:bg-pink-600 transition">
              Generate Report
            </button>
          </form>
        </div>
      </motion.div>
    );
  }

  // Report Part
  return (
    <motion.div className="min-h-screen bg-pink-50 flex flex-col items-center p-6 relative pt-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <Link to="/home" className="absolute top-6 left-6 bg-white text-pink-600 px-4 py-2 rounded-full shadow hover:bg-pink-100 transition z-20">
        ← Home
      </Link>

      <div ref={reportRef} className="relative bg-white p-10 rounded-2xl shadow-2xl max-w-3xl w-full space-y-6 border-2 border-pink-200 overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-10 z-0">
          <h1 className="text-[80px] font-extrabold text-pink-200 text-center leading-none">
            LifeCare Women's Health
          </h1>
        </div>

        {/* Report Content */}
        <div className="relative z-10">
          <div className="flex flex-col items-center space-y-2 mb-4">
            <h1 className="text-3xl font-bold text-pink-700">LifeCare Women's Health Clinic</h1>
            <p className="text-gray-500">Specialized Care for Women's Health</p>
          </div>

          <div className="flex justify-between items-center border-b-2 border-pink-100 pb-2">
            <h2 className="text-2xl font-semibold text-pink-600">📄 PCOD Health Report</h2>
            <p className="text-gray-600 font-mono text-sm">Report ID: {reportId}</p>
          </div>

          <div className="space-y-3 text-gray-700 text-base pt-4">
            <p><strong>👩 Patient Name:</strong> {formData.name}</p>
            <p><strong>🎂 Age:</strong> {formData.age} years</p>
            <p><strong>⚖️ Weight:</strong> {formData.weight} kg</p>
            <p><strong>📏 Height:</strong> {formData.height} cm</p>
            <p><strong>🧮 BMI:</strong> {bmiData.bmi} ({bmiData.category})</p>
            <p><strong>📅 Last Period:</strong> {dayjs(formData.lastPeriod).format('MMMM D, YYYY')}</p>
            <p><strong>🔁 Cycle Length:</strong> {formData.cycleLength} days</p>
            <p><strong>🩺 Symptoms:</strong> {formData.symptoms.join(", ")}</p>
            <p><strong>🏃 Lifestyle:</strong> {formData.lifestyle}</p>
            <p><strong>🕒 Report Generated:</strong> {reportGeneratedDate}</p>
          </div>

          {/* Alert */}
          {generateAlert() && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6">
              <strong className="font-bold">🚨 Alert: </strong>
              <span>{generateAlert()}</span>
            </div>
          )}

          {/* Health Suggestions */}
          <div className="space-y-2 mt-6">
            <h3 className="text-xl font-semibold text-green-600">✅ Health Suggestions:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {generateSuggestions().map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>

          {/* Doctor Footer */}
          <div className="mt-8 flex justify-end">
            <div className="flex flex-col items-end space-y-2">
              <p className="font-semibold">Doctor's Signature:</p>
              <div className="border-b-2 border-gray-400 w-48"></div>
              <p className="text-gray-600">Dr. XYZ</p>
              <p className="text-gray-500 text-sm">Consultant Gynecologist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button onClick={downloadPDF} className="mt-8 w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition max-w-3xl">
        📥 Download Report as PDF
      </button>
    </motion.div>
  );
}
