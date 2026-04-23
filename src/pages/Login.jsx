import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/upload"; // redireciona para upload
      } else {
        setError("Credenciais inválidas");
      }
    } catch {
      setError("Erro no servidor");
    }
  };

  return (
    <Box sx={{ bgcolor: "#000", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h4" sx={{ color: "#FFD700", mb: 3 }}>Login Admin</Typography>
      <TextField
        label="Usuário"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2, input: { color: "#FFD700" }, label: { color: "#FFD700" } }}
      />
      <TextField
        label="Senha"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2, input: { color: "#FFD700" }, label: { color: "#FFD700" } }}
      />
      <Button
        onClick={handleLogin}
        sx={{
          bgcolor: "#FFD700",
          color: "#000",
          fontWeight: "bold",
          "&:hover": { bgcolor: "#000", color: "#FFD700", border: "1px solid #FFD700" },
        }}
      >
        Entrar
      </Button>
      {error && <Typography sx={{ color: "red", mt: 2 }}>{error}</Typography>}
    </Box>
  );
}
