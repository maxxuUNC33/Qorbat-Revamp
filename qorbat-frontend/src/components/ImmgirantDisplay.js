import React, { useState } from 'react';
import { supabase } from '../App';
import './ImmigrantDisplay.css'; // Import the stylesheet

function ImmigrantDisplay() {
    const [searchName, setSearchName] = useState('');
    const [immigrant, setImmigrant] = useState(null);
    const [message, setMessage] = useState('');

    const fetchImmigrant = async () => {
        const { data, error } = await supabase
            .from('chineseMigrants_duplicate')
            .select('*')
            .eq('Name', searchName)
            .single();

        if (error) {
            console.error("Error fetching immigrant:", error);
            setMessage('Error fetching data');
        } else if (data) {
            setImmigrant(data);
            setMessage('');
        } else {
            setMessage('Immigrant not found. Please add their data.');
        }
    };

    return (
        <div className="immigrant-display-container">
            <div className="search-section">
                <h2>Find an Immigrant</h2>
                <p>Case Sensitive & Leave space between First and Last Name</p>
                <input 
                    className="search-input"
                    value={searchName} 
                    onChange={e => setSearchName(e.target.value)} 
                    placeholder="Enter full name" 
                />
                <button className="search-button" onClick={fetchImmigrant}>Search</button>
                <p>{message}</p>
            </div>

            <div className="results-section">
                {immigrant && (
                    <div className="result-item">
                        <h3>{immigrant.Name}</h3>
                        <p>Birth Country: {immigrant["Birth Country"]}</p>
                        <p>Industry: {immigrant.Industry}</p>
                        <p>Age: {immigrant.Age}</p>
                        <p>Education Level: {immigrant.educationLevel}</p>
                        <p>Year of Migration: {immigrant["Year of Migration"]}</p>
                        <p>Gender: {immigrant.Gender}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImmigrantDisplay;