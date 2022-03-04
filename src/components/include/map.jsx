import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

export default function GeoMap({ data, color, region = false }) {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const opts = {
      legend: false,
      backgroundColor: "#031627",
      colorAxis: { colors: color },
    };

    if (region) {
      opts["region"] = region;
    }

    setOptions(opts);
  }, [color, region]);

  return (
    <Chart
      loader={<p>Loading....</p>}
      mapsApiKey={process.env.REACT_APP_MAPS_API_KEY}
      options={options}
      chartType="GeoChart"
      height={576}
      width="100%"
      data={data}
    />
  );
}
