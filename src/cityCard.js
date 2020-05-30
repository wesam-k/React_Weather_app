import React from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function CityCard({ cityInfo, deleteCity }) {
  return (
    <Card className="CityName-container">
      <Card.Header className="CityName-container__header">
        <Link to={"/" + cityInfo.id}>
          {cityInfo.name}, {cityInfo.sys.country}
        </Link>
        <span>
          <FontAwesomeIcon
            className="CityName-container__header-icon"
            icon="trash"
            onClick={() => deleteCity(cityInfo.id)}
          />
        </span>
      </Card.Header>
      <Card.Body>
        <Card.Title className="CityName-container__title">
          {cityInfo.weather[0].main}
        </Card.Title>
        <br />
        <Card.Subtitle>{cityInfo.weather[0].description}</Card.Subtitle>
        <div className="CityName-container__temp">
          <Card.Text>
            min_temp: {Math.floor(cityInfo.main.temp_min)} °C
          </Card.Text>
          <Card.Text>
            max_temp: {Math.ceil(cityInfo.main.temp_max)} °C
          </Card.Text>
          <Card.Text>
            location: {cityInfo.coord.lon}, {cityInfo.coord.lat}
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}
