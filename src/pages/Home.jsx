import { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Home() {
  const [images, setImages] = useState([]);
  const [gridImages, setGridImages] = useState([]);

  useEffect(() => {
    fetch("/images")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Erro ao carregar imagens:", err));
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const initialGrid = Array.from(
      { length: 9 },
      (_, index) => images[index % images.length]
    );

    setGridImages(initialGrid);
  }, [images]);

  useEffect(() => {
    if (images.length === 0) return;

    const timers = Array.from({ length: 9 }, (_, gridIndex) =>
      setInterval(() => {
        setGridImages((prev) => {
          if (prev.length === 0) return prev;

          const updated = [...prev];
          const currentIndex = images.indexOf(updated[gridIndex]);
          const safeIndex = currentIndex >= 0 ? currentIndex : 0;
          const nextIndex = (safeIndex + gridIndex + 1) % images.length;

          updated[gridIndex] = images[nextIndex];

          return updated;
        });
      }, 2500 + gridIndex * 450)
    );

    return () => timers.forEach(clearInterval);
  }, [images]);

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "rgba(0,0,0,0.96)",
          borderBottom: "1px solid rgba(255, 215, 0, 0.35)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            gap: 1.5,
            px: { xs: 1.5, sm: 2, md: 4 },
            minHeight: { xs: "62px", md: "76px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 1.5 },
            }}
          >
            <Box
              component="img"
              src="/img/logo.png"
              alt="Instituto Fiorotto"
              sx={{
                height: { xs: 42, md: 56 },
                width: { xs: 42, md: 56 },
                borderRadius: "12px",
                background: "#fff",
                p: "4px",
                boxShadow: "0 0 16px rgba(255, 215, 0, 0.35)",
              }}
            />

            <Box>
              <Typography
                sx={{
                  color: "#FFD700",
                  fontWeight: 900,
                  fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.45rem" },
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                Instituto Fiorotto
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: { xs: "0.55rem", md: "0.72rem" },
                  letterSpacing: { xs: "1px", md: "2px" },
                  textTransform: "uppercase",
                  mt: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                Estética Odontológica
              </Typography>
            </Box>
          </Box>

          <Button
            href="/login"
            sx={{
              background: "linear-gradient(135deg, #FFD700, #B8860B)",
              color: "#000",
              fontWeight: 900,
              px: { xs: 1.4, md: 3 },
              py: { xs: 0.8, md: 1.1 },
              fontSize: { xs: "0.7rem", md: "0.875rem" },
              borderRadius: "999px",
              minWidth: "auto",
              whiteSpace: "nowrap",
              boxShadow: "0 0 18px rgba(255, 215, 0, 0.35)",
            }}
          >
            Área do Doutor
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: "1 0 auto" }}>
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
          {gridImages.length > 0 && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: { xs: 1, md: 2 },
                width: "100%",
              }}
            >
              {gridImages.map((src, index) => (
                <Box
                  key={`${src}-${index}`}
                  component="img"
                  src={src}
                  alt={`Imagem ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: { xs: "105px", sm: "180px", md: "260px" },
                    objectFit: "cover",
                    backgroundColor: "#000",
                    borderRadius: { xs: "10px", md: "14px" },
                    border: "2px solid #FFD700",
                    display: "block",
                    transition: "opacity 0.6s ease",
                    boxShadow: "0 0 14px rgba(255, 215, 0, 0.25)",
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          background:
            "linear-gradient(180deg, #050505 0%, #111 60%, #050505 100%)",
          borderTop: "1px solid rgba(255, 215, 0, 0.35)",
          px: 2,
          py: { xs: 2.5, md: 4 },
          textAlign: "center",
          flexShrink: 0,
          boxShadow: "0 -10px 30px rgba(255, 215, 0, 0.08)",
        }}
      >
        <Typography
          sx={{
            color: "#FFD700",
            fontWeight: 900,
            fontSize: { xs: "1rem", md: "1.1rem" },
            mb: 0.8,
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.5px",
          }}
        >
          Instituto Fiorotto
        </Typography>

        <Typography
          sx={{
            color: "#fff",
            mb: 2,
            fontSize: { xs: "0.82rem", md: "0.95rem" },
          }}
        >
          Excelência em estética odontológica • São Paulo - SP
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          <Box
            component="a"
            href="https://wa.me/55959645994"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#000",
              background: "linear-gradient(135deg, #09ff00, #f3f1ed)",
              textDecoration: "none",
              fontWeight: "bold",
              px: 2,
              py: 1,
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "0.85rem", md: "1rem" },
            }}
          >
            <WhatsAppIcon fontSize="small" />
            WhatsApp
          </Box>

          <Box
            component="a"
            href="https://wa.me/5511987880320"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#000",
              background: "linear-gradient(135deg, #09ff00, #f3f1ed)",
              textDecoration: "none",
              fontWeight: "bold",
              px: 2,
              py: 1,
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "0.85rem", md: "1rem" },
            }}
          >
            <WhatsAppIcon fontSize="small" />
            WhatsApp
          </Box>

          <Box
            component="a"
            href="https://www.instagram.com/drgabrielfiorotto"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#fff",
              border: "1px solid #ff00c3",
              background: "linear-gradient(135deg, #ff00cc, #f3f1ed)",
              textDecoration: "none",
              fontWeight: "bold",
              px: 2,
              py: 1,
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "0.85rem", md: "1rem" },
            }}
          >
            <InstagramIcon fontSize="small" />
            Instagram
          </Box>
        </Box>
      </Box>
    </Box>
  );
}