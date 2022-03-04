import React, { Fragment, useState, useEffect } from "react";
import { get } from "../../../API";
import Details from "../../shared/details";

export default function CountryDetails({ code }) {
  const [country, setCountry] = useState({});
  const fetchCountry = (code) => {
    get({ param: code, key: "countries" }).then(({ data }) => {
      setCountry(data);
    });
  };

  useEffect(() => {
    if (code) {
      fetchCountry(code);
    }
  }, [code]);

  return (
    <Fragment>
      <h5>
        {country.countryInfo ? (
          <img
            src={country.countryInfo.flag}
            alt="flag"
            width={35}
            className="mb-1 me-2 rounded border"
          />
        ) : (
          ""
        )}
        <span className="text-muted">{country.country}</span>
      </h5>

      <Details data={country} doSet={true} />
    </Fragment>
  );
}
