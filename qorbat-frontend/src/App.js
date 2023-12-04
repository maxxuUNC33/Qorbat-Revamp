import React from 'react';
import { createClient } from '@supabase/supabase-js';
import ImmigrantForm from './components/ImmigrantForm';
import ImmigrantDisplay from './components/ImmgirantDisplay';
import CountryList from './components/CountryList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryDetail from './components/CountryDetail';
import Footer from './components/Footer';
import './App.css';

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

function MainPage() {
  return (
    <>
      <CountryList />
      <ImmigrantForm />
      <ImmigrantDisplay />
      {/* <GeographyMap /> */}
      {/* <MapChart /> */}
    </>
  );
}

function App() {
    return (
        <div className="App">
          <h1>Qorbat App</h1>
          <p className="motto">Celebrating the impact of immigrants in the United States</p>

          <Router>
              <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/country/:countryName" element={<CountryDetail />} />
              </Routes>
          </Router>
          {/* <h2>Qorbat Global is a not for profit project with a simple goal of motivating and empowering immigrants in the United States by showcasing the lasting impact of immigrants in this country across all sectors of business.</h2> */}
          <Footer />
        </div> 
    );
}

export default App;
