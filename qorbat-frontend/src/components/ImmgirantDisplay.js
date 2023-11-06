import React, { useState } from 'react';
import { supabase } from '../App';
//import ImmigrantForm from './ImmigrantForm'; 

function ImmigrantDisplay() {
    const [country, setCountry] = useState('');
    const [immigrants, setImmigrants] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [message, setMessage] = useState('');

    const fetchImmigrants = async () => {
        const { data, error } = await supabase
            .from('chineseMigrants_duplicate')
            .select('*')
            .eq('Birth Country', country);

        if (error) {
            console.error("Error fetching immigrants:", error);
            setMessage('Error fetching data');
        } else {
            setImmigrants(data);
        }
    };

    const handleSearch = () => {
        const immigrant = immigrants.find(imm => imm.Name.toLowerCase() === searchName.toLowerCase());
        if (immigrant) {
            setMessage('Immigrant data exists');
        } else {
            setMessage('Immigrant not found. Please add their data above.');
            // Insert animation logic here to guide the user to the ImmigrantForm
        }
    };

    return (
        <div>
            <h2>View Immigrants by Country - Table</h2>
            <select value={country} onChange={e => setCountry(e.target.value)}>
                <option value="">Select a country...</option>
                <option value="India">India</option>
                <option value="Iran">Iran</option>
                <option value="China">China</option>
                <option value="Canada">Canada</option>
            </select>
            <button onClick={fetchImmigrants}>Request</button>

            {immigrants.map(immigrant => (
                <div key={immigrant.Name}>
                    <h3>{immigrant.Name}</h3>
                    <p>Birth Country: {immigrant["Birth Country"]}</p>
                    <p>Industry: {immigrant.Industry}</p>
                    <p>Age: {immigrant.Age}</p>
                    <p>Education Level: {immigrant.educationLevel}</p>
                    <p>Year of Migration: {immigrant["Year of Migration"]}</p>
                    <p>Gender: {immigrant.Gender}</p>
                </div>
            ))}

            <h2>Find ____ in Country Table</h2>
            <input value={searchName} onChange={e => setSearchName(e.target.value)} placeholder="Enter name" />
            <button onClick={handleSearch}>Search</button>

            <p>{message}</p>
        </div>
    );
}

export default ImmigrantDisplay;
