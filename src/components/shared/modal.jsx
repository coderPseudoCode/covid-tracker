import React, { useCallback, useEffect, useState } from "react";
import Chart from "react-google-charts";
import { filterMonthly, get, getYears } from "../../API";

export default function Modal({ country }) {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(20);

  const fetchData = useCallback(() => {
    if (country.countryInfo) {
      get({
        key: "historical",
        param: country.countryInfo.iso2,
        last_days: "all",
      }).then((res) => {
        const details = res.data;
        const monthly = filterMonthly(details, selectedYear);
        setData(monthly);
      });
    }
  }, [country, selectedYear]);

  useEffect(() => {
    fetchData();
    const got = getYears();
    setYears(got);
  }, [fetchData]);

  return (
    <div className="modal" id="modal" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <span>
              {country.countryInfo && (
                <img
                  src={country.countryInfo.flag}
                  alt="flag"
                  width={28}
                  className="mb-1 me-2 border"
                />
              )}
              <span>{country.country}</span>
            </span>
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn-close box-shadow-0"
            ></button>
          </div>

          <div className="modal-body">
            <div className="d-flex justify-content-between mb-2 align-items-start">
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
                        onClick={() => setSelectedYear(year)}
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
              height="320px"
              data={data}
              options={{
                backgroundColor: "#031627",
                intervals: { style: "line" },
                curveType: "function",
                legend: {
                  textStyle: { color: "#ffffff" },
                },
                hAxis: {
                  textStyle: { color: "#ffffff" },
                },
                vAxis: {
                  viewWindow: {
                    min: 0,
                  },
                  textStyle: { color: "#ffffff" },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
