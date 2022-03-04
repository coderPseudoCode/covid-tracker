import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

export default function PieChart({ data, param, color }) {
  const [processed, setProcessed] = useState([]);

  useEffect(() => {
    const fetched = [["Country", param]];

    if (data.length > 0) {
      data.forEach((country) => {
        fetched.push(country);
      });
    }

    setProcessed(fetched);
  }, [data, param]);

  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      data={processed}
      options={{
        height: 226,
        legend: "none",
        colors: [color],
      }}
    />
  );
}
