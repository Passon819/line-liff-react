import { useState } from "react";
import { API_URL } from "../utils/BaseUrl";
import logo from "../assets/tecmove-logo.png";
import "./ConnectPage.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { Box, Stack } from "@mui/material";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#190152"),
  backgroundColor: "#190152",
  "&:hover": {
    backgroundColor: purple[900],
  },
}));

function ConnectPage(props) {
  const { profileData } = props;
  const [basicId, setBasicId] = useState(profileData.basic_id);
  const [basicIdError, setBasicIdError] = useState(false);
  const [basicIdValid, setBasicIdValid] = useState(true);

  const handleTextChange = (event) => {
    setBasicId(event.target.value);
    if (!event.target.validity.valid) {
      setBasicIdError(true);
      setBasicIdValid(true);
    } else if (!event.target.value.startsWith("@")) {
      setBasicIdError(true);
      setBasicIdValid(true);
    } else {
      setBasicIdError(false);
      setBasicIdValid(false);
    }
  };

  const handleSendClick = () => {
    const { userId, displayName, pictureUrl, statusMessage, language } =
      profileData;

    console.log("API_URL_ = ", API_URL);
    // Send the data to backend API. Replace 'your-backend-api-endpoint'
    fetch(`${API_URL}/line/line-profile-from-liff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        displayName,
        pictureUrl,
        statusMessage,
        language,
        basic_id: basicId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Backend response:", data);
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
  };

  return (
    <div className="connect-page">
      <div className="logo-container">
        <img className="logo-org" alt="tecmove" src={logo} />
      </div>
      <h1>Connect</h1>
      <h3>
        Get about infomation <br /> LINE Official Account
      </h3>
      <div className="user-container">
        <p>{profileData.displayName}</p>
        <img className="picture-user" alt="pic" src={profileData.pictureUrl} />
      </div>
      {/* <button onClick={handleSendClick}>Send</button> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          required
          label="Basic ID"
          helperText={basicIdError ? "example: @123edcba" : ""}
          id="demo-helper-text-aligned"
          value={basicId}
          onChange={handleTextChange}
          error={basicIdError}
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "3.5vw", // Adjust the value as needed
            },
          }}
          InputLabelProps={{
            style: {
              fontSize: "3.5vw",
            },
          }}
        />
        <ColorButton
          variant="contained"
          disabled={basicIdValid}
          sx={{ mt: 3, width: "50%", fontSize: "4vw" }}
        >
          Connect
        </ColorButton>
      </Box>
    </div>
  );
}

export default ConnectPage;
