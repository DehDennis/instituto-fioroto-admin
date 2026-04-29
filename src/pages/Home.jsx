import { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/images")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Erro ao carregar imagens:", err));
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "rgba(0,0,0,0.94)",
          borderBottom: "1px solid rgba(255, 215, 0, 0.35)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
            minHeight: "72px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              component="img"
              src="/img/logo.png"
              alt="Instituto Fiorotto"
              sx={{
                height: 56,
                width: 56,
                borderRadius: "12px",
                background: "#fff",
                p: "4px",
                boxShadow: "0 0 20px rgba(255, 215, 0, 0.35)",
              }}
            />

            <Box>
              <Typography
                sx={{
                  color: "#FFD700",
                  fontWeight: 900,
                  fontSize: { xs: "1.1rem", md: "1.45rem" },
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1,
                }}
              >
                Instituto Fiorotto
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "0.72rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  mt: 0.6,
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
              px: { xs: 2, md: 3 },
              py: 1.1,
              borderRadius: "999px",
              boxShadow: "0 0 18px rgba(255, 215, 0, 0.35)",
              "&:hover": {
                background: "#000",
                color: "#FFD700",
                border: "1px solid #FFD700",
              },
            }}
          >
            Área do Doutor
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1 }}>
        <Box
          component="img"
          src="/img/base.png"
          alt="Instituto Fiorotto"
          sx={{
            width: "100%",
            height: { xs: "220px", md: "320px" },
            objectFit: "cover",
            display: "block",
          }}
        />

        <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
          {images.length > 0 && (
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={images.length > 3}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              style={{ width: "100%" }}
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={src}
                    alt={`Imagem ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "40vh",
                      objectFit: "cover",
                      borderRadius: "14px",
                      border: "2px solid #FFD700",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Box>
      </Box>

      <footer
        style={{
          background:
            "linear-gradient(180deg, #050505 0%, #111 60%, #050505 100%)",
          borderTop: "1px solid rgba(255, 215, 0, 0.35)",
          padding: "32px 20px",
          textAlign: "center",
          flexShrink: 0,
          boxShadow: "0 -10px 30px rgba(255, 215, 0, 0.08)",
        }}
      >
        <p
          style={{
            color: "#FFD700",
            fontWeight: "900",
            fontSize: "1.1rem",
            margin: "0 0 8px",
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.5px",
          }}
        >
          Instituto Fiorotto
        </p>

        <p
          style={{
            color: "#fff",
            margin: "0 0 18px",
            fontSize: "0.95rem",
          }}
        >
          Excelência em estética odontológica • São Paulo - SP
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <a
            href="https://wa.me/551131320126"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#000",
              background: "linear-gradient(135deg, #FFD700, #B8860B)",
              textDecoration: "none",
              fontWeight: "bold",
              padding: "10px 18px",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <WhatsAppIcon />
            WhatsApp
          </a>

          <a
            href="https://www.instagram.com/drgabrielfiorotto"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#FFD700",
              border: "1px solid #FFD700",
              textDecoration: "none",
              fontWeight: "bold",
              padding: "10px 18px",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <InstagramIcon />
            Instagram
          </a>
        </div>
      </footer>
    </Box>
  );
}