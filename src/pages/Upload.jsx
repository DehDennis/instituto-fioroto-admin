import { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";

export default function Upload() {
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);

  const loadImages = () => {
    fetch("/images")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch(() => setMessage("Erro ao carregar imagens"));
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleUpload = async (e) => {
    const files = e.target.files;
    const formData = new FormData();

    for (let file of files) {
      formData.append("images", file);
    }

    const res = await fetch("/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Upload realizado com sucesso!");
      loadImages();
      e.target.value = "";
    } else {
      setMessage(data.error || "Erro ao enviar imagens");
    }
  };

  const handleDelete = async (filename) => {
    const res = await fetch(`/images/${filename}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.ok) {
      setImages((prev) => prev.filter((img) => !img.includes(filename)));
    } else {
      setMessage("Erro ao deletar imagem");
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
        p: 3,
      }}
    >
      <Typography variant="h4" sx={{ color: "#FFD700", mb: 3 }}>
        Gestão de Imagens
      </Typography>

      <input type="file" multiple accept="image/*" onChange={handleUpload} />

      {message && (
        <Typography sx={{ color: "#FFD700", mt: 2 }}>{message}</Typography>
      )}

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
                src={src}
                alt={filename}
                style={{
                  width: "150px",
                  height: "120px",
                  objectFit: "cover",
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

      <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
        <Button href="/" sx={{ bgcolor: "#FFD700", color: "#000", fontWeight: "bold" }}>
          Voltar para Home
        </Button>

        <Button onClick={handleLogout} sx={{ bgcolor: "#FFD700", color: "#000", fontWeight: "bold" }}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}