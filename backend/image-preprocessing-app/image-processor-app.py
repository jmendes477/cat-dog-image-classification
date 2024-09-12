import base64
from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore
import requests
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

ml_model_url = os.getenv('ML_MODEL_URL', 'http://localhost:5000/predict')

def numpy_to_base64(array):
    """Convert a numpy array to a base64 string."""
    array_bytes = io.BytesIO()
    np.save(array_bytes, array, allow_pickle=True)
    array_bytes.seek(0)
    return base64.b64encode(array_bytes.read()).decode('utf-8')

def ml_model(image):
    print(type(image))
    
    classification = requests.post(ml_model_url, json={"image": image})
    print(type(classification))
    print(classification.json())

    return classification.json()

@app.route('/process', methods=['POST'])
def process():
    try:
        print('test')
        model_output = {}
        # Check if the POST request has the file part
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})
        
        file = request.files['file']
        
        # Check if the user has uploaded a file
        if file.filename == '':
            return jsonify({'error': 'No selected file'})
        
        # Open the image file
        image = Image.open(io.BytesIO(file.read()))
        target_size = (256,256)
        # Resize image to the target size
        image = image.resize(target_size)
        
        # Convert the image to a numpy array
        image = np.array(image)
        
        # If grayscale, convert to RGB
        if image.ndim == 2:
            image = np.stack((image,)*3, axis=-1)
        
        # Scale the image pixels to the range [0, 1]
        image = image / 255.0

        # Convert image to float32
        image = image.astype(np.float32)
        
        # Add a batch dimension (model expects batches of inputs)
        image = np.expand_dims(image, axis=0)
        
        image_base64 = numpy_to_base64(image)
        classification = ml_model(image_base64)
        
        prediction_value = classification['predictions']['output_0'][0][0]

        if prediction_value < 0.5:
            label = 'Cat'
        else:
            label = 'Dog'
        
        model_output['label'] = label
        model_output['probability'] = prediction_value
        print(model_output)

        print(prediction_value)
        return jsonify(model_output)
    
    except Exception as e:
            # Return error if something went wrong
            return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)