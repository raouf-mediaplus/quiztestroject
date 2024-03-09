import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import "./ModelChoice.css";

var modelsData = require("../data/models.json");

function ModelChoice() {
  const [models, setModels] = useState([]);
  const [selected, setSelected] = useState(modelsData[0].id);
  const [checkedCategories, setCheckedCategories] = useState({});
  const [checkedMetrics, setCheckedMetrics] = useState({});

  useEffect(() => {
    setModels(modelsData);
  }, []);
  useEffect(() => {
    const initialCheckedCategories = {};
    const initialCheckedMetrics = {};

    // Initialise les états des catégories à cocher
    modelsData[selected].Categories.forEach((cat) => {
      initialCheckedCategories[cat.Category] = true;
    });

    // Initialise les états des métriques à cocher
    modelsData[selected].Categories.forEach((cat) => {
      cat.Values.forEach((metric) => {
        initialCheckedMetrics[metric.Metric] = true;
      });
    });
    setCheckedCategories(initialCheckedCategories);
    setCheckedMetrics(initialCheckedMetrics);
  }, [selected]);

  const handleSelect = (event) => {
    setSelected(event.target.value);
  };
  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setCheckedCategories({ ...checkedCategories, [name]: checked });
  };

  const handleMetricChange = (event) => {
    const { name, checked } = event.target;
    setCheckedMetrics({ ...checkedMetrics, [name]: checked });
  };

  const optionsSelect = models.map((model) => (
    <option key={model.id} value={model.id}>
      {model.Name}
    </option>
  ));

  const CategoriesList = modelsData[selected].Categories.map((cat) => (
    <div className="categories-list-item" key={cat.id}>
      <input
        style={{ marginBottom: "1em", marginTop: "1em" }}
        type="checkbox"
        checked={checkedCategories[cat.Category]}
        name={cat.Category}
        value={cat.Category}
        onChange={handleCategoryChange}
      />
      <span>{cat.Category}</span>
      {cat.Values.map((metric) => (
        <div key={metric.id}>
          <input
            style={{ marginLeft: "2em", marginBottom: "1em" }}
            type="checkbox"
            checked={
              checkedCategories[cat.Category] && checkedMetrics[metric.Metric]
            }
            name={metric.Metric}
            value={metric.Metric}
            onChange={handleMetricChange}
          />
          <span>{metric.Metric}</span>
        </div>
      ))}
    </div>
  ));

  return (
    <div className="model-choice-container">
      <h1 className="model-choice-header">Choose your metrics</h1>
      <p className="model-choice-description">
        Here you can choose your performance test system and the metrics you
        want to focus on.
      </p>
      <select className="model-select" name="models" onChange={handleSelect}>
        {optionsSelect}
      </select>
      <Divider style={{ borderColor: "rgba(255,255,255,0.1)" }} />
      <ul className="categories-list">{CategoriesList}</ul>
      <Link to="/quiz">
        <Button variant="contained" color="primary" className="login-button">
          Start the Quiz
        </Button>
      </Link>
    </div>
  );
}

export default ModelChoice;
