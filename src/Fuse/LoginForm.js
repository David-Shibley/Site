import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { HexColorPicker } from "react-colorful";

const LoginForm = ({ loginPlayer }) => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("#aabbcc");

  const handleLogin = () => {
    loginPlayer(room, { name, color });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Box
      component="form"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "60vw",
        padding: 3,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Room name"
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Player name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
        required
      />
       Pick a color:
       <HexColorPicker color={color} onChange={setColor} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        style={{ margin: '12px' }}
        sx={{ mt: 2 }}
        fullWidth
      >
        Login
      </Button>
    </Box>
    </div>
  );
};

export default LoginForm;
