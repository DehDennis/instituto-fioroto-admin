import { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function GalleryView() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleUpload = () => {
    console.log("Upload:", title, file);
    // Aqui futuramente você chama o endpoint do back-end
  };

  return (
    <div>
      <h2 style={{ color: "#FFD700" }}>Gerenciar Galeria</h2>
      <TextField
        label="Título da Imagem"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Enviar
      </Button>
    </div>
  );
}
