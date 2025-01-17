import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const Countdown = () => {
  // Function to calculate time left for a given target date
  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const difference = targetDate - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  // Set target dates
  const christmasDate = new Date(new Date().getFullYear(), 11, 25); // December 25
  const newYearDate = new Date(new Date().getFullYear() + 1, 0, 1); // January 1

  // States for Christmas and New Year countdowns
  const [christmasTimeLeft, setChristmasTimeLeft] = useState(
    calculateTimeLeft(christmasDate)
  );
  const [newYearTimeLeft, setNewYearTimeLeft] = useState(
    calculateTimeLeft(newYearDate)
  );

  // Update countdowns every second
  useEffect(() => {
    const timer = setInterval(() => {
      setChristmasTimeLeft(calculateTimeLeft(christmasDate));
      setNewYearTimeLeft(calculateTimeLeft(newYearDate));
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer
  }, [christmasDate, newYearDate]);

  // Render a compact countdown inline
  const renderCompactCountdown = (timeLeft) =>
    `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;

  return (
    <Box
      sx={{
        position: "relative",
        // height: "100px",
        backgroundColor: "#f0f4ff",
      }}
    >
      {/* New Year Countdown */}
      <Box
        component="span"
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "4px 8px",
          fontSize: "14px",
          color: "#ffffff",
          backgroundColor: "#00796b",
          borderRadius: "8px",
        }}
      >
        <Typography variant="caption" component="span">
          🎆 New Year: {renderCompactCountdown(newYearTimeLeft)}
        </Typography>
      </Box>

      {/* Christmas Countdown */}
      <Box
        component="span"
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "4px 8px",
          fontSize: "14px",
          color: "#ffffff",
          backgroundColor: "#b71c1c",
          borderRadius: "8px",
        }}
      >
        <Typography variant="caption" component="span">
          🎄 Christmas: {renderCompactCountdown(christmasTimeLeft)}
        </Typography>
      </Box>
    </Box>
  );
};

export default Countdown;
