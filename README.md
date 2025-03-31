# PCOD---Detection-ML

# PCOD Detection Using CNN

## Overview
This project aims to detect Polycystic Ovarian Disease (PCOD) from ultrasound images using a Convolutional Neural Network (CNN). Instead of simple binary classification (PCOD/No PCOD), the model predicts a **severity score** by transforming a regression problem into a classification-based approach. A web-based frontend is also developed to allow users to upload ultrasound images and receive predictions.

## Approach
1. **Dataset Preparation**: 
   - Ultrasound images are preprocessed
   - (grayscale conversion, resizing, normalization).
2. **Model Architecture**:
   - A CNN model with convolutional, pooling, and dense layers.
   - Softmax activation for multi-class classification.
3. **Prediction and Severity Score Calculation**:
   - Model predicts the probability for each class.
   - A weighted sum of class probabilities gives a continuous severity score.
4. **Frontend for User Interaction**:
   - A simple web-based interface using **Flask (backend) and HTML/CSS/JavaScript (frontend)**.
   - Users can upload an ultrasound image and receive a prediction.
   - The result displays the predicted PCOD severity score.

## Installation
To run this project, install the required dependencies:

```bash
pip install tensorflow opencv-python numpy flask
```

## Usage
1. **Prepare Dataset**:
   - Store ultrasound images in a folder.
   - Label them based on severity categories.
2. **Train Model**:
   - Run the Jupyter Notebook or Python script to train the CNN.
3. **Run the Web Application**:
   - Start the Flask server:
   
   ```bash
   python app.py
   ```
   - Open `http://127.0.0.1:5000/` in your browser.
   - Upload an ultrasound image to get predictions.

4. **Make Predictions via Script**:
   - Use `predict_severity()` to classify an ultrasound image and get a severity score.

Example:
```python
severity_score = predict_severity("test_image.jpg")
print(f"Predicted PCOD Severity Score: {severity_score:.2f}")
```

## Future Improvements
- Train on a larger labeled dataset.
- Fine-tune CNN with pre-trained models like ResNet.
- Improve frontend UI/UX with better visualization.
- Deploy the application to cloud services like AWS/GCP.

## License
This project is open-source.

