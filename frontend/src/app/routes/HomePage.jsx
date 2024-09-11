import React from 'react';
import ImageUpload from '../../components/ImageUpload';

function Home() {

  return(
    <div>
        <main className="main-section">
        <h2 className="intro-title">Welcome to My Simple Cat vs. Dog Image Classification App</h2>
            <p className="intro-text">This app fetches data from an ML Model API when you click the button below to classify the uploaded image.</p>
            {/* Upload */}
            <test >
              <ImageUpload />
            </test>
        </main>
    </div>
  );
}

export default Home;