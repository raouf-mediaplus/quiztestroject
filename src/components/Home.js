import React from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Email";

import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <img
        className="flex-right"
        src="./images/landingBg.jpg"
        alt="background landing page"
      ></img>
      <div className="flex-left">
        <div className="home-text">
          <p
            style={{
              fontSize: "1em",
              marginTop: 0,
              marginBottom: 0,
              opacity: "0.7",
            }}
          >
            Login
          </p>
          <p
            style={{
              fontSize: "2em",
              fontWeight: "bold",
              marginTop: "0.8rem",
              marginBottom: "0",
            }}
          >
            WELCOME BACK
          </p>
          <p style={{ fontSize: "0.9rem", opacity: "0.7" }}>
            Login to manage your account.
          </p>
          <div className="login-container">
            <TextField
              className="login-input"
              label="Email *"
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                style: { color: "white", borderColor: "white" }, // Définir la couleur du texte en blanc
              }}
              InputLabelProps={{
                style: { color: "white" }, // Définir la couleur du label en blanc
              }}
            />
            <TextField
              className="login-input"
              label="Password *"
              variant="outlined"
              size="small"
              type="password"
              backgroundColor="white"
              fullWidth
              InputProps={{
                style: { color: "white", borderColor: "white" }, // Définir la couleur du texte en blanc
              }}
              InputLabelProps={{
                style: { color: "white" }, // Définir la couleur du label en blanc
              }}
            />
            <Link to="/quiz">
              <Button
                variant="contained"
                color="primary"
                className="login-button"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
        <Link to="/quiz">
          <Button
            className="login-button"
            variant="contained"
            size="large"
            startIcon={<GitHubIcon />}
            style={{ backgroundColor: "rgba(0,0,0,0.7)", marginTop: "2rem" }}
          >
            Login with GitHub
          </Button>
        </Link>
        <Link to="/quiz">
          <Button
            className="login-button"
            variant="contained"
            size="large"
            color="primary"
            startIcon={<GoogleIcon />}
            sx={{
              mt: "1rem",
              backgroundColor: "#DB4437",
              "&:hover": { backgroundColor: "#CC3C2E" },
            }} // Changer la couleur du bouton et de son hover
          >
            Login with Google
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
