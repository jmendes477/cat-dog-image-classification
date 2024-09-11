import React from 'react';
import Header from '../components/Header';
import HomePage from './routes/HomePage'
import Footer from '../components/Footer';
// import ContactPage from './routes/ContactPage';
import AboutPage from './routes/AboutPage';
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';


function App() {
  

  return (
    <Router>
      <div className="App">      
      {/* Define routes for different pages */}
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
