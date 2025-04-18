import axios from 'axios';
import { useState } from 'react';

function UploadPredict() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(`Prediction: ${res.data.prediction} (Confidence: ${res.data.confidence.toFixed(2)})`);
    } catch (error) {
      console.error('Error uploading image:', error);
      setResult('Error during prediction');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <h1 className="text-3xl mb-6 font-bold">PCOD Detection</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      {loading ? <p>Predicting...</p> : <p className="mt-4 text-xl">{result}</p>}
    </div>
  );
}

export default UploadPredict;
