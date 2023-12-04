// GeographicMap.js

import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { supabase } from '../App';


const GeographyMap = () => {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    // Fetch data from Supabase
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('chineseMigrants_duplicate')
        .select('Birth Country');

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      setData(data);
    };

    fetchData();
  }, []);

  const handleCountryClick = (countryName) => {
    setSelectedCountry(countryName);
  };

  const calculateTotalEntries = (countryName) => {
    return data.filter(item => item['Birth Country'] === countryName).length;
  };

  return (
    <div>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <Geographies geography="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json">
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => {
                  const { NAME } = geo.properties;
                  handleCountryClick(NAME);
                }}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>

      {selectedCountry && (
        <div>
          <h3>{selectedCountry}</h3>
          <p>Total Entries: {calculateTotalEntries(selectedCountry)}</p>
        </div>
      )}
    </div>
  );
};

export default GeographyMap;
