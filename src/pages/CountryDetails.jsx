import { useParams, Link } from "react-router-dom";
import data from "/data.json";
import { useContext } from "react";
import { ThemeContext } from "../App";

export default function CountryDetails() {
  const { name } = useParams();
  const country = data.find((country) => country.name === name);

  const { theme } = useContext(ThemeContext);
  return (
    <div className="details-wrapper" id={theme ? "dark" : ""}>
      {country ? (
        <div className="country-details">
          <div className="details-flag-wrapper">
            <Link className="redirect" to=".." relative="path">
              <button className="back-btn" id={theme ? "dark" : ""}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                  />
                </svg>
                Back
              </button>
            </Link>
            <img
              className="details-flag"
              src={`${country.flag}`}
              alt={`${country.name} flag`}
            />
          </div>

          <div className="align-vertically">
            <div className="details">
              <div className="left">
                <h2>{country.name}</h2>
                <p>
                  <strong>Native Name: </strong>
                  {country.nativeName}
                </p>
                <p>
                  <strong>Population: </strong>
                  {country.population}
                </p>
                <p>
                  <strong>Region: </strong>
                  {country.region}
                </p>
                <p>
                  <strong>Sub Region: </strong>
                  {country.subregion}
                </p>
                <p>
                  <strong>Capital: </strong>
                  {country.capital}
                </p>
              </div>
              <div className="right">
                <p>
                  <strong>Top Level Domain: </strong>
                  {country.topLevelDomain}
                </p>
                <p>
                  <strong>Currencies: </strong>
                  {country.currencies.map((currency, index) => {
                    return <span key={index}>{currency.name}</span>;
                  })}
                </p>
                <p>
                  <strong>Languages: </strong>
                  {country.languages.map((lang, index) => {
                    return <span key={index}>{lang.name} </span>;
                  })}
                </p>
              </div>
            </div>
            <div className="borders">
              <strong>Border Countries: </strong>
              <div className="bordered-con" id={theme ? "dark" : ""}>
                {country.borders[0] && <span>{country.borders[0]}</span>}
                {country.borders[1] && <span>{country.borders[1]}</span>}
                {country.borders[2] && <span>{country.borders[2]}</span>}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Country not found</p>
      )}
    </div>
  );
}
