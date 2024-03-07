import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

var modelsData = require("../data/models.json");

function ModelChoice() {
  const [models, setModels] = useState([]);
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   setCategories(modelsData);
  // }, []);

  useEffect(() => {
    setModels(modelsData);
  }, []);

  const optionsSelect = models.map((model) => (
    <option key={model.id} value={model.id}>
      {model.Name}
    </option>
  ));

  const [selected, setSelected] = useState(modelsData[0].id);
  const handleSelect = (event) => {
    // console.log(event.target.value);
    setSelected(event.target.value);
  };

  const CategoriesList = modelsData[selected].Categories.map((cat) => (
    <>
      <dd key={cat.id}>
        <input type="checkbox" name={cat.Category} value={cat.Category} />
        {cat.Category}
      </dd>
      {cat.Values.map((metric) => (
        <dt key={metric.id}>
          <input type="checkbox" name={metric.Metric} value={metric.Metric} />
          {metric.Metric}
        </dt>
      ))}
    </>
  ));

  return (
    <div>
      <p
        style={{
          fontSize: "2em",
          fontWeight: "bold",
          marginTop: "0.8rem",
          marginBottom: "0",
          color: "white",
        }}
      >
        Choose your metrics
      </p>
      <p
        style={{
          fontSize: "1em",
          marginTop: 0,
          marginBottom: 0,
          opacity: "0.7",
          color: "white",
        }}
      >
        This quiz will allow you to assess your DevOps performance based on many
        metrics.
      </p>

      <select name="models" onChange={handleSelect}>
        {optionsSelect}
      </select>
      <ul style={{ color: "white" }}>{CategoriesList}</ul>
      <Link to="/quiz">
        <Button variant="contained" color="primary" className="login-button">
          Start the Quiz
        </Button>
      </Link>
    </div>
  );
}

export default ModelChoice;
