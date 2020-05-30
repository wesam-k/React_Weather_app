import React, { useState, useEffect } from "react";
import "./App.css";

import { useHistory, useParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Button, Spinner } from "react-bootstrap";

export default function Forecast() {
  const [chart, setChart] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  const { cityId } = useParams();

  useEffect(() => {
    const forecastCity = async () => {
      const api_key = "472b12043f35e3a4cb279bf3592b9c14";
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${api_key}&units=metric`
        );
        const data = await res.json();
        setChart(data.list);
        setLoading(false);
      } catch (err) {
        console.log("err", err);
        setError(true);
        setLoading(false);
      }
    };

    forecastCity();
  }, [cityId]);

  function BackButton() {
    const history = useHistory();
    const handleBack = () => history.goBack();
    return (
      <Button
        type="button"
        onClick={handleBack}
        className="chart__button"
        variant="outline-primary"
      >
        Back to Home
      </Button>
    );
  }

  return (
    <div>
      <div className="chart">
        <AreaChart
          className="chart__areaChart"
          width={800}
          height={600}
          margin={{ top: 50, right: 25, left: 30, bottom: 0 }}
          data={chart}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="dt_txt" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={(dataFromApi) => dataFromApi.main.temp}
            name="temp"
            stroke="red"
            fill="#ABF3AD"
          />
        </AreaChart>
        <BackButton />
      </div>
      {isLoading && <Spinner animation="border" variant="primary" />}
      {hasError && <p> something is wrong</p>}
    </div>
  );
}
