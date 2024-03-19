import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ThemeContext } from "../App";
export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [showRegions, setShowRegions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("data.json");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error appropriately, e.g., display an error message to the user
      }
    }
    fetchData();
  }, []);

  const regionFilter = searchParams.get("region");

  const displayedCountries = regionFilter
    ? countries.filter((country) => country.region === regionFilter)
    : countries.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const countriesElements = displayedCountries.map((country, index) => (
    <div className="countries" key={index}>
      <Link className="link" to={`${country.name}`}>
        <div className="flag-container" id={theme ? "dark" : ""}>
          <img
            className="flag"
            src={country.flag}
            alt={`${country.name} flag`}
          />
        </div>
        <div className="info" id={theme ? "dark" : ""}>
          <h3 className="country-name">{country.name}</h3>
          <p className="country-population">
            <strong>Population: </strong>
            {country.population}
          </p>
          <p className="country-region">
            <strong>Region: </strong>
            {country.region}
          </p>
          <p className="country-capital">
            <strong>Capital: </strong>
            {country.capital}
          </p>
        </div>
      </Link>
    </div>
  ));

  return (
    <>
      <div className="input-filter">
        <input
          className="input"
          id={theme ? "dark" : ""}
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="search-icon" id={theme ? "dark" : ""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </span>
        <div className="filter" id={theme ? "dark" : ""}>
          <button
            className="btn btn-primary dropdown-toggle"
            id={theme ? "dark" : ""}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={() => setShowRegions(!showRegions)}
          >
            Filter By Region{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-down-square"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
              />
            </svg>
          </button>
          <ul
            className={`dropdown-menu ${showRegions ? "show" : null}`}
            id={theme ? "dark" : ""}
          >
            <li>
              <button
                className="dropdown-item"
                id={theme ? "dark" : ""}
                type="button"
                onClick={() => setSearchParams({ region: "Africa" })}
              >
                Africa
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                id={theme ? "dark" : ""}
                type="button"
                onClick={() => setSearchParams({ region: "Americas" })}
              >
                America
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                id={theme ? "dark" : ""}
                type="button"
                onClick={() => setSearchParams({ region: "Asia" })}
              >
                Asia
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                id={theme ? "dark" : ""}
                type="button"
                onClick={() => setSearchParams({ region: "Europe" })}
              >
                Europe
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                id={theme ? "dark" : ""}
                type="button"
                onClick={() => setSearchParams({ region: "Oceania" })}
              >
                Oceania
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                id={theme ? "dark" : ""}
                type="button"
                onClick={() => setSearchParams({})}
              >
                All
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">{countriesElements}</div>
    </>
  );
}
