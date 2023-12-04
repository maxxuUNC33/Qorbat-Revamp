import React from 'react';
import { Link } from 'react-router-dom';
import './CountryList.css'; // Import the stylesheet


function CountryList() {
    // Example country data - replace with actual data and links
    const countries = [
        { name: "Canada", link: "/country/Canada" },
        { name: "Iran", link: "/country/Iran" },
        { name: "Brazil", link: "/country/Brazil" },
        { name: "India", link: "/country/India" },
        { name: "China", link: "/country/China" },
        { name: "France", link: "/country/France" },
        { name: "Australia", link: "/country/Australia" },
        { name: "Japan", link: "/country/Japan" },
        { name: "South Africa", link: "/country/South Africa" },
        { name: "Russia", link: "/country/Russia" },
        { name: "Germany", link: "/country/Germany" },
        { name: "United Kingdom", link: "/country/United Kingdom" },
        { name: "Mexico", link: "/country/Mexico" },
        { name: "Italy", link: "/country/Italy" }
    ];
    

    return (
        <div className="country-list-container"> {/* Updated class name for the container */}
            <div className="country-list">
                {countries.map((country, index) => (
                   
                    <Link to={`/country/${country.name}`} className='country-item'>{country.name}</Link>

                    
                ))}
            </div>
        </div>
    );
}

export default CountryList;
