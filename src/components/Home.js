import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <p>Welcome Raouf</p>
      <Link to="/quiz">
        <Button variant="contained" size="large" color="primary">
          Start the quiz
        </Button>
      </Link>
    </div>
  );
}

export default Home;
