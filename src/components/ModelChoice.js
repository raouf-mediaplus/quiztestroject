import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import InfoIcon from "@mui/icons-material/Info";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./ModelChoice.css";
import axios from "axios";
import useFetch from "./useFetch";

function ModelChoice() {
  const {
    error,
    isPending,
    data: modelsData,
  } = useFetch("https://65f99d8f3909a9a65b18f206.mockapi.io/api/v1/models");

  const [selected, setSelected] = useState(0);
  //const [checkedCategories, setCheckedCategories] = useState({});
  const [checkedMetrics, setCheckedMetrics] = useState({});

  useEffect(() => {
    //const initialCheckedCategories = {};
    const initialCheckedMetrics = {};

    // Initialise les états des catégories à cocher
    if (!isPending) {
      // modelsData[selected].Categories.forEach((cat) => {
      //   initialCheckedCategories[cat.Category] = true;
      // });

      // Initialise les états des métriques à cocher
      modelsData[selected].Categories.forEach((cat) => {
        cat.Values.forEach((metric) => {
          initialCheckedMetrics[metric.Metric] = true;
        });
      });
      // setCheckedCategories(initialCheckedCategories);
      setCheckedMetrics(initialCheckedMetrics);
    }
  }, [modelsData, selected, isPending]);

  const handleSelect = (event) => {
    setSelected(event.target.value);
  };

  const handleMetricChange = (event) => {
    const { name, checked } = event.target;
    setCheckedMetrics({ ...checkedMetrics, [name]: checked });
  };

  const handleMetricChangeViaSpan = (name) => {
    const checked = !checkedMetrics[name];
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

    // Envoyer les données à un serveur
    axios
      .post("https://jsonplaceholder.typicode.com/posts", selectedItems)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <div className="model-choice-container">
          <h1 className="model-choice-header">Choose your metric System</h1>
          <p className="model-choice-description">
            Here you can choose your performance test system and the metrics you
            want to focus on.
          </p>

          <select
            className="model-select"
            name="models"
            onChange={handleSelect}
          >
            {modelsData.map((model) => (
              <option key={model.id} value={model.id}>
                {model.Name}
              </option>
            ))}
          </select>
          <div className="align-center">
            <InfoIcon color="white" />
            <p> You can check / uncheck any of the options below</p>
          </div>
          <Divider style={{ borderColor: "rgba(255,255,255,0.1)" }} />
          <ul className="categories-list">
            {modelsData[selected].Categories.map((cat) => (
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
                    <span
                      onClick={() => {
                        handleMetricChangeViaSpan(metric.Metric);
                      }}
                      style={{ opacity: "0.8" }}
                    >
                      {metric.Metric}
                    </span>
                  </div>
                ))}
                <Divider
                  style={{
                    borderColor: "rgba(255,255,255,0.05)",
                    marginTop: "1em",
                  }}
                />
              </div>
            ))}
          </ul>
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
      )}
    </>
  );
}

export default ModelChoice;
