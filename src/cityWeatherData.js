import React, { useState, useEffect } from "react";
import CityCard from "./cityCard";
import Forecast from "./forecast";
import "./index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from "react-icons/fa";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";

library.add(faTrash);

export default function CityWeatherData() {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    const getNewCity = async () => {
      const api_key = "472b12043f35e3a4cb279bf3592b9c14";
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${api_key}&units=metric`
        );
        const data = await res.json();
        console.log(data);
        setCitiesWeather((oldCitiesWeather) => [data, ...oldCitiesWeather]);
        setLoading(false);
      } catch (err) {
        console.log("err", err);
        setError(true);
        setLoading(false);
      }
    };
    getNewCity();
  }, [inputValue]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const getSearch = (e) => {
    if (search === "") {
      return alert("Please Enter a City Name");
    } else {
      e.preventDefault();
      setInputValue(search);
      setSearch("");
    }
  };

  const deleteOneCity = (id) => {
    const oneCity = citiesWeather.filter(
      (cityWeather) => cityWeather.id !== id
    );
    setCitiesWeather(oneCity);
  };
  const handelPressKey = () => {
    return getSearch;
  };

  return (
    <Router>
      <Route path="/" exact>
        <div className=" weatherCity">
          <h1>Weather</h1>
          <div>
            <Form onSubmit={getSearch} className="search-form row">
              <Form.Control
                column="sm"
                lg={2}
                className="search-form__bar"
                type="text"
                value={search}
                placeholder=" City Name"
                onChange={updateSearch}
              />
              <Button
                className="search-form__button"
                type="submit"
                onKeyPress={handelPressKey}
              >
                <FaSearch className="search-form__icon" />
              </Button>
            </Form>
          </div>
          {citiesWeather.map(
            (cityWeather) =>
              cityWeather.id && (
                <CityCard
                  key={cityWeather.id}
                  cityInfo={cityWeather}
                  deleteCity={deleteOneCity}
                />
              )
          )}
          {isLoading && (
            <p>
              <Spinner animation="border" variant="primary" />
            </p>
          )}
          {hasError && <p> something is wrong</p>}
        </div>
      </Route>
      <Route path="/:cityId" exact>
        <Forecast />
      </Route>
    </Router>
  );
}
