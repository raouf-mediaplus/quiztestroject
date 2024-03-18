import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import InfoIcon from "@mui/icons-material/Info";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
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

  const handleStartQuiz = () => {
    // Récupérer les éléments cochés
    const selectedItems = {
      // categories: checkedCategories,
      metrics: checkedMetrics,
    };

    // Afficher les éléments cochés dans la console
    console.log(selectedItems);
  };

  const optionsSelect = models.map((model) => (
    <option key={model.id} value={model.id}>
      {model.Name}
    </option>
  ));

  const CategoriesList = modelsData[selected].Categories.map((cat) => (
    <div className="categories-list-item" key={cat.id}>
      <h3 className="categories">{cat.Category}</h3>
      {cat.Values.map((metric) => (
        <div key={metric.id}>
          <input
            style={{ marginLeft: "2em", marginBottom: "1em" }}
            type="checkbox"
            checked={checkedMetrics[metric.Metric]}
            name={metric.Metric}
            value={metric.Metric}
            onChange={handleMetricChange}
          />
          <span style={{ opacity: "0.8" }}>{metric.Metric}</span>
        </div>
      ))}
      <Divider
        style={{ borderColor: "rgba(255,255,255,0.05)", marginTop: "1em" }}
      />
    </div>
  ));

  return (
    <div className="model-choice-container">
      <h1 className="model-choice-header">Choose your metric System</h1>
      <p className="model-choice-description">
        Here you can choose your performance test system and the metrics you
        want to focus on.
      </p>

      <select className="model-select" name="models" onChange={handleSelect}>
        {optionsSelect}
      </select>
      <div className="align-center">
        <InfoIcon color="white" />
        <p> You can check / uncheck any of the options below</p>
      </div>
      <Divider style={{ borderColor: "rgba(255,255,255,0.1)" }} />
      <ul className="categories-list">{CategoriesList}</ul>
      <Link to="/quiz">
        <Button
          style={{ width: "100%", marginTop: "-3rem" }}
          variant="contained"
          color="primary"
          className="login-button"
          startIcon={<PlayArrowIcon />}
          onClick={handleStartQuiz}
        >
          Start now
        </Button>
      </Link>
    </div>
  );
}

export default ModelChoice;
