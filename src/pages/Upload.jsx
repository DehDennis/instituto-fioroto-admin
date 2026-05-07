import { useState, useEffect } from "react";
import { Button, Typography, Box, MenuItem, TextField } from "@mui/material";

const categories = [
  {
    value: "resina-normal",
    label: "Resina Normal",
    key: "resinasNormais",
  },
  {
    value: "resina-estratificada",
    label: "Resina Estratificada",
    key: "resinasEstratificadas",
  },
  {
    value: "porcelana",
    label: "Porcelana",
    key: "porcelanas",
  },
];

export default function Upload() {
  const [message, setMessage] = useState("");
  const [images, setImages] = useState({
    resinasNormais: [],
    resinasEstratificadas: [],
    porcelanas: [],
  });
  const [category, setCategory] = useState("resina-normal");

  const loadImages = () => {
    fetch("/images")
      .then((res) => res.json())
      .then((data) =>
        setImages({
          resinasNormais: data.resinasNormais || [],
          resinasEstratificadas: data.resinasEstratificadas || [],
          porcelanas: data.porcelanas || [],
        })
      )
      .catch(() => setMessage("Erro ao carregar imagens"));
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const formData = new FormData();

    formData.append("category", category);

    files.forEach((file) => {
      formData.append("images", file);
    });

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

  const handleDelete = async (src) => {
    const parts = src.split("/");
    const filename = parts.pop();
    const categoryFolder = parts.pop();

    const res = await fetch(`/images/${categoryFolder}/${filename}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.ok) {
      setMessage("Imagem excluída com sucesso!");
      loadImages();
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
        p: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#FFD700",
          mb: 3,
          fontWeight: 900,
          fontFamily: "'Playfair Display', serif",
          textAlign: "center",
        }}
      >
        Gestão de Imagens
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: 700,
          bgcolor: "#111",
          border: "1px solid rgba(255,215,0,.35)",
          borderRadius: 3,
          p: 3,
          mb: 3,
        }}
      >
        <TextField
          select
          fullWidth
          label="Categoria das imagens"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{
            mb: 2,
            label: { color: "#FFD700" },
            input: { color: "#FFD700" },
            "& .MuiSelect-select": { color: "#FFD700" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,215,0,.45)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#FFD700",
            },
          }}
        >
          {categories.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>

        <input type="file" multiple accept="image/*" onChange={handleUpload} />

        {message && (
          <Typography sx={{ color: "#FFD700", mt: 2 }}>{message}</Typography>
        )}
      </Box>

      {categories.map((cat) => (
        <Box key={cat.value} sx={{ width: "100%", mb: 5 }}>
          <Typography
            sx={{
              color: "#FFD700",
              fontWeight: 900,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              mb: 2,
              borderBottom: "1px solid rgba(255,215,0,.25)",
              pb: 1,
            }}
          >
            {cat.label}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(5, 1fr)",
              },
              gap: 2,
            }}
          >
            {(images[cat.key] || []).map((src) => {
              const filename = src.split("/").pop();

              return (
                <Box
                  key={src}
                  sx={{
                    bgcolor: "#111",
                    border: "1px solid rgba(255,215,0,.3)",
                    borderRadius: 2,
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={src}
                    alt={filename}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                      border: "2px solid #FFD700",
                      borderRadius: "8px",
                    }}
                  />

                  <Button
                    onClick={() => handleDelete(src)}
                    sx={{
                      mt: 1,
                      bgcolor: "#FFD700",
                      color: "#000",
                      fontWeight: "bold",
                      width: "100%",
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
        </Box>
      ))}

      <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
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