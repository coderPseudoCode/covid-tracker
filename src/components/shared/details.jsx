import React, { Fragment } from "react";
import { format, shortenNumber } from "../../API";

export default function Details({
  data,
  pop_test = true,
  act_cri = true,
  case_death = true,
  shorten = false,
  doSet = false,
  border = false,
}) {
  const setValue = (number) => {
    let value = shorten ? shortenNumber(number, 1) : format(number);

    if (doSet && number > 1e6) {
      value = shortenNumber(number, 2);
    }

    return value;
  };

  return (
    <Fragment>
      {pop_test && (
        <div className="row border-bottom mb-2 pb-2 pt-1">
          <div className={`col ${border && "border-end"}`}>
            <small>Population</small>
            <h5 className="mb-0">{setValue(data.population)}</h5>
          </div>

          <div className="col">
            <small>Test</small>
            <h5 className="mb-0">{setValue(data.tests)}</h5>
          </div>
        </div>
      )}

      {act_cri && (
        <div className="row border-bottom mb-2 pb-2 pt-1">
          <div className={`col ${border && "border-end"}`}>
            <small>Active</small>
            <h5 className="mb-0">{setValue(data.active)}</h5>
          </div>

          <div className="col">
            <small>Critical</small>
            <h5 className="mb-0">{setValue(data.critical)}</h5>
          </div>
        </div>
      )}

      {case_death && (
        <div className="row">
          <div className={`col ${border && "border-end"}`}>
            <small>Cases</small>
            <h5 className="mb-0">{setValue(data.cases)}</h5>
            <span>+{setValue(data.todayCases)}</span>
          </div>

          <div className={`col ${border && "border-end"}`}>
            <small>Deaths</small>
            <h5 className="mb-0">{setValue(data.deaths)}</h5>
            <span>+{setValue(data.todayDeaths)}</span>
          </div>

          <div className="col">
            <small>Recovered</small>
            <h5 className="mb-0">{setValue(data.recovered)}</h5>
            <span>+{setValue(data.todayRecovered)}</span>
          </div>
        </div>
      )}
    </Fragment>
  );
}
