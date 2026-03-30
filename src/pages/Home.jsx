import { AppBar, Toolbar, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function Home() {
  const images = [
    { src: "/img/facetas.png" },
    { src: "/img/lentes.png" },
    { src: "/img/varios.png" },
    { src: "/img/varias.png" },
  ];

  const navItems = [
    { label: "Doutores", href: "#Doutores" },
    { label: "Agenda", href: "#agenda" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Lentes", href: "#lentes" },
    { label: "Facetas", href: "#facetas" },
  ];

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#000" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <img src="/img/logo.png" alt="Instituto Fiorotto" style={{ height: "50px" }} />

          {/* Navegação ao lado do logo */}
          <div style={{ display: "flex", gap: "15px" }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                href={item.href}
                sx={{
                  color: "#FFD700",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#FFD700",
                    color: "#000",
                    borderRadius: "5px",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Botão de login à direita */}
          <Button
            href="/login"
            sx={{
              bgcolor: "#FFD700",
              color: "#000",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#000", color: "#FFD700", border: "1px solid #FFD700" },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero section */}
      <div id="agenda" style={{ position: "relative", flex: "1 0 auto" }}>
        <img
          src="/img/base.png"
          alt="Destaque"
          style={{
            width: "100%",
            maxHeight: "30vh",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Carrossel responsivo */}
      <div id="depoimentos" style={{ flex: "1 0 auto", margin: "20px" }}>
        <Swiper
          modules={[Autoplay, EffectFade]}
          autoplay={{ delay: 3000 }}
          loop
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          style={{ width: "100%" }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img.src}
                alt={`Imagem ${index + 1}`}
                style={{
                  width: "100%",
                  height: "40vh",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "2px solid #FFD700",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: "#111", padding: "20px", textAlign: "center", flexShrink: 0 }}>
        <p style={{ color: "#FFD700", fontWeight: "bold" }}>Instituto Fiorotto - Excelência em estética odontológica</p>
        <p style={{ color: "#FFF" }}>Contato: (11) 99999-9999 | São Paulo - SP</p>
      </footer>
    </div>
  );
}
