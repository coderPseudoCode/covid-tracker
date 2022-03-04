import React from "react";
import { format } from "../../API";

export default function Card({ country }) {
  return (
    <div className="row text-end border-bottom">
      <div className="col-3 py-1 text-start">
        {country.countryInfo && (
          <img
            src={country.countryInfo.flag}
            alt="flag"
            width={28}
            className="mb-1 me-2 border"
          />
        )}
        <span>{country.country}</span>
      </div>
      <div className="col py-1">{format(country.tests)}</div>
      <div className="col py-1">{format(country.cases)}</div>
      <div className="col py-1">{format(country.active)}</div>
      <div className="col py-1">{format(country.deaths)}</div>
      <div className="col py-1">{format(country.critical)}</div>
      <div className="col py-1">{format(country.recovered)}</div>
    </div>
  );
}
