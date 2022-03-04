import axios from "axios";

const base_url = "https://corona.lmao.ninja/v3/covid-19";

export const continents = [
  {
    data: "world",
    region: false,
    title: "Worldwide",
    img: "color/48/000000/geography.png",
  },
  {
    data: "africa",
    region: "002",
    title: "Africa",
    img: "color/48/000000/africa.png",
  },
  {
    data: "america",
    region: "019",
    title: "America",
    img: "color/48/000000/america.png",
  },
  {
    data: "asia",
    region: "142",
    title: "Asia",
    img: "color/48/000000/asia.png",
  },
  {
    data: "europe",
    region: "150",
    title: "Europe",
    img: "color/48/000000/europe.png",
  },
  {
    data: "australia",
    region: "009",
    title: "Oceania",
    img: "color/48/000000/australia.png",
  },
];

export const mapFilters = [
  {
    title: "Active",
    color: ["#ffcccc", "#ff0000"],
  },
  {
    title: "Cases",
    color: ["#ccccff", "#ff0101"],
  },
  {
    title: "Critical",
    color: ["#ff9999", "#ff0101"],
  },
  {
    title: "Deaths",
    color: ["#ff3f3f", "#ff0101"],
  },
  {
    title: "Recovered",
    color: ["#ccffcc", "#99ff00"],
  },
  {
    title: "Tests",
    color: ["#fffaaa", "#ff0101"],
  },
];

export const get = async (controller) => {
  const key = controller.key ? `${controller.key}/` : "";
  const filter = controller.last_days
    ? `?lastdays=${controller.last_days}`
    : "";

  const url = `${base_url}/${key}${controller.param}${filter}`;

  return await axios.get(url);
};

export const currentCountry = async () => {
  return await axios.get("https://ipapi.co/json");
};

export const monthsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const getMonthName = (index) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[index - 1];
};

export const format = (num, dp = 0) => {
  return Intl.NumberFormat("en-GB", { maximumFractionDigits: dp }).format(num);
};

export const toPercent = (num) => {
  return format(num * 100, 2) + "%";
};

export const shortenNumber = (num, dp = 0) => {
  const symbols = [
    { value: 1, letter: "" },
    { value: 1e3, letter: "K" },
    { value: 1e6, letter: "M" },
    { value: 1e9, letter: "G" },
    { value: 1e12, letter: "T" },
    { value: 1e15, letter: "P" },
    { value: 1e18, letter: "E" },
  ];
  const got = symbols.filter((symbol) => num >= symbol.value);
  const symbol = got[got.length - 1];

  return num
    ? `${format(num / symbol.value, dp)}${symbol.letter}`
    : format(num);
};

export const filterMonthly = (data, year) => {
  const months = monthsNumbers;
  const monthly = [["Month", "Cases", "Deaths", "Recovered"]];

  Object.values(data.timeline).forEach((value) => {
    let index = 1;
    let prev_count = false;
    const got = Object.entries(value).filter(
      (val) => val[0].split("/")[2].indexOf(year) > -1
    );

    if (got.length > 0) {
      months.forEach((month) => {
        const all = got.filter((val) => Number(val[0].split("/")[0]) === month);

        const count =
          all.length > 0
            ? all.reduce((prev, curr) =>
                prev[1] > curr[1] ? prev[1] : curr[1]
              )
            : 0;
        let total = count;

        if (prev_count) {
          total = count > 0 ? count - prev_count : 0;
        }

        if (monthly.length > 12) {
          monthly[index].push(total);
        } else {
          monthly.push([getMonthName(month), total]);
        }

        index += 1;
        prev_count = count;
      });
    }
  });

  return monthly;
};

export const sumObjects = (data, key) => {
  return data.reduce((a, b) => {
    return a + b[key];
  }, 0);
};

export const getYears = () => {
  const generated = [];
  for (let index = 2020; index <= new Date().getFullYear(); index++) {
    generated.push(Number(index.toString().slice(2, 4)));
  }

  return generated;
};
