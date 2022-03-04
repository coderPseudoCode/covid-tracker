import React, { Fragment } from "react";
import Statistics from "./include/statistics";
import Overview from "./include/overview";
import Countries from "./include/countries";

export default function Main() {
  return (
    <Fragment>
      <section className="mt-5">
        <h4 className="fs-3 fw-normal mb-3">Overview</h4>
        <Overview />
      </section>
      <section className="mt-5">
        <Statistics />
      </section>
      <section className="my-5">
        <h4 className="fs-3 fw-normal mb-3">Countries</h4>
        <Countries />
      </section>
    </Fragment>
  );
}
