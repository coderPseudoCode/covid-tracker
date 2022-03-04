import React, { useCallback, useEffect, useState } from "react";
import { get, continents, sumObjects } from "../../API";
import Card from "../shared/card";
import Details from "../shared/details";
import Modal from "../shared/modal";

export default function Countries() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [continental, setContinental] = useState([]);
  const [continentData, setContinentData] = useState([]);
  const [currentCountry, setCurrentCountry] = useState({});
  const [selectedContinent, setSelectedContinent] = useState(continents[0]);

  const fetchData = useCallback(() => {
    get({ param: "countries" }).then((res) => {
      const countries = res.data;
      setData(countries);
      setAllData(countries);
      processContent(countries);
    });
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    const fil = continentData.length > 0 ? continentData : allData;

    const filtered =
      value.length > 0
        ? fil.filter(
            (country) => country.country.toLowerCase().indexOf(value) > -1
          )
        : fil;

    setData(filtered);
  };

  const handleSetContinent = useCallback(
    (continent) => {
      const fils =
        continent.data === "world"
          ? allData
          : allData.filter(
              (res) => res.continent.toLowerCase().indexOf(continent.data) > -1
            );

      setData(fils);
      processContent(fils);
      setContinentData(fils);
      setSelectedContinent(continent);

      document.querySelector("input").value = "";
    },
    [allData]
  );

  const processContent = (fils) => {
    if (fils.length > 0) {
      const cases = sumObjects(fils, "cases");
      const deaths = sumObjects(fils, "deaths");
      const recovered = sumObjects(fils, "recovered");
      const today_cases = sumObjects(fils, "todayCases");
      const today_deaths = sumObjects(fils, "todayDeaths");
      const today_recovered = sumObjects(fils, "todayRecovered");

      const processed = {
        cases: cases,
        deaths: deaths,
        recovered: recovered,
        todayCases: today_cases,
        todayDeaths: today_deaths,
        todayRecovered: today_recovered,
      };

      setContinental(processed);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="card card-body py-4">
      <div className="row justify-content-between mb-2">
        <div className="col">
          <div className="dropdown">
            <button
              data-bs-target="#main"
              data-bs-toggle="dropdown"
              className="btn border dropdown-toggle box-shadow-0 pe-4 pt-2"
            >
              <img
                src={`https://img.icons8.com/${selectedContinent.img}`}
                width={26}
                alt={`img_${selectedContinent.title}`}
                className="me-1 mb-1"
              />
              <span>{selectedContinent.title}</span>
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
        <div className="col-4">
          <input
            onChange={handleSearch}
            type="search"
            className="form-control box-shadow-0"
            placeholder="Search country..."
          />
        </div>
      </div>

      <div className="my-3 bg-light p-2">
        <Details
          data={continental}
          pop_test={false}
          act_cri={false}
          border={true}
        />
      </div>

      <div className="container">
        <div className="row bg-dark py-2 mb-2 justify-content-between text-end text-white">
          <div className="col-3 text-start">
            <small>Location</small>
          </div>
          <div className="col">
            <small>Tests</small>
          </div>
          <div className="col">
            <small>Case</small>
          </div>
          <div className="col">
            <small>Active</small>
          </div>
          <div className="col">
            <small>Deaths</small>
          </div>
          <div className="col">
            <small>Critical</small>
          </div>
          <div className="col">
            <small>Recovered</small>
          </div>
        </div>
      </div>
      <div className="cards pe-1">
        {data.map((country, key) => {
          return (
            <button
              key={`country_${key}`}
              data-bs-toggle="modal"
              data-bs-target="#modal"
              onClick={() => setCurrentCountry(country)}
              type="button"
              role="link"
              className="btn text-decoration-none btn-link w-100 text-dark box-shadow-0"
            >
              <Card key={`country_${key}`} country={country} />
            </button>
          );
        })}
      </div>

      <Modal country={currentCountry} />
    </div>
  );
}
