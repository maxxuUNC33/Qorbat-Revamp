import React from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import "./styles.css";

const MapChart = () => (
  <div>
    <ComposableMap>
      <Geographies geography="/features.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<MapChart />, rootElement);

export default MapChart;