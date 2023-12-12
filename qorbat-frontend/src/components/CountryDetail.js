import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CountryDetail.css'
import { supabase } from '../App'; 




function CountryDetail() {
    const [immigrants, setImmigrants] = useState([]);
    const { countryName } = useParams(); // Assuming you're using React Router

    useEffect(() => {
        // Function to fetch data from Supabase
        const fetchData = async () => {
            try {
                let { data, error } = await supabase
                    .from('chineseMigrants_duplicate') // Replace with your table name
                    .select('*')
                    .eq('Birth Country', countryName);

                if (error) throw error;
                setImmigrants(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [countryName]);

    return (
        <div>
            <h1>Immigrants from {countryName}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Birth Country</th>
                        <th>Year of Migration</th>
                        <th>Age</th>
                        <th>Significance</th>
                        <th>Industry</th>
                        <th>Education Level</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {immigrants.map(immigrant => (
                        <tr key={immigrant.Name}>
                            <td>{immigrant.Name}</td>
                            <td>{immigrant.Gender}</td>
                            <td>{immigrant['Birth Country']}</td>
                            <td>{immigrant['Year of Migration']}</td>
                            <td>{immigrant.Age}</td>
                            <td>{immigrant.Significance}</td>
                            <td>{immigrant.Industry}</td>
                            <td>{immigrant.educationLevel}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CountryDetail;
