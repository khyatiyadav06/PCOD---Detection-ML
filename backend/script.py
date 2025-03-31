from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load trained model
MODEL_PATH = "pcod.keras"  
model = load_model(MODEL_PATH)

def preprocess_image(image):
    image = image.resize((224, 224))  # Adjust size as per your model
    image = np.array(image) / 255.0  # Normalize if required
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    image = Image.open(io.BytesIO(file.read()))
    processed_image = preprocess_image(image)
    
    prediction = model.predict(processed_image)
    result = "PCOD Detected" if prediction[0][0] > 0.5 else "No PCOD"
    
    return jsonify({'prediction': result, 'confidence': float(prediction[0][0])})

if __name__ == '__main__':
    app.run(debug=True)
