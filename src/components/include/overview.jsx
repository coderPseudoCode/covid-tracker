import React, { useCallback, useEffect, useState } from "react";
import Chart from "react-google-charts";
import { currentCountry, filterMonthly, get, getYears } from "../../API";

import CountryOverview from "./overviews/country";
import GlobalOverview from "./overviews/worldwide";

export default function Overview() {
  const [years, setYears] = useState([]);
  const [country, setCountry] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(20);

  const handleFilterYear = (year) => {
    setSelectedYear(year);
  };

  const fetchCountry = useCallback(() => {
    currentCountry()
      .then((res) => {
        const current = res.data;
        handleSetCountry(current, selectedYear);
        window.localStorage["current"] = JSON.stringify(current);
      })
      .catch(() => {
        const current = JSON.parse(window.localStorage.current);
        handleSetCountry(current, selectedYear);
      });
  }, [selectedYear]);

  const handleSetCountry = (current, year) => {
    get({ key: "historical", param: current.country_code, last_days: "all" })
      .then((res) => {
        const details = res.data;
        const monthly = filterMonthly(details, year);
        setMonthlyData(monthly);
      })
      .finally(() => {
        setCountry(current);
      });
  };

  useEffect(() => {
    fetchCountry();

    const got = getYears();

    setYears(got);
  }, [fetchCountry]);

  return (
    <div className="row justify-content-between">
      <div className="col-lg-8 mb-4">
        <div className="card h-100 box-shadow border-0 card-body">
          <div className="d-flex justify-content-between pb-3 align-items-start">
            <span className="text-muted">Summary</span>
            <div className="dropdown">
              <button
                data-bs-target="#main"
                data-bs-toggle="dropdown"
                className="btn btn-outline-secondary dropdown-toggle box-shadow-0 px-4 py-1"
              >
                {`20${selectedYear}`}
              </button>

              <div className="dropdown-menu" id="main">
                {years.map((year) => {
                  return (
                    <button
                      key={year}
                      type="button"
                      className="dropdown-item"
                      onClick={() => handleFilterYear(year)}
                    >
                      <span
                        className={`${
                          year === selectedYear
                            ? "text-dark fw-bold text-default"
                            : "text-muted"
                        }`}
                      >
                        {`20${year}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <Chart
            chartType="LineChart"
            width="100%"
            height="100%"
            data={monthlyData}
            options={{
              intervals: { style: "line" },
              curveType: "function",
              hAxis: {
                title: `Data for 20${selectedYear}`,
              },
              vAxis: {
                viewWindow: {
                  min: 0,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="col-lg">
        <div className="card box-shadow border-0 card-body mb-4">
          <CountryOverview code={country.country_code} />
        </div>

        <div className="card box-shadow border-0 card-body mb-4">
          <GlobalOverview />
        </div>
      </div>
    </div>
  );
}
