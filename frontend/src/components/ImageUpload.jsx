import React, { useState } from 'react';

function ImageUpload () {
  const [image, setImage] = useState(null); // State to store the uploaded image
  // const [previewUrl, setPreviewUrl] = useState(null); // State to store the image preview URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle API call
  const handleApiCall = async (event) => {

    event.preventDefault(); // Prevent the page from refreshing

    if (!image) {
      alert('Please select an image to upload.');
      return;
    }
    
    setLoading(true);
    setError(null);

    // Create a FormData object to hold the image
    const formData = new FormData();
    formData.append("file", image);
    
    try {
    
      const response = await fetch('http://127.0.0.1:5001/process', {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle the file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the file input
    if (file) {
      setImage(file); // Store the image file in state

      // Generate a URL for the image preview
      // const previewUrl = URL.createObjectURL(file);
      // setPreviewUrl(previewUrl); // Store the preview URL in state
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Upload an Image</h2>
      <form onSubmit={handleApiCall}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit" className="upload-button" disabled={loading}>
          {loading ? 'Loading...' : 'Classify Image!'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
      <div>
          <h2>Fetched Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      )}
      {data && (
      <div>
          <h2>Model Prediction</h2>
          <p>The model predicts: <strong>{data.label}</strong></p>
          <p>Prediction Confidence:{(data.probability*100).toFixed(2)}%</p>
      </div>      
      )}
      {/* Display image preview if a file has been selected */}
      {/* {previewUrl && (
        <div className="image-preview">
          <h3>Image Preview:</h3>
          <img src={previewUrl} alt="Selected" className="preview-image" />
        </div>
      )} */}
    </div>
  );
};

export default ImageUpload;
