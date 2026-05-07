import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Layout from "./Layout";

const GRID_SIZE = 12;

const GROUPS = [
  {
    key: "resinasNormais",
    title: "Resinas Normais",
    subtitle: "Naturalidade, beleza e transformação do sorriso.",
  },
  {
    key: "resinasEstratificadas",
    title: "Resinas Estratificadas",
    subtitle: "Camadas, detalhes e acabamento altamente estético.",
  },
  {
    key: "porcelanas",
    title: "Facetas de Porcelana",
    subtitle: "Sofisticação, brilho e alta durabilidade.",
  },
];

function createInitialGrid(images) {
  if (!images || images.length === 0) return [];

  return Array.from(
    { length: GRID_SIZE },
    (_, index) => images[index % images.length]
  );
}

function ImageGridSection({ title, subtitle, images }) {
  const [gridImages, setGridImages] = useState([]);

  useEffect(() => {
    setGridImages(createInitialGrid(images));
  }, [images]);

  useEffect(() => {
    if (!images || images.length <= GRID_SIZE) return;

    const timers = Array.from({ length: GRID_SIZE }, (_, gridIndex) =>
      setInterval(() => {
        setGridImages((prev) => {
          if (prev.length === 0) return prev;

          const updated = [...prev];
          const usedImages = new Set(updated);
          const availableImages = images.filter((img) => !usedImages.has(img));

          if (availableImages.length > 0) {
            updated[gridIndex] =
              availableImages[
                (gridIndex + Math.floor(Date.now() / 1000)) %
                  availableImages.length
              ];
          }

          return updated;
        });
      }, 2000 + gridIndex * 250)
    );

    return () => timers.forEach(clearInterval);
  }, [images]);

  if (!gridImages.length) return null;

  return (
    <Box
      sx={{
        mb: { xs: 4, md: 6 },
        p: { xs: 1.3, md: 2 },
        border: "1px solid rgba(255,215,0,.35)",
        borderRadius: { xs: "16px", md: "24px" },
        background:
          "linear-gradient(180deg, rgba(255,215,0,.08), rgba(0,0,0,.95))",
        boxShadow: "0 0 28px rgba(255,215,0,.12)",
      }}
    >
      <Box
        sx={{
          mb: 2,
          textAlign: "center",
          borderBottom: "1px solid rgba(255,215,0,.25)",
          pb: 1.5,
        }}
      >
        <Typography
          sx={{
            color: "#FFD700",
            fontWeight: 900,
            fontSize: { xs: "1.2rem", md: "2rem" },
            fontFamily: "'Playfair Display', serif",
            letterSpacing: ".5px",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,.78)",
            fontSize: { xs: ".78rem", md: "1rem" },
            mt: 0.5,
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: { xs: 0.8, md: 2 },
          width: "100%",
        }}
      >
        {gridImages.map((src, index) => (
          <Box
            key={`${src}-${index}`}
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: { xs: "10px", md: "16px" },
              border: {
                xs: "1px solid rgba(255,215,0,.75)",
                md: "2px solid rgba(255,215,0,.8)",
              },
              boxShadow: "0 0 14px rgba(255,215,0,.25)",
              backgroundColor: "#000",
            }}
          >
            <Box
              component="img"
              src={src}
              alt={`${title} ${index + 1}`}
              sx={{
                width: "100%",
                height: { xs: "82px", sm: "150px", md: "260px" },
                objectFit: "cover",
                display: "block",
                transition: "all .6s ease",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function Home() {
  const [imagesByGroup, setImagesByGroup] = useState({
    resinasNormais: [],
    resinasEstratificadas: [],
    porcelanas: [],
  });

  useEffect(() => {
    fetch("/images")
      .then((res) => res.json())
      .then((data) => {
        setImagesByGroup({
          resinasNormais: data.resinasNormais || [],
          resinasEstratificadas: data.resinasEstratificadas || [],
          porcelanas: data.porcelanas || [],
        });
      })
      .catch((err) => console.error("Erro ao carregar imagens:", err));
  }, []);

  return (
    <Layout>
      <Box
        component="img"
        src="/img/base.png"
        alt="Instituto Fiorotto"
        sx={{
          width: "100%",
          height: { xs: "155px", sm: "210px", md: "320px" },
          objectFit: "cover",
          display: "block",
        }}
      />

      <Box sx={{ px: { xs: 1.5, sm: 2, md: 4 }, py: { xs: 2, md: 4 } }}>
        {GROUPS.map((group) => (
          <ImageGridSection
            key={group.key}
            title={group.title}
            subtitle={group.subtitle}
            images={imagesByGroup[group.key]}
          />
        ))}
      </Box>
    </Layout>
  );
}