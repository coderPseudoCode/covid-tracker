import React, { Fragment, useCallback, useEffect, useState } from "react";
import { get, mapFilters, continents } from "../API.js";
import GeoMap from "./include/map";

export default function Cover() {
  const [filters, setFilters] = useState([]);
  const [fetched, setFetched] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [allFetched, setAllFetched] = useState([]);
  const [filter, setFilter] = useState(mapFilters[0]);
  const [selectedContinent, setSelectedContinent] = useState(continents[0]);

  const fetchData = useCallback(() => {
    get({ param: "countries" })
      .then(({ data }) => {
        setAllFetched(data);
        setCountries(data);
        setFetched(prepareGeoData(data, mapFilters[0]));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const prepareGeoData = (data, key) => {
    const processed = [["Country", key.title]];

    if (data.length > 0) {
      const hasToday = data[0][`today${key.title}`] !== undefined;

      if (hasToday) {
        processed[0].push(`Today ${key.title}`);
      }

      data.forEach((info) => {
        const pros = [info.country, info[key.title.toLowerCase()]];
        if (hasToday) {
          pros.push(info[`today${key.title}`]);
        }
        processed.push(pros);
      });
    }

    return processed;
  };

  const handleFilter = (action) => {
    const got = prepareGeoData(countries, action);
    setFetched(got);
    setFilter(action);
  };

  const handleSetContinent = (continent) => {
    const fils =
      continent.data === "world"
        ? allFetched
        : allFetched.filter(
            (res) => res.continent.toLowerCase().indexOf(continent.data) > -1
          );

    setCountries(fils);
    setSelectedContinent(continent);
    setFetched(prepareGeoData(fils, filter));
  };

  useEffect(() => {
    fetchData();

    setFilters(mapFilters);
  }, [fetchData]);

  return (
    <div className="bg-default py-4 navbar-dark text-white">
      <div className="container">
        {loading ? (
          <p>Loading</p>
        ) : (
          <Fragment>
            <div className="row justify-content-between">
              <div className="col-md-4">
                <div className="dropdown">
                  <button
                    data-bs-target="#main"
                    data-bs-toggle="dropdown"
                    className="btn rounded-0 border-0 bg-transparent text-info fw-bold p-0 dropdown-toggle box-shadow-0"
                  >
                    {selectedContinent.title}
                  </button>

                  <div className="dropdown-menu" id="main">
                    {continents.map((continent) => {
                      return (
                        <button
                          key={continent.region}
                          type="button"
                          className="dropdown-item"
                          onClick={() => handleSetContinent(continent)}
                        >
                          <img
                            src={`https://img.icons8.com/${continent.img}`}
                            width={26}
                            alt={`img_${continent.title}`}
                            className="mb-1 me-2"
                          />
                          <span
                            className={`${
                              continent.region === selectedContinent.region
                                ? "text-dark fw-bold text-default"
                                : "text-muted"
                            }`}
                          >
                            {continent.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="col-md">
                <ul
                  className="nav nav-pills mb-3 justify-content-end pb-5"
                  id="pills-tab"
                  role="tablist"
                >
                  {filters.map((fil) => {
                    return (
                      <li
                        key={fil.title.toLowerCase()}
                        className="nav-item"
                        role="presentation"
                      >
                        <button
                          onClick={() => handleFilter(fil)}
                          className={`nav-link text-white rounded-0 py-1 ${
                            filter.title === fil.title ? "active" : ""
                          }`}
                          data-bs-toggle="pill"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          {fil.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <GeoMap
              data={fetched}
              color={filter.color}
              region={selectedContinent.region}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
}
