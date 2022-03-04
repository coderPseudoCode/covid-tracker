import React, { Fragment, useState, useEffect } from "react";
import { get } from "../../../API";
import Details from "../../shared/details";

export default function GlobalDetails() {
  const [data, setData] = useState({});

  const fetchData = () => {
    get({ param: "all" }).then((res) => {
      const worldwide = res.data;
      setData({
        ...worldwide,
        flag: "https://img.icons8.com/color/48/000000/geography.png",
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <h5>
        <img
          src={data.flag}
          alt="flag"
          width={35}
          className="mb-1 me-2 rounded"
        />
        <span className="text-muted">Worldwide</span>
      </h5>

      <Details data={data} pop_test={false} act_cri={false} shorten={true} />
    </Fragment>
  );
}
