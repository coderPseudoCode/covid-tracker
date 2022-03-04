import React, { Fragment, useCallback, useEffect, useState } from "react";
import { get } from "../../API";
import PieChart from "../shared/pie.chart";

export default function Statistics() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(10);
  const [filters, setFilters] = useState([]);

  const fetchData = useCallback(() => {
    get({ param: "countries" }).then((res) => {
      const countries = res.data;
      const cases = getTopData(countries, "cases", filter);
      const tests = getTopData(countries, "tests", filter);
      const deaths = getTopData(countries, "deaths", filter);
      const active = getTopData(countries, "active", filter);
      const critical = getTopData(countries, "critical", filter);
      const recovered = getTopData(countries, "recovered", filter);

      const processed = [
        ["Tests", tests, "#ffa222"],
        ["Cases", cases, "#8888ff"],
        ["Active", active, "#f07777"],
        ["Deaths", deaths, "#ff0000"],
        ["Critical", critical, "#ff8888"],
        ["Recovered", recovered, "#88ff88"],
      ];

      setData(processed);
    });
  }, [filter]);

  const getTopData = (countries, key, count) => {
    const top = countries
      .filter((country) => country[key] > 1e3)
      .sort((pre, cur) => cur[key] - pre[key])
      .map((country) => {
        return [country.country, country.cases];
      });

    return top.slice(0, count);
  };

  useEffect(() => {
    fetchData();
    const fils = [];
    for (let index = 10; index <= 50; index += 5) {
      fils.push(index);
    }

    setFilters(fils);
  }, [fetchData]);

  return (
    <Fragment>
      <div className="d-flex mb-2 justify-content-between">
        <h4 className="fs-3 fw-normal mb-3">Statistics</h4>

        <div className="dropdown">
          <button
            data-bs-target="#main"
            data-bs-toggle="dropdown"
            className="btn rounded btn-outline-primary dropdown-toggle box-shadow-0"
          >
            Show top {filter}
          </button>

          <div className="dropdown-menu" id="main">
            {filters.map((fil) => {
              return (
                <button
                  key={fil}
                  type="button"
                  className="dropdown-item"
                  onClick={() => setFilter(fil)}
                >
                  <span
                    className={`${
                      fil === filter
                        ? "text-dark fw-bold text-default"
                        : "text-muted"
                    }`}
                  >
                    {fil}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="row">
        {data.map((got) => {
          return (
            <div key={got[0]} className="col-lg-4 col-md-6 mb-3">
              <div className="card card-body">
                <span className="fw-bold stat-title" style={{ color: got[2] }}>
                  Higher {got[0]}
                </span>
                <PieChart data={got[1]} param={got[0]} color={got[2]} />
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
