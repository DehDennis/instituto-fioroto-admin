import { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";

export default function Upload() {
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);

  const loadImages = () => {
    fetch("http://localhost:4000/images")
      .then((res) => res.json())
      .then((data) => setImages(data));
  };

  // Carregar imagens existentes
  useEffect(() => {
    loadImages();
  }, []);

  const handleUpload = async (e) => {
    const files = e.target.files;
    const formData = new FormData();

    for (let file of files) {
      formData.append("images", file);
    }

    const res = await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (data.message) {
      setMessage("Upload realizado com sucesso!");
      loadImages(); // 🔥 atualiza lista
    } else {
      setMessage("Erro ao enviar imagens");
    }
  };

  const handleDelete = async (filename) => {
    const res = await fetch(`http://localhost:4000/images/${filename}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.ok) {
      // 🔥 remove localmente (instantâneo)
      setImages((prev) => prev.filter((img) => !img.includes(filename)));
    } else {
      console.error("Erro ao deletar imagem");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Box
      sx={{
        bgcolor: "#000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" sx={{ color: "#FFD700", mb: 3 }}>
        Gestão de Imagens
      </Typography>

      <input type="file" multiple accept="image/*" onChange={handleUpload} />

      {message && (
        <Typography sx={{ color: "#FFD700", mt: 2 }}>
          {message}
        </Typography>
      )}

      {/* Lista de imagens */}
      <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 2 }}>
        {images.map((src) => {
          const filename = src.split("/").pop();

          return (
            <Box
              key={filename}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={`http://localhost:4000${src}`}
                alt={filename}
                style={{
                  width: "150px",
                  border: "2px solid #FFD700",
                  borderRadius: "5px",
                }}
              />

              <Button
                onClick={() => handleDelete(filename)}
                sx={{
                  mt: 1,
                  bgcolor: "#FFD700",
                  color: "#000",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#000",
                    color: "#FFD700",
                    border: "1px solid #FFD700",
                  },
                }}
              >
                Excluir
              </Button>
            </Box>
          );
        })}
      </Box>

      {/* Botões */}
      <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
        <Button
          href="/"
          sx={{
            bgcolor: "#FFD700",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          Voltar para Home
        </Button>

        <Button
          onClick={handleLogout}
          sx={{
            bgcolor: "#FFD700",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}