import base64
from matplotlib import pyplot as plt
from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io

# Load the Keras model
model_path = "my_model/1"
model = tf.saved_model.load(model_path)

app = Flask(__name__)


def base64_to_numpy(base64_string):
    """Convert a base64 string back to a numpy array."""
    array_bytes = io.BytesIO(base64.b64decode(base64_string.encode('utf-8')))
    return np.load(array_bytes, allow_pickle=True)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        
        data = request.json
        
        # Deserialize the base64 string back to a numpy array
        image_array = base64_to_numpy(data['image'])
        
        # Preprocess the image to the format your model expects
        processed_image = image_array
        
        infer = model.signatures["serving_default"]

        # Convert input data to a tensor
        input_tensor = tf.convert_to_tensor(processed_image)

        # Perform inference
        predictions = infer(input_tensor)
        
        # Check if predictions is a dictionary
        
        # Convert each value in the dictionary to a list
        #predictions = {k: v.tolist() for k, v in predictions.items()}
        
        # Convert the tensor to a list if it's not a dictionary
        
        for key in predictions:
            predictions[key]=predictions[key].numpy().tolist()


        # Return the predictions as JSON
        return jsonify({'predictions': predictions})
    
    except Exception as e:
        # Return error if something went wrong
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)