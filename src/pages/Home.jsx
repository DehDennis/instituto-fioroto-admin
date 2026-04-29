import { useEffect, useState } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  const [images, setImages] = useState([]);

useEffect(() => {
  fetch("/images")
    .then((res) => res.json())
    .then((data) => setImages(data))
    .catch((err) => console.error("Erro ao carregar imagens:", err));
}, []);


  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#000" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo + Nome */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="/img/logo.png" alt="Instituto Fiorotto" style={{ height: "50px" }} />
            <span style={{ color: "#FFD700", fontWeight: "bold", fontSize: "1.2rem" }}>Instituto Fiorotto</span>
          </div>

          {/* Botão de login */}
          <Button
            href="/login"
            sx={{
              bgcolor: "#FFD700",
              color: "#000",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#000", color: "#FFD700", border: "1px solid #FFD700" },
            }}
          >
            Área do Doutor
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

      {/* Carrossel */}
      <div id="depoimentos" style={{ flex: "1 0 auto", margin: "20px" }}>
<Swiper
  modules={[Autoplay, EffectFade]}   // só mantém autoplay e efeito
  autoplay={{ delay: 2000, disableOnInteraction: false }}
  loop={images.length > 3}           // só ativa loop se houver mais de 3 imagens
  slidesPerView={3}                  // mostra 3 imagens por vez
  spaceBetween={20}                  // espaçamento entre imagens
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
        <p style={{ color: "#FFF" }}>Contato: (11) 3132-0126 | São Paulo - SP</p>
      </footer>
    </div>
  );
}
